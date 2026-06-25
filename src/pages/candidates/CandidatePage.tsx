import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CandidatePage = () => {
  return (
    <div className="space-y-6">
      <Card size="sm">
        <CardContent>
          <div>
            <h2 className="text-2xl font-bold">Candidates</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse and review candidate profiles, shortlist top talent for
              your job openings.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-20 text-center text-muted-foreground"
                >
                  No Candidates Information
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatePage;
