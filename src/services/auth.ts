import { api } from "./http"
import Cookies from "js-cookie"

//this object that is being send needs to be in the same syntax as the one configured in api
export const signIn = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })

    const token = response.data.token

    //sets auth token in navigator's local storage.
    localStorage.setItem("token", token)
    Cookies.set("token", token, { expires: 0.2 })

    return response.data
}

export const logout = async () => {
    localStorage.removeItem("token")
    Cookies.remove("token")
}

export const signUp = async (email: string, password: string) => {
    const response = await api.post("/auth/signUp", { email, password })

    return response.data

}