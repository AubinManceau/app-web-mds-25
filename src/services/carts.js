import { fetchData } from "./api";

export async function createCart({ userId, products, date }) {
    try {
        const data = await fetchData(`/carts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, products, date })
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

export async function updateCart({ id, userId, products, date }) {
    console.log('PUT /carts/' + id, {
        userId,
        products,
        date
    });
    try {
        const data = await fetchData(`/carts/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, products, date })
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

export async function getCartById(id) {
    try {
        const data = await fetchData(`/carts/${id}`);

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

export async function getCarts() {
    try {
        const data = await fetchData(`/carts`);

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


