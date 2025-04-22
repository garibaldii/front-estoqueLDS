"use client"

import { Button } from "../ui/button"
import { CheckSquare } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
    onClose: () => void
    title: string
    description: string
}

export const SucessModal = ({ onClose, title, description }: Props) => {
    const router = useRouter()

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="bg-green-500 text-white rounded-t-xl p-3 text-lg font-semibold">
                    {title}
                </div>

                <div className="mt-6 mb-4 flex items-center justify-center gap-2 text-black">
                    <CheckSquare className="text-green-600" />
                    <span>{description}</span>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <Button  className="bg-gray-500 text-white font-mono " onClick={onClose}>
                        Continuar
                    </Button>

                    <Button
                        variant="outline"
                        className="font-mono"
                        onClick={() => router.push("/pages/dashboard")} 
                    >
                        Voltar ao Menu
                    </Button>
                </div>
            </div>
        </div>
    )
}
