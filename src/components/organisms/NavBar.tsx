import Image from "next/image"

import { Button } from "../ui/button"
import SaidaIcon from "../../../public/saidaIcon"
import EntradaIcon from "../../../public/entradaIcon"
import EstoqueIcon from "../../../public/estoqueIcon"
import HistoricoIcon from "../../../public/historicoIcon"
export const NavBar = () => {

    return (
        <div className="bg-custom-lds-blur flex justify-around" >

            <Button variant={"outline"} > <EntradaIcon /> Entrada</Button>

            <Button variant={"outline"}> <SaidaIcon /> Saída</Button>

            <Image
                src={"/logo-lds.png"}
                alt={"Logo LDS"}
                width={200}
                height={100}
                className=""
            />

            <Button variant={"outline"}> <EstoqueIcon /> Estoque</Button>
            <Button variant={"outline"}> <HistoricoIcon/> Histórico</Button>
            
        </div>
    )

}