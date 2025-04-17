"use client"

import { useState } from "react"
import Image from "next/image"

import { signIn } from "@/services/auth"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


export const SignInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {

            console.log(password)
            const result = await signIn(email, password)
            console.log(result)
        } catch (error: any) {
            setError(error.response.data.message) //takes the error from backend error treatment
        } finally {
            setLoading(false)

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
            <Image
                src={"/logo-lds.png"}
                alt={"Logo LDS"}
                width={300}
                height={100}
                className="absolute top-10"
            />

            <h2 className="text-center text-xl mb-4">Log-in</h2>


            <form
                onSubmit={handleSubmit}
                className="bg-custom-lds-blur w-1/4 rounded-lg space-y-6 min-h-[0px] flex flex-col justify-center"
            >

                <div className="flex flex-col">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }}
                        required
                        className={`${error ? 'border-red-500' : 'border-transparent'}`}
                    />
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="password" >Senha</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => { 
                            setPassword(e.target.value)
                            setError("")
                        }}
                        required
                        className={`${error ? 'border-red-500' : 'border-transparent'}`}
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Loging..." : "Login"}
                </Button>

                <p className="text-red-700">{error}</p>


            </form>
        </div>

    )
}

export default SignInForm
