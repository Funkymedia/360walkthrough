import PropertyForm from "@/components/dashboard/property-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NewPropertyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Property</CardTitle>
          <CardDescription>
            Fill out the form below to add a new property to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm />
        </CardContent>
      </Card>
    </div>
  );
}
