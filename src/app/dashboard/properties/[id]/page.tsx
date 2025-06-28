'use client';

import { mockProperties } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Building, User, Phone, Mail, PlusCircle, Download, FileText } from 'lucide-react';
import PropertyImageUploader from '@/components/dashboard/property-image-uploader';
import FloorPlanUploader from '@/components/dashboard/floor-plan-uploader';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RequestChangesForm from '@/components/dashboard/request-changes-form';

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
          <TabsTrigger value="floorplan">Floor Plans</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6 space-y-6">
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
          <RequestChangesForm />
        </TabsContent>
        <TabsContent value="images" className="mt-6">
          <PropertyImageUploader initialImages={property.images} />
        </TabsContent>
        <TabsContent value="floorplan" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Floor Plans</CardTitle>
                    <CardDescription>Manage the property's floor plans.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Floor Plan</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload New Floor Plan</DialogTitle>
                            <DialogDescription>
                                Select a new image (JPEG) or PDF file and give it a name.
                            </DialogDescription>
                        </DialogHeader>
                        <FloorPlanUploader />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {property.floorPlans && property.floorPlans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.floorPlans.map((plan) => (
                            <Card key={plan.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {plan.url.endsWith('.pdf') ? (
                                    <div className="flex flex-col items-center justify-center h-48 bg-muted rounded-md text-center p-4">
                                        <FileText className="h-16 w-16 text-muted-foreground" />
                                        <p className='text-sm text-muted-foreground mt-2'>PDF Document</p>
                                    </div>
                                    ) : (
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                                        <Image src={plan.url} alt={plan.name} fill className="object-contain" data-ai-hint="floor plan" />
                                    </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="outline" className="ml-auto">
                                    <a href={plan.url} download>
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
                        <h3 className="text-xl font-semibold">No Floor Plans Found</h3>
                        <p className="mt-2 text-muted-foreground">
                            Click "Add Floor Plan" to get started.
                        </p>
                    </div>
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
