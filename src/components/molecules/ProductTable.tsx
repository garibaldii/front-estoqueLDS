import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export function ProductTable({ localData }: any) {

  return (
    <div className="h-40 overflow-y-auto rounded-md border">
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead >#</TableHead>
            <TableHead className="w-[100px]">Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Potência</TableHead>
            <TableHead >Código de Barras</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Inverting local list to help operator visualize*/}
          {[...localData].reverse().map((product: any, index: number) => (

            <TableRow key={product.codigoDeBarras}>
              <TableCell className="font-medium">{localData.length - index}</TableCell>
              <TableCell className="font-medium">{product.marca}</TableCell>
              <TableCell>{product.modelo}</TableCell>
              <TableCell>{product.potencia}</TableCell>
              <TableCell>{product.codigoDeBarras}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
}
