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
          {localData.length > 0 && (
            <TableRow>
              <TableHead>#</TableHead>
              {Object.keys(localData[0]).map((key) => (
                <TableHead key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableHead>
              ))}
            </TableRow>
          )}

        </TableHeader>
        <TableBody>
          {/* Inverting local list to help operator visualize*/}
          {[...localData].reverse().map((product: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{localData.length - index}</TableCell>

              {Object.entries(product).map(([key, value]) => (
                <TableCell key={key}>{String(value)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div >
  );
}
