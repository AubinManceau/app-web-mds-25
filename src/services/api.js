const API_BASE_URL = "http://31.207.34.237:8080";

export async function fetchData(endpoint, options = {}) {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP! Statut: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        return {
            error: true,
            message: error.message || "Une erreur est survenue",
        };
    }
}

