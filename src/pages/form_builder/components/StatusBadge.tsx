import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export function StatusBadge({ status }: Props) {
  if (status === "PUBLISHED") {
    return <Badge className="bg-green-500 hover:bg-green-500">Published</Badge>;
  }

  return <Badge variant="secondary">Draft</Badge>;
}
