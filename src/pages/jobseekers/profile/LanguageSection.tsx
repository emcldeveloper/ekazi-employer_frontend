import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Language } from "@/@types/applicants";

interface LanguageSectionProps {
  languages: Language[];
}

const LanguageSection = ({ languages }: LanguageSectionProps) => {
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
            {languages.map((item: Language) => (
              <TableRow key={item.id}>
                <TableCell>{item.language}</TableCell>
                <TableCell>{item.read}</TableCell>
                <TableCell>{item.write}</TableCell>
                <TableCell>{item.speak}</TableCell>
                <TableCell>{item.understand}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
