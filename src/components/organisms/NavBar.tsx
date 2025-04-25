import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import SaidaIcon from "../../../public/saidaIcon"
import EntradaIcon from "../../../public/entradaIcon"
import EstoqueIcon from "../../../public/estoqueIcon"
import HistoricoIcon from "../../../public/historicoIcon"
export const NavBar = () => {

    const router = useRouter()

    return (
        <div className="bg-custom-lds-blur flex justify-around" >

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><EntradaIcon /> Entrada</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">

                    <DropdownMenuItem onClick={() => router.push("/pages/incoming/panel")}>Painel</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/pages/incoming/inverter")}>Inversor</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>




            <Button variant={"outline"} onClick={() => router.push("/pages/outcoming")}> <SaidaIcon /> Saída</Button>

            <Image
                src={"/logo-lds.png"}
                alt={"Logo LDS"}
                width={200}
                height={100}
                className="cursor-pointer"
                onClick={() => router.push("/pages/dashboard")}
            />

            <Button variant={"outline"} onClick={() => router.push("/pages/inventory")}> <EstoqueIcon /> Estoque</Button>

            <Button variant={"outline"} onClick={() => router.push("/pages/history")}> <HistoricoIcon /> Histórico</Button>


        </div>
    )

}



