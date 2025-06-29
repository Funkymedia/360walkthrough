'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { removeImageObjects } from '@/ai/flows/remove-image-objects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { UploadCloud, Loader2, Trash2, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { Property, StandardPropertyImage } from '@/lib/types';
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

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


export default function PropertyStandardImageUploader({ property }: { property: Property }) {
    const { addStandardImage, updateStandardImage, deleteStandardImage } = useProperties();
    const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        for (const file of Array.from(files)) {
           await addStandardImage(property.id, file);
        }
    };
    
    const handleRemoveObjects = async (image: StandardPropertyImage) => {
        if (!image.instructions || image.instructions.trim() === '') {
            toast({
                variant: 'destructive',
                title: 'Instructions Required',
                description: 'Please describe what you want to remove.',
            });
            return;
        }

        setIsProcessing((prev) => ({...prev, [image.id]: true}));

        try {
            const dataUrl = await fileToDataUrl(await (await fetch(image.url)).blob());
            const result = await removeImageObjects({
                photoDataUri: dataUrl,
                instructions: image.instructions,
            });

            updateStandardImage(property.id, {
                ...image,
                editedUrl: result.editedPhotoDataUri
            });

            toast({
                title: 'Success!',
                description: 'Image has been retouched.',
            });
        } catch (error) {
            console.error('Error removing objects:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to retouch image. Please try again.',
            });
        } finally {
            setIsProcessing((prev) => ({...prev, [image.id]: false}));
        }
    };

    const handleDeleteImage = (id: string) => {
        deleteStandardImage(property.id, id);
        toast({
            title: "Image Deleted",
            description: "The image has been successfully removed.",
        });
    };
    
    const handleInstructionsChange = (imageId: string, instructions: string) => {
        const image = property.standardImages?.find(img => img.id === imageId);
        if (image) {
            updateStandardImage(property.id, { ...image, instructions });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Image Retouching</CardTitle>
                <CardDescription>
                    Object removal in property listings goes beyond aesthetics; it respects privacy, ensures a neutral presentation, and removes distracting elements, creating a professional, marketable image. By tactically eliminating personal photos and information, vendors allow potential buyers to focus on the property’s features without disruptions. It’s a strategic tool for presenting properties in a visually pleasing and inclusive manner.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6">
                    {(property.standardImages || []).map((image) => (
                        <Card key={image.id} className="overflow-hidden">
                             <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/50">
                                <p className="font-semibold">Retouch Image</p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete this image and its retouched version.
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
                            </CardHeader>
                            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <div className="space-y-4">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                        <Image src={image.url} alt="Original property image" fill className="object-cover" data-ai-hint="property interior" />
                                        <Badge variant="secondary" className="absolute top-2 left-2">Original</Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`instructions-${image.id}`}>Instructions</Label>
                                        <Textarea 
                                            id={`instructions-${image.id}`}
                                            placeholder="e.g., 'Remove the picture frames from the wall and the vase from the table.'"
                                            value={image.instructions || ''}
                                            onChange={(e) => handleInstructionsChange(image.id, e.target.value)}
                                            rows={3}
                                            disabled={isProcessing[image.id]}
                                        />
                                    </div>
                                    <Button onClick={() => handleRemoveObjects(image)} disabled={isProcessing[image.id]}>
                                        {isProcessing[image.id] ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                Remove Objects
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                     <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                                        {image.editedUrl ? (
                                            <>
                                                <Image src={image.editedUrl} alt="Retouched property image" fill className="object-cover" data-ai-hint="clean room" />
                                                <Badge variant="default" className="absolute top-2 left-2">Retouched</Badge>
                                            </>
                                        ) : isProcessing[image.id] ? (
                                            <div className="text-center text-muted-foreground p-4">
                                                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                                <p>AI is retouching the image...</p>
                                            </div>
                                        ) : (
                                            <div className="text-center text-muted-foreground p-4">
                                                <p>The retouched image will appear here.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors hover:border-primary hover:bg-primary/5 min-h-[200px]"
                    >
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">Upload 2D Images</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Click or drag files here to upload for retouching</p>
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
