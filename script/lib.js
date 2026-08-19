export function update_url_query(query) {
    const url = new URL(window.location);
    if (query) {
        url.searchParams.set("q", query);
    } else {
        url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url);
}

export async function fetch_with_retries(url, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.warn(`Fetch attempt ${attempt} failed: ${error.message}`);
            if (attempt === retries) {
                throw new Error(`Failed to load ${url} after ${retries} attempts.`);
            }
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
        }
    }
}