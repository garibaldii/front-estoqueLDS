import { api } from "./http"

//this object that is being send needs to be in the same syntax as the one configured in api
export const signIn = async (email: string, senha: string) => {
    const response = await api.post("/conta/login", {email, senha})

    const token = response.data.token

    //sets auth token in navigator's local storage.
    localStorage.setItem("token", token)

    return response.data
}

export const signUp = async (email: string, senha: string) => {
    const response = await api.post("/conta/registro", {email, senha})

    return response.data

}