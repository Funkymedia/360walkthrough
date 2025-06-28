'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FloorPlanUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    // Mock upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: 'Success!',
        description: 'Floor plan uploaded successfully.',
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
      {file ? (
        <div className="space-y-4">
            <div className='flex items-center gap-2 text-lg font-medium'>
                <File className="h-8 w-8 text-muted-foreground" />
                <p>{file.name}</p>
            </div>
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
      ) : (
        <>
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Upload Floor Plan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop or click to upload a PDF or image file.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <label htmlFor="floor-plan-upload">
              Browse Files
              <input
                id="floor-plan-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
              />
            </label>
          </Button>
        </>
      )}
    </div>
  );
}
