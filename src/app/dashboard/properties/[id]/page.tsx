import { mockProperties } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, User, Phone, Mail, Image as ImageIcon, PanelTop } from 'lucide-react';
import PropertyImageUploader from '@/components/dashboard/property-image-uploader';
import FloorPlanUploader from '@/components/dashboard/floor-plan-uploader';
import Image from 'next/image';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = mockProperties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="flex items-center gap-2 text-muted-foreground">
          <Building className="h-4 w-4" /> {property.address}
        </p>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">360° Images</TabsTrigger>
          <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="mt-1 text-muted-foreground">{property.description}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-muted-foreground">
                    <p className="flex items-center gap-2"><User className="h-4 w-4" /> {property.contact.name}</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {property.contact.email}</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {property.contact.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images" className="mt-6">
          <PropertyImageUploader initialImages={property.images} />
        </TabsContent>
        <TabsContent value="floorplan" className="mt-6">
            <Card>
            <CardHeader>
                <CardTitle>Floor Plan</CardTitle>
                <CardDescription>Upload and view the property's floor plan.</CardDescription>
            </CardHeader>
            <CardContent>
                {property.floorPlanUrl ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                         <Image src={property.floorPlanUrl} alt="Floor plan" fill className="object-contain" data-ai-hint="floor plan" />
                    </div>
                ) : (
                    <FloorPlanUploader />
                )}
            </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
