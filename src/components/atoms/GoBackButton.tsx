import { useRouter } from "next/navigation"
import ArrowBack from "../../../public/arrowBack"

export const GoBackButton = () => {
    const router = useRouter()


    return (
        <div
            className="absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => router.back()}
        >
            <ArrowBack className="w-6 h-6" />
        </div>
    )
}