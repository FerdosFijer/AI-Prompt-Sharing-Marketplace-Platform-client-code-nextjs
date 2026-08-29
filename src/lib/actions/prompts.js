'use server'
import { serverMutation } from "../core/server"

export const PromptsPost = async (newPromptsData) =>{
    return await serverMutation('/api/prompts', newPromptsData)
}
