export function init_search({ line_data, preprocessed_targets, line_elements, code_element, pre_element, wrapper_container }) {
    const body_element = document.body;

    function get_match_score(query, targetObj, original_index = -1) {
        if (!query || !query.trim() || !targetObj.norm_target) return -1000;

        const norm_query = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/y/g, "i").replace(/(.)\1{2,}/g, "$1$1");
        if (norm_query === targetObj.norm_target) return 5000;

        const { command_part, desc_part, is_path, target_words, norm_target } = targetObj;
        const target_penalty = is_path ? 400 : 0;
        const query_tokens = norm_query.split(/[\s/_-]+/).filter(Boolean);

        let short_command_penalty = 0;
        if (query_tokens.length > 1 && command_part.length <= 3) {
            const is_command_explicitly_typed = query_tokens[0] === command_part || norm_query.startsWith(command_part + " ");
            if (!is_command_explicitly_typed) {
                short_command_penalty = 1500;
            }
        }

        let length_mismatch_penalty = 0;
        if (norm_query.length > command_part.length + 3) {
            length_mismatch_penalty = (norm_query.length - command_part.length) * 35;
        }

        let base_score = 0;

        if (command_part.startsWith(norm_query)) {
            let root_bonus = (norm_query === "/") ? 1000 : 0;
            const next_char = command_part[norm_query.length];
            const is_clean_boundary = !next_char || /[\s/<#._-]/.test(next_char);
            let boundary_bonus = is_clean_boundary ? 300 : 0;

            base_score = Math.max(base_score, 2800 + (norm_query.length * 20) + root_bonus + boundary_bonus);
        }

        const exact_phrase_idx = norm_target.indexOf(norm_query);
        if (exact_phrase_idx !== -1) {
            let position_penalty = exact_phrase_idx * 1.5;
            let start_bonus = (exact_phrase_idx === 0) ? 300 : 0;

            const match_end_idx = exact_phrase_idx + norm_query.length;
            const next_char = norm_target[match_end_idx];
            const is_clean_boundary = (match_end_idx === norm_target.length) || /[\s/<#._-]/.test(next_char);
            let boundary_bonus = is_clean_boundary ? 400 : 0;

            let desc_bonus = 0;
            if (desc_part.length > 0) {
                const desc_match_idx = desc_part.indexOf(norm_query);
                if (desc_match_idx !== -1) {
                    const is_desc_word_start = desc_match_idx === 0 || /[\s/._-]/.test(desc_part[desc_match_idx - 1]);
                    if (is_desc_word_start) {
                        desc_bonus = (desc_match_idx === 0) ? 600 : Math.max(0, 300 - (desc_match_idx * 2));
                    }
                }
            }

            let phrase_score = 2000 + start_bonus + boundary_bonus - position_penalty + desc_bonus;
            if (norm_query.length > 2 || is_clean_boundary) {
                base_score = Math.max(base_score, phrase_score);
            }
        }

        if (!/^[\s/_-]+$/.test(query) && query_tokens.length > 0) {
            let token_score = 0;
            let matched_tokens_count = 0;
            let earliest_match_idx = Infinity;
            let last_token_end_idx = -1;
            let full_word_matches_count = 0;

            for (const token of query_tokens) {
                const match_idx = norm_target.indexOf(token);
                const is_word_prefix = target_words.some(w => w.startsWith(token));
                const is_exact_word = target_words.includes(token);

                if (match_idx !== -1 || is_word_prefix) {
                    matched_tokens_count++;
                    const effective_match_idx = match_idx !== -1 ? match_idx : norm_target.indexOf(token);
                    earliest_match_idx = Math.min(earliest_match_idx, effective_match_idx);

                    let order_bonus = (last_token_end_idx !== -1 && effective_match_idx >= last_token_end_idx) ? 100 : 0;
                    let word_bonus = is_exact_word ? 300 : (is_word_prefix ? 240 : 80);
                    if (is_exact_word || is_word_prefix) full_word_matches_count++;

                    let position_penalty = effective_match_idx * 1.5;
                    let score = 300 + (token.length * 20) + word_bonus + order_bonus - position_penalty;
                    token_score += Math.max(score, 50);
                    last_token_end_idx = effective_match_idx + token.length;
                }
            }

            if (matched_tokens_count > 0) {
                let match_ratio_multiplier = Math.pow(matched_tokens_count / query_tokens.length, 1.2);
                let multi_word_completeness_bonus = (full_word_matches_count > 1) ? (full_word_matches_count * 800) : 0;
                if (earliest_match_idx !== Infinity) token_score += Math.max(0, 150 - (earliest_match_idx * 3));
                base_score = Math.max(base_score, Math.round((token_score + multi_word_completeness_bonus) * match_ratio_multiplier));
            }
        }

        let final_score = base_score - target_penalty - length_mismatch_penalty - short_command_penalty;
        if (typeof original_index === "number" && original_index >= 0) {
            final_score -= (original_index * 1.5);
        }

        return Math.round(final_score);
    }

    return function perform_search(raw_query) {
        const query = raw_query.toLowerCase().trim();

        if (query !== "") {
            body_element.classList.add("filtering");
        } else {
            body_element.classList.remove("filtering");
        }

        const parent = pre_element.parentNode;
        parent.removeChild(pre_element);

        if (query === "") {
            line_data.forEach(item => {
                const el = line_elements[item.index];
                el.classList.remove("hidden", "highlight_match", "dimmed_match");
                code_element.appendChild(el);
            });
        } else {
            const scored_lines = line_data.map((item, index) => {
                if (item.is_header || item.is_spacer) return { item, score: -1000 };
                const targetObj = preprocessed_targets[index];
                const score = get_match_score(query, targetObj, index);
                return { item, score };
            });

            scored_lines.sort((a, b) => b.score - a.score);
            const fragment = document.createDocumentFragment();

            scored_lines.forEach(({ item, score }) => {
                const el = line_elements[item.index];
                if (score >= -500) {
                    el.classList.remove("hidden");
                    if (score > -50) {
                        el.classList.add("highlight_match");
                        el.classList.remove("dimmed_match");
                    } else {
                        el.classList.remove("highlight_match");
                        el.classList.add("dimmed_match");
                    }
                    fragment.appendChild(el);
                } else {
                    el.classList.add("hidden", "highlight_match", "dimmed_match");
                }
            });

            code_element.innerHTML = "";
            code_element.appendChild(fragment);
        }

        parent.appendChild(pre_element);
        code_element.scrollTop = 0;
        pre_element.scrollTop = 0;
        if (wrapper_container) wrapper_container.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}