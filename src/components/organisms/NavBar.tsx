import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"

import EstoqueIcon from "../../../public/estoqueIcon"
import HistoricoIcon from "../../../public/historicoIcon"

import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react"
import { getUser } from "@/services/user"
import { User } from "@/types/IUser"

type tokenPayload = {
    id: string
}


export const NavBar = () => {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")

            if (token) {
                try {
                    const decoded = jwtDecode<tokenPayload>(token)
                    const id = decoded.id

                    console.log("ID decodificado:", id)

                    const userData = await getUser(id)
                    setUser(userData)

                    console.log("Usuário carregado:", userData)
                } catch (error: any) {
                    console.error("Erro ao buscar usuário:", error?.response || error)
                }
            }
        }

        fetchUser()
    }, [])


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
                   Olá Chefe, {user?.name}
                </Button>





            </div>
        </div>
    );
};