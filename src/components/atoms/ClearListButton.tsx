import { Button } from "../ui/button"

interface Prop {
    setLocalData: React.Dispatch<React.SetStateAction<any[]>>
}

export default function ClearListButton({ setLocalData: setLocalData }: Prop) {
    return <Button type="reset" variant={"ghost"} onClick={() => setLocalData([])}>Limpar Lista</Button>
}