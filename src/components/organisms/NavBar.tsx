import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"

import SaidaIcon from "../../../public/saidaIcon"
import EstoqueIcon from "../../../public/estoqueIcon"
import HistoricoIcon from "../../../public/historicoIcon"

export const NavBar = () => {
    const router = useRouter();

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

                <Button variant="outline" onClick={() => router.push("/pages/outcoming")}>
                    <SaidaIcon /> Saída de Pedidos
                </Button>


                <Button variant="outline" onClick={() => router.push("/pages/history")}>
                    <HistoricoIcon /> Histórico
                </Button>

            </div>
        </div>
    );
};