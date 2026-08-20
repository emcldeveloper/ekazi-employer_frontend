import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CountryForm from "./CountryForm";

const CreateCountry = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Country</DialogTitle>
        </DialogHeader>
        <CountryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCountry;
