export function preprocess_entries(line_data) {
    return line_data.map(item => {
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
}