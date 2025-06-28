'use client';

import { useProperties } from '@/contexts/properties-context';
import { notFound, useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Building, User, Phone, Mail, PlusCircle, Download, FileText, Camera, Orbit, ExternalLink, Trash2, Pencil, Check, X } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RequestChangesForm from '@/components/dashboard/request-changes-form';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { properties, deleteFloorPlan, updateProperty } = useProperties();
  const { toast } = useToast();
  const property = properties.find((p) => p.id === params.id);
  
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(property?.name || '');

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(property?.address || '');

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactName, setContactName] = useState(property?.contact.name || '');
  const [contactEmail, setContactEmail] = useState(property?.contact.email || '');
  const [contactPhone, setContactPhone] = useState(property?.contact.phone || '');


  useEffect(() => {
    if (property) {
      setName(property.name);
      setAddress(property.address);
      setContactName(property.contact.name);
      setContactEmail(property.contact.email);
      setContactPhone(property.contact.phone);
    }
  }, [property]);

  if (!property) {
    notFound();
  }

  const handleDeleteFloorPlan = (floorPlanId: string) => {
    if (property) {
      deleteFloorPlan(property.id, floorPlanId);
      toast({
        title: "Floor Plan Deleted",
        description: "The floor plan has been successfully removed.",
      });
    }
  };

  const handleNameSave = () => {
    if (property && name.trim()) {
      updateProperty(property.id, {
        name: name,
        address: property.address,
        description: property.description,
        contactName: property.contact.name,
        contactEmail: property.contact.email,
        contactPhone: property.contact.phone
      });
      setIsEditingName(false);
      toast({
        title: "Success",
        description: "Property name has been updated."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Property name cannot be empty."
      });
    }
  };

  const handleAddressSave = () => {
    if (property && address.trim()) {
      updateProperty(property.id, {
        name: property.name,
        address: address,
        description: property.description,
        contactName: property.contact.name,
        contactEmail: property.contact.email,
        contactPhone: property.contact.phone
      });
      setIsEditingAddress(false);
      toast({
        title: "Success",
        description: "Property address has been updated."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Property address cannot be empty."
      });
    }
  };

  const handleContactSave = () => {
    if (property && contactName.trim() && contactEmail.trim() && contactPhone.trim()) {
      updateProperty(property.id, {
        name: property.name,
        address: property.address,
        description: property.description,
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone
      });
      setIsEditingContact(false);
      toast({
        title: "Success",
        description: "Contact information has been updated."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All contact fields are required."
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex min-h-[48px] items-center gap-2">
          {isEditingName ? (
            <div className="flex w-full items-center gap-2">
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleNameSave() }}
                className="h-auto py-2 text-3xl font-bold"
              />
              <Button size="icon" onClick={handleNameSave}>
                <Check className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => { setIsEditingName(false); setName(property.name); }}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{property.name}</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsEditingName(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {isEditingAddress ? (
          <div className="flex w-full items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <Input 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddressSave() }}
              className="h-auto py-1"
            />
            <Button size="icon" className="h-8 w-8" onClick={handleAddressSave}>
                <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8" variant="ghost" onClick={() => { setIsEditingAddress(false); setAddress(property.address); }}>
                <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-4 w-4" /> {property.address}
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditingAddress(true)}>
              <Pencil className="h-3 w-3" />
            </Button>
          </p>
        )}
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images" className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Camera className="mr-2 h-4 w-4" />
            360° Images
          </TabsTrigger>
          <TabsTrigger value="floorplan">Floor Plans</TabsTrigger>
          <TabsTrigger value="tour">
            <Orbit className="mr-2 h-4 w-4" />
            360° Tour
          </TabsTrigger>
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Contact Information</h3>
                  {!isEditingContact && (
                      <Button variant="ghost" size="sm" onClick={() => setIsEditingContact(true)}>
                          <Pencil className="mr-2 h-3 w-3" />
                          Edit
                      </Button>
                  )}
                </div>
                {isEditingContact ? (
                  <div className="space-y-4">
                      <div className="space-y-1">
                          <Label htmlFor="contact-name" className="text-xs text-muted-foreground">Name</Label>
                          <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Input id="contact-name" value={contactName} onChange={(e) => setContactName(e.target.value)} className="h-8" />
                          </div>
                      </div>
                      <div className="space-y-1">
                          <Label htmlFor="contact-email" className="text-xs text-muted-foreground">Email</Label>
                          <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Input id="contact-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="h-8" />
                          </div>
                      </div>
                      <div className="space-y-1">
                          <Label htmlFor="contact-phone" className="text-xs text-muted-foreground">Phone</Label>
                          <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <Input id="contact-phone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="h-8" />
                          </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                          <Button size="sm" variant="ghost" onClick={() => {
                              setIsEditingContact(false);
                              setContactName(property.contact.name);
                              setContactEmail(property.contact.email);
                              setContactPhone(property.contact.phone);
                          }}>Cancel</Button>
                          <Button size="sm" onClick={handleContactSave}>Save</Button>
                      </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                      <p className="flex items-center gap-2"><User className="h-4 w-4" /> {property.contact.name}</p>
                      <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {property.contact.email}</p>
                      <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {property.contact.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <RequestChangesForm />
        </TabsContent>
        <TabsContent value="images" className="mt-6 space-y-6">
          <PropertyImageUploader property={property} />
          {property.tourUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Interactive 360° Tour</CardTitle>
                <CardDescription>The full virtual tour is also available here for easy access.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                  <iframe
                    src={property.tourUrl}
                    className="h-full w-full"
                    allow="fullscreen; xr-spatial-tracking"
                  ></iframe>
                </div>
              </CardContent>
              <CardFooter>
                  <Button asChild className="ml-auto">
                      <a href={property.tourUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> View Fullscreen
                      </a>
                  </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="floorplan" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Floor Plans</CardTitle>
                    <CardDescription>Manage the property's floor plans.</CardDescription>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
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
                        <FloorPlanUploader propertyId={property.id} onUploadSuccess={() => setIsUploadDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {property.floorPlans && property.floorPlans.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                <CardFooter className="grid grid-cols-2 gap-2">
                                    <Button asChild variant="outline">
                                      <a href={plan.url} download>
                                          <Download className="mr-2 h-4 w-4" /> Download
                                      </a>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the floor plan.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteFloorPlan(plan.id)}>
                                                Continue
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
        <TabsContent value="tour" className="mt-6">
            <Card>
            <CardHeader>
                <CardTitle>Interactive 360° Tour</CardTitle>
                <CardDescription>Explore the full virtual tour of the property.</CardDescription>
            </CardHeader>
            <CardContent>
                {property.tourUrl ? (
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                    <iframe
                    src={property.tourUrl}
                    className="h-full w-full"
                    allow="fullscreen; xr-spatial-tracking"
                    ></iframe>
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
                    <h3 className="text-xl font-semibold">Tour Not Available</h3>
                    <p className="mt-2 text-muted-foreground">
                    The 360° tour for this property has not been generated yet.
                    </p>
                </div>
                )}
            </CardContent>
            {property.tourUrl && (
                <CardFooter>
                    <Button asChild className="ml-auto">
                        <a href={property.tourUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> View Fullscreen
                        </a>
                    </Button>
                </CardFooter>
            )}
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
