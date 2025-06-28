'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { useProperties } from '@/contexts/properties-context';
import PropertyForm from "@/components/dashboard/property-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function EditPropertyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { properties } = useProperties();
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl py-8">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Property</CardTitle>
          <CardDescription>
            Update the details for "{property.name}".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm initialData={property} />
        </CardContent>
      </Card>
    </div>
  );
}
