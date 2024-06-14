import { api } from "@/lib/axios";
import { ForgotPasswordFormData, LoginFormData, NewPasswordFormData, RegisterFormData, RequestRegisterCodeFormData, UpdateProfilePasswordFormData, User, UserProfileFormData, userSchema } from "../types";
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

export async function confirmAccount(registerCode: string) {
    try {
        const { data } = await api.post(`/auth/confirm-account`, { code: registerCode })
        return data;

    } catch (error) {
        console.log('# ERROR: confirmAccount', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function requestRegisterCode(formData: RequestRegisterCodeFormData) {
    try {
        const { data } = await api.post(`/auth/request-code`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: requestRegisterCode', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function loginAccount(formData: LoginFormData) {
    try {
        const { data } = await api.post(`/auth/login`, formData)
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

export async function forgotPassword(formData: ForgotPasswordFormData) {
    try {
        const { data } = await api.post(`/auth/forgot-password`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: forgotPassword', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function validateCode(registerCode: string) {
    try {
        const { data } = await api.post(`/auth/validate-code`, { code: registerCode })
        return data;

    } catch (error) {
        console.log('# ERROR: validateCode', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function resetPassword({ formData, registerCode }: { formData: NewPasswordFormData, registerCode: string }) {
    try {
        const { data } = await api.post(`/auth/reset-password/${registerCode}`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: resetPassword', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function getAutenticatedUser() {
    try {
        const { data } = await api.get(`/auth/user`)
        const response = userSchema.safeParse(data);

        if (!response.success) throw new Error('Error parsing response');

        return response.data

    } catch (error) {
        console.log('# ERROR: getAutenticatedUser', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function updateProfile(formData: UserProfileFormData) {
    try {
        const { data } = await api.patch(`/auth/profile`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: updateProfile', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function updateProfilePassword(formData: UpdateProfilePasswordFormData) {
    try {
        const { data } = await api.patch(`/auth/update-password`, formData)
        return data;

    } catch (error) {
        console.log('# ERROR: updateProfilePassword', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function checkPassword(password: string) {
    try {
        const { data } = await api.post(`/auth/check-password`, { password })
        return data;

    } catch (error) {
        console.log('# ERROR: checkPassword', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}