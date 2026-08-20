import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const CultureForm = () => {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name-1">Name</FieldLabel>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </Field>
        <Field>
          <FieldLabel htmlFor="username-1">Username</FieldLabel>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </Field>
      </FieldGroup>

      <div className="mt-4 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CultureForm;
