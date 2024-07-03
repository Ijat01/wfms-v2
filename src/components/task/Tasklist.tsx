import { TableCell, TableRow } from "@/components/ui/table";

export default function LinksVisitors({linkId}: {linkId: string}) {
  const visitors = [
    {
        id: "1",
        name: "almawi",
        totalDuration: "50",

    }
] // these are the visitor objects based on the linkId

  return (
    <>
      {visitors ? ( 
        visitors.map((visitor) => (
          <TableRow key={visitor.id}>
            <TableCell>{visitor.name}</TableCell>
            <TableCell>{visitor.totalDuration}</TableCell>
          </TableRow>
        ))
      ) : null}
    </>
  );
}