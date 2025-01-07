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