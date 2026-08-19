const themes = ["black", "normal", "light"];
let current_theme = localStorage.getItem("cheatsheet_theme") || "black";

export function apply_theme(theme_name) {
    document.body.classList.remove("theme_normal", "theme_light");
    if (theme_name === "normal") {
        document.body.classList.add("theme_normal");
    } else if (theme_name === "light") {
        document.body.classList.add("theme_light");
    }
    document.getElementById("theme_toggle_btn").textContent = "theme: " + theme_name;
    localStorage.setItem("cheatsheet_theme", theme_name);
}

export function init_theme_switch() {
    apply_theme(current_theme);

    document.getElementById("theme_toggle_btn").addEventListener("click", () => {
        let next_index = (themes.indexOf(current_theme) + 1) % themes.length;
        current_theme = themes[next_index];
        apply_theme(current_theme);
    });
}