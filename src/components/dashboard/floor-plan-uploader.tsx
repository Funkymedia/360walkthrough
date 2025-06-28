'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, File as FileIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function FloorPlanUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Pre-fill name based on file name, without extension
      setName(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = () => {
    if (!file || !name.trim()) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Please provide a file and a name for the floor plan.',
        });
        return;
    };

    setIsUploading(true);
    // Mock upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: 'Success!',
        description: `Floor plan "${name}" uploaded successfully.`,
      });
      setFile(null);
      setName('');
    }, 1500);
  };

  if (file) {
    return (
        <div className="space-y-4 text-left">
            <div className='flex items-center gap-3 p-3 rounded-lg border bg-muted/50'>
                <FileIcon className="h-8 w-8 text-muted-foreground shrink-0" />
                <p className='font-medium truncate'>{file.name}</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="floor-plan-name">Floor Plan Name</Label>
                <Input 
                    id="floor-plan-name" 
                    placeholder='e.g., Ground Floor' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className='flex justify-end gap-2 pt-4'>
                <Button variant="ghost" onClick={() => setFile(null)} disabled={isUploading}>Cancel</Button>
                <Button onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                    </>
                    ) : (
                    'Upload Floor Plan'
                    )}
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Upload Floor Plan</h3>
        <p className="mt-2 text-sm text-muted-foreground">
        Drag and drop or click to upload a PDF, JPEG, or PNG file.
        </p>
        <Button asChild variant="outline" className="mt-4">
        <label htmlFor="floor-plan-upload">
            Browse Files
            <input
            id="floor-plan-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,application/pdf"
            />
        </label>
        </Button>
    </div>
  );
}
