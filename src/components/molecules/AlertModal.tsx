import { Button } from "../ui/button"

type Props = {
    onClose: () => void
    title: string
    description: any
    hasBackDrop?: boolean
}

export const AlertModal = ({ onClose, title, description, hasBackDrop }: Props) => {
    return (
        <div className={`fixed inset-0  flex items-center justify-center p-4 w-full ${hasBackDrop ? " bg-black bg-opacity-60" : ""}`}>
            <div className="bg-white rounded-2xl w-full max-w-3xl p-6 text-center shadow-lg overflow-auto">
                <div className="bg-gray-50 text-black rounded-t-xl py-2 text-lg font-semibold">
                    {title}
                </div>

                <div className="mt-6 mb-4 flex flex-wrap items-center justify-center gap-2 text-black break-words">
                    <span className="max-w-full">{description}</span>
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
