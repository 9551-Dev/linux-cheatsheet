import { init_theme_switch }                    from "./theme.js";
import { fetch_with_retries, update_url_query } from "./lib.js";
import { init_search }                          from "./search.js";

init_theme_switch();

fetch_with_retries("cheatsheet.txt", 3, 1000)
    .then(text => {
        const code_element = document.getElementById("cheatsheet_code");
        const raw_lines = text.split("\n");

        let current_category = "General";
        const line_categories = [];
        const line_data = [];
        let processed_lines = [];

        raw_lines.forEach((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("# ===")) {
                current_category = trimmed.replace(/^#+\s*===\s*|\s*===.*$/g, "").trim();
            }

            line_categories.push(current_category);
            line_data.push({ index: processed_lines.length, text: line.toLowerCase(), is_header: trimmed.startsWith("# ==="), is_spacer: false });
            processed_lines.push(line);

            line_categories.push(current_category);
            line_data.push({ index: processed_lines.length, text: "", is_header: false, is_spacer: true });
            processed_lines.push("");
        });

        code_element.textContent = processed_lines.join("\n");
        Prism.highlightElement(code_element);

        const html_lines = code_element.innerHTML.split("\n");
        code_element.innerHTML = "";
        const line_elements = [];

        html_lines.forEach((line_html, index) => {
            const cat = line_categories[index];
            const trimmed_line = processed_lines[index].trim();
            const is_header_line = trimmed_line.startsWith("# ===");

            let processed_html = line_html.replace(/(\[#?[^\]]*\])/g, (match) => {
                if (match.startsWith("[#")) return `<span class="hash_bracket_content">${match}</span>`;
                return `<span class="bracket_content">${match}</span>`;
            });

            const span = document.createElement("span");
            span.id = "line-" + (index + 1);
            span.className = "code_line";
            span.setAttribute("data-index", index);

            if (is_header_line && index > 0) span.classList.add("category_spacer");

            span.innerHTML = `<span class="code_content">${processed_html}</span><span class="category_badge_container"><span class="category_badge">${cat}</span></span>`;
            code_element.appendChild(span);
            line_elements.push(span);
        });

        // preprocessing
        const preprocessed_targets = line_data.map(item => {
            if (item.is_header || item.is_spacer || !item.text.trim()) {
                return { norm_target: "", command_part: "", desc_part: "", is_path: false, target_words: [] };
            }

            const norm_target = item.text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/y/g, "i").replace(/(.)\1{2,}/g, "$1$1");
            let command_part = norm_target;
            let desc_part = "";
            const comment_idx = norm_target.indexOf("#");
            if (comment_idx !== -1) {
                command_part = norm_target.slice(0, comment_idx).trim();
                desc_part = norm_target.slice(comment_idx + 1).replace(/^\[#.*?\]\s*/, "").trim();
            }

            return {
                norm_target,
                command_part,
                desc_part,
                is_path: command_part.startsWith("/") || command_part.startsWith("~/") || command_part.startsWith("$"),
                target_words: norm_target.split(/[\s/._,-]+/).filter(Boolean)
            };
        });

        // Initialize Search Engine with preprocessed data
        const perform_search = init_search({
            line_data,
            preprocessed_targets,
            line_elements,
            code_element,
            pre_element: code_element.closest("pre"),
            wrapper_container: document.querySelector(".wrapper_container")
        });

        const search_box = document.getElementById("search_box");
        let search_timeout = null;

        search_box.addEventListener("input", (e) => {
            const query = e.target.value;
            clearTimeout(search_timeout);
            search_timeout = setTimeout(() => {
                update_url_query(query.toLowerCase().trim());
                perform_search(query);
            }, 150);
        });

        const url_params = new URLSearchParams(window.location.search);
        const initial_query = url_params.get("q") || url_params.get("search") || "";
        if (initial_query !== "") {
            perform_search(initial_query);
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById("cheatsheet_code").textContent = "Failed to load cheatsheet.";
    });