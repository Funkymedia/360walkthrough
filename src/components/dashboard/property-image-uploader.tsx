'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { generateImageTags } from '@/ai/flows/generate-image-tags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, Loader2, X, Pin, Waypoints, ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Property, PropertyImage, ImagePath } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useProperties } from '@/contexts/properties-context';
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

interface PropertyImageUploaderProps {
  property: Property;
}

export default function PropertyImageUploader({ property }: PropertyImageUploaderProps) {
  const { addImage, updateImage, deleteImage } = useProperties();
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        const newImage = await addImage(property.id, file);
        handleGenerateTags(newImage.id, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateTags = async (imageId: string, photoDataUri: string) => {
    setIsGenerating((prev) => ({ ...prev, [imageId]: true }));
    try {
      const result = await generateImageTags({ photoDataUri });
      // The property object from context might be stale here, so we find from the latest properties state
      const { properties } = useProperties();
      const currentProperty = properties.find(p => p.id === property.id);
      const imageToUpdate = currentProperty?.images.find(img => img.id === imageId);
      
      if (imageToUpdate) {
        updateImage(property.id, { ...imageToUpdate, tags: result.tags });
      }
    } catch (error) {
      console.error('Error generating tags:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate image tags.',
      });
    } finally {
      setIsGenerating((prev) => ({ ...prev, [imageId]: false }));
    }
  };

  const handleDeleteImage = (id: string) => {
    deleteImage(property.id, id);
    toast({
      title: "Image Deleted",
      description: "The image has been successfully removed.",
    });
  };

  const removeTag = (image: PropertyImage, tagToRemove: string) => {
    const updatedTags = image.tags.filter((tag) => tag !== tagToRemove);
    updateImage(property.id, { ...image, tags: updatedTags });
  };

  const addTag = (image: PropertyImage, newTag: string) => {
    if (newTag.trim() === '' || image.tags.includes(newTag.trim())) return;
    const updatedTags = [...image.tags, newTag.trim()];
    updateImage(property.id, { ...image, tags: updatedTags });
  };

  const handleRemovePath = (image: PropertyImage, pathId: string) => {
    const updatedPaths = image.paths?.filter((p) => p.id !== pathId);
    updateImage(property.id, { ...image, paths: updatedPaths });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>360° Images</CardTitle>
        <CardDescription>
          Manage the 360° images for this property. Configure starting views and link images together with hotspots.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {property.images.map((image) => (
            <Card key={image.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={image.url} alt="360 preview" fill className="object-cover" />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute right-2 top-2 h-7 w-7"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this image.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteImage(image.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="p-4 flex-grow flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  {isGenerating[image.id] && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating tags...
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="pr-1">
                        {tag}
                        <button onClick={() => removeTag(image, tag)} className="ml-1 rounded-full p-0.5 hover:bg-destructive/20">
                          <X className="h-3 w-3"/>
                        </button>
                      </Badge>
                    ))}
                    <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.elements.namedItem('newTag') as HTMLInputElement; addTag(image, input.value); input.value = ''; }}>
                          <div className="flex items-center">
                              <Input name="newTag" placeholder="Add tag" className="h-7 text-xs flex-grow" />
                          </div>
                      </form>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t mt-auto">
                    <h4 className="font-semibold">Configuration</h4>
                    
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm"><Pin className="h-4 w-4 text-muted-foreground"/> Starting View</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Pitch" defaultValue={image.startingView?.pitch} className="text-xs h-8" />
                            <Input type="number" placeholder="Yaw" defaultValue={image.startingView?.yaw} className="text-xs h-8" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm"><Waypoints className="h-4 w-4 text-muted-foreground"/> Hotspots (Paths)</Label>
                        <div className="space-y-1">
                            {image.paths?.map(path => (
                                <div key={path.id} className="flex items-center justify-between text-xs bg-muted/50 p-1.5 rounded-md">
                                    <div className="flex items-center gap-2">
                                    <ArrowRight className="h-3 w-3" />
                                    <span>{path.name}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemovePath(image, path.id)}>
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                             {(!image.paths || image.paths.length === 0) && (
                                <p className="text-xs text-muted-foreground p-1.5">No hotspots added.</p>
                             )}
                        </div>
                        <form className="flex gap-2 pt-2 items-center">
                            <Input placeholder="Hotspot Name" className="h-8 text-xs flex-grow" />
                            <Select>
                                <SelectTrigger className="h-8 text-xs w-[120px] shrink-0">
                                    <SelectValue placeholder="Link to..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {property.images.filter(i => i.id !== image.id).map(targetImage => (
                                        <SelectItem key={targetImage.id} value={targetImage.id}>
                                            Image {targetImage.id.substring(4, 10)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button size="sm" type="submit" variant="outline" className="h-8">Add</Button>
                        </form>
                    </div>
                </div>
              </div>
            </Card>
          ))}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors hover:border-primary hover:bg-primary/5 min-h-[400px]"
          >
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Upload Images</h3>
            <p className="mt-2 text-sm text-muted-foreground">Click or drag files here</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
