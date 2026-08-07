export type MatchDetail = {
  name: string;
  matched: boolean;
  score: number;
};

export type PotentialCandidate = {
  applicant_id: number;
  full_name: string;
  picture: string;
  current_position: string;
  experience_years: number;
  match_percentage: number;
  match_details: MatchDetail[];
};
