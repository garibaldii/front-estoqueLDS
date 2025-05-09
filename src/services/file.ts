import { api } from "./http";

export const postFile = async (file: any) => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.post("/file/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })

    return response.data
}