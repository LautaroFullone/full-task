import { api } from "@/lib/axios";
import { LoginFormData } from "../types";
import { isAxiosError } from "axios";

export async function createAccount(formData: LoginFormData){
    try {
        const { data } = await api.post(`/auth/register`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: createAccount', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}