import { Button } from "../ui/button"

type Props = {
    onClose: () => void
    title: string
    description: string
}

export const Modal = ({ onClose, title, description }: Props) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-lg">
                <div className="bg-gray-500 text-white rounded-t-xl py-2 text-lg font-semibold">
                    {title}
                </div>

                <div className="mt-6 mb-4 flex items-center justify-center gap-2 text-black">
                    <span>{description}</span>
                </div>

                <div className="flex justify-center mt-6">
                    <Button variant="outline" className="font-mono" onClick={onClose}>
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    )
}