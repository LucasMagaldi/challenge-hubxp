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

export async function createProduct({ name, description, price}: IPostProduct) {
    try {
        await api.post('/products', {
            name,
            description,
            price: parseInt(price),
            categories: []
        })
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct({ _id, name, imageUrl, price, description }: IGetProducts) {
    try {
        await api.patch(`/products/${_id}`, {
            name,
            description,
            price,
            imageUrl
        })
    } catch (error) {
        console.log(error)
    }
}