import { fetchData } from "./api";

export async function login({ username, password }) {
    try {
        const data = await fetchData(`/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (data.error) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            message: error.message,
        };
    }
}

export async function register({ username, email, password }) {
    try {
        const data = await fetchData(`/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        if (data.error) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            message: error.message,
        };
    }
}

