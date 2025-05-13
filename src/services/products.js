import { fetchData } from "./api";

export async function getAllCourses() {
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
