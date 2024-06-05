import { api } from "@/lib/axios";
import { LoginFormData, RegisterFormData } from "../types";
import { isAxiosError } from "axios";

export async function registerAccount(formData: RegisterFormData){
    try {
        const { data } = await api.post(`/auth/register`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: registerAccount', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function loginAccount(formData: LoginFormData){
    try {
        const { data } = await api.post(`/auth/login`, formData)
        console.log('token', data.records.token)
        localStorage.setItem('AUTH_TOKEN', data.records.token)
        return data;

    } catch (error) {
        console.log('# ERROR: loginAccount', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}