import { fetchData } from "./api";

export async function getProducts() {
    try {
        const data = await fetchData(`/products`, {
            method: "GET",
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

export async function getProductById(id) {
    try {
        const data = await fetchData(`/products/${id}`, {
            method: "GET",
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

export async function login() {
    try {
        const data = await fetchData(`/auth/login`, {
            method: "POST",
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
