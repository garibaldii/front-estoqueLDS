import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"

import EstoqueIcon from "../../../public/estoqueIcon"
import HistoricoIcon from "../../../public/historicoIcon"

import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react"

type tokenPayload = {
    email: string
}


export const NavBar = () => {
    const router = useRouter();

    const [email, setEmail] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            try {
                const decoded = jwtDecode<tokenPayload>(token)
                const email = decoded.id
                setEmail(email)
                setEmail(email)
            } catch (error: any) {
                console.error(error.data.response)
            }
        }
    })


    return (
        <div>
            <div className="bg-custom-lds-blur flex items-center justify-between ">

                <Image
                    src={"/logo-lds.png"}
                    alt={"Logo LDS"}
                    width={200}
                    height={100}
                    className="cursor-pointer "
                    onClick={() => router.push("/pages/dashboard")}
                />

                <Button variant="outline" onClick={() => router.push("/pages/product")}>
                    <EstoqueIcon /> Produtos
                </Button>


                <Button variant="outline" onClick={() => router.push("/pages/order")}>
                    <HistoricoIcon /> Pedidos
                </Button>


                <Button variant="outline" >
                    Chefe {email}
                </Button>



            </div>
        </div>
    );
};