import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const LanguageSection = ({ applicant }: { applicant: any }) => {
  const languages = applicant?.language ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Language</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Language</TableHead>
              <TableHead>Read</TableHead>
              <TableHead>Write</TableHead>
              <TableHead>Speak</TableHead>
              <TableHead>Understand</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {languages.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.language?.language_name ?? "-"}</TableCell>
                <TableCell>{item.read?.read_ability ?? "-"}</TableCell>
                <TableCell>{item.write?.write_ability ?? "-"}</TableCell>
                <TableCell>{item.speak?.speak_ability ?? "-"}</TableCell>
                <TableCell>
                  {item.understand?.understand_ability ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
