import { api } from "../lib/axios"

interface IGetProductsByCategories {
    _id: string
    name: string
}

export interface IGetOrders {
    _id: string;
    date: Date;
    total: number;
    products: IGetProductsByCategories[];
}

export interface IPostOrder {
    date: Date;
    total: string;
}

export async function getOrders() {
    try {
        const response = await api.get<IGetOrders[]>('/orders')

        return response.data        
    } catch (error) {
        console.log(error)
    }
}

export async function removeOrder(orderId: string) {
    try {
        await api.delete(`/orders/${orderId}`)
    } catch (error) {
        console.log(error)
    }
}

export async function createOrder({ total, date }: IPostOrder) {
    try {
        await api.post('/orders', {
            total,
            date,
            products: []
        })
    } catch (error) {
        console.log(error)
    }
}

export async function updateOrder({ _id, total }: IGetOrders) {
    try {
        await api.patch(`/orders/${_id}`, {
            total
        })
    } catch (error) {
        console.log(error)
    }
}