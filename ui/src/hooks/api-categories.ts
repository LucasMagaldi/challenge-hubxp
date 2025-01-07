import { api } from "../lib/axios"

export interface IGetCategories {
    _id: string
    name: string
}

export async function getCategories() {
    try {
        const response = await api.get<IGetCategories[]>('/categories')

        return response.data        
    } catch (error) {
        console.log(error)
    }
}

export async function updateCategory(categoryId: string) {
    try {
        await api.put(`/categories/${categoryId}`)
    } catch (error) {
        console.log(error)
    }
}

export async function removeCategory(categoryId: string) {
    try {
        await api.delete(`/categories/${categoryId}`)
    } catch (error) {
        console.log(error)
    }
}