import { api } from "../lib/axios"

export interface IGetCategories {
    _id: string
    name: string
}

export interface UpdateCategoryProps {
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

export async function updateCategory(category: UpdateCategoryProps) {
    try {
        await api.put(`/categories/${category._id}`, {
            name: category.name
        })
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

export async function createCategory({name}: { name: string}) {
    try {
        await api.post('/categories', {
            name: name
        })
    } catch (error) {
        console.log(error)
    }
}