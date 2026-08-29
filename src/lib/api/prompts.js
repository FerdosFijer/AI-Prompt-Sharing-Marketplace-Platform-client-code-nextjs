

'use server'
import { serverFetch } from "../core/server"

export const getAllPrompts = async () => {
    return serverFetch(`/api/prompts`)
}
export const getPromptsById = async (jobId) => {
    return serverFetch(`/api/prompts/${jobId}`)
}
export const getUserPrompts = async (userId, status= "pending") => {
    return serverFetch(`/api/my/prompts?userId=${userId}&status=${status}`)
}