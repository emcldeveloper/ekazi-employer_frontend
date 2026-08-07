import type {
  MatchDetail,
  PotentialCandidate,
} from "@/@types/potential-candidates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobseekerDetails from "@/pages/jobseekers/components/JobseekerDetails";

interface CandidateDetailsProps {
  candidate: PotentialCandidate;
}

const CandidateDetails = ({ candidate }: CandidateDetailsProps) => {
  const matchPercentage = candidate.match_percentage;
  const matchDetails = candidate.match_details ?? [];

  return (
    <div className="p-2">
      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="match">Match Details</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <JobseekerDetails jobseekerId={candidate.applicant_id} />
        </TabsContent>
        <TabsContent value="match">
          <Card>
            <CardHeader>
              <CardTitle>Job Match Details ({matchPercentage}%)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attribute</TableHead>
                    <TableHead>Matched</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchDetails.map((detail: MatchDetail) => (
                    <TableRow key={detail.name}>
                      <TableCell>{detail.name}</TableCell>
                      <TableCell>
                        {detail.matched ? (
                          <div className="text-green-500">Yes</div>
                        ) : (
                          <div className="text-red-500">No</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateDetails;
