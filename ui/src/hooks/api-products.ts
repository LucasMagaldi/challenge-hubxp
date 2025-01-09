import { api } from "../lib/axios"

interface IGetCategoriesByProduct {
    _id: string
    name: string
}

export interface IGetProducts {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categories: IGetCategoriesByProduct[];
}

export interface IPostProduct {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

export async function getProducts() {
    try {
        const response = await api.get<IGetProducts[]>('/products')

        return response.data        
    } catch (error) {
        console.log(error)
    }
}

export async function removeProduct(productId: string) {
    try {
        await api.delete(`/products/${productId}`)
    } catch (error) {
        console.log(error)
    }
}

export async function createProduct({ name, description, price, imageUrl }: IPostProduct) {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);

        if (imageUrl instanceof File) {
            formData.append("file", imageUrl);
        }

        await api.post('/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        console.error("Error creating product:", error);
    }
}

export async function updateProduct({ _id, name, imageUrl, price, description }: Partial<IGetProducts>) {
    try {
        if (imageUrl instanceof File) {
            const formData = new FormData();
            formData.append("name", name || "");
            formData.append("description", description || "");
            formData.append("price", price?.toString() || "");
            formData.append("file", imageUrl);

            await api.patch(`/products/${_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            await api.patch(`/products/${_id}`, {
                name,
                description,
                price,
                imageUrl,
            });
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}