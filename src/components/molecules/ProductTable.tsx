import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";

type Props = {
  localData: any[],
  setLocalData: (data: any) => void
}

export function ProductTable({ localData, setLocalData }: Props) {


  const removeIndex = (index: number) => {
    const updatedList = [...localData]
    updatedList.splice(index, 1)
    setLocalData(updatedList)
  }

  return (
    <div className="h-40 overflow-y-auto rounded-md border">
      <Table >
        <TableHeader>
          {localData.length > 0 && (
            <TableRow>
              <TableHead>#</TableHead>
              {Object.keys(localData[0]).map((key) => (
                <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>
              ))}
              <TableHead>Ações</TableHead>
            </TableRow>
          )}

        </TableHeader>
        <TableBody>
          {/* Inverting local list to help operator visualize*/}
          {[...localData].reverse().map((product: any, index: number) => (
            <TableRow key={index}>

              {/*#*/}
              <TableCell className="font-medium ">{localData.length - index}</TableCell>

              {/*Percorre a lista de objetos dos produtos, e vai pegar o valor em string*/}
              {Object.entries(product).map(([key, value]) => (
                <TableCell key={key}>{String(value)}</TableCell>
              ))}


              <TableCell>
                {/*Dado o fato da lista estar ao contrário, é necessário fazer a subtração do seu tamanho pelo index, e ainda -1,(referente a posicao 0) para poder alcancar o valor correspondente. */}
                <Button type="button" variant={"ghost"} title="Deletar" onClick={() => removeIndex(localData.length - 1 - index)}>❌</Button>
                <Button type="button" variant={"ghost"} title="Deletar" onClick={() => console.log("Precisa Implementar")}>✏️</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div >
  );
}
