'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useProperties } from '@/contexts/properties-context';
import { MoreHorizontal, PlusCircle, DownloadCloud, Loader2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { importFromAltoAction } from './actions';
import { useToast } from '@/hooks/use-toast';

export default function PropertiesPage() {
  const { properties, importProperties } = useProperties();
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const newProperties = await importFromAltoAction();
      if (newProperties.length > 0) {
        importProperties(newProperties);
        toast({
          title: 'Import Successful',
          description: `${newProperties.length} properties have been imported from Alto.`,
        });
      } else {
        toast({
          title: 'Nothing to Import',
          description: 'No new properties were found in your Alto feed.',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description: 'Could not import properties from Alto. Please check your API credentials and try again.',
      });
    } finally {
      setIsImporting(false);
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
            <div>
                <CardTitle>Properties</CardTitle>
                <CardDescription>
                A list of all your properties. You can add them manually or import from Alto.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleImport} disabled={isImporting}>
                    {isImporting ? <Loader2 className="animate-spin" /> : <DownloadCloud />}
                    <span className="hidden sm:inline ml-2">Import from Alto</span>
                </Button>
                <Button asChild>
                    <Link href="/dashboard/properties/new">
                        <PlusCircle />
                        <span className="hidden sm:inline ml-2">Add Property</span>
                    </Link>
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="hidden md:table-cell">Images</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">
                  <Link href={`/dashboard/properties/${property.id}`} className="hover:underline">
                    {property.name}
                  </Link>
                </TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {property.images.length}
                </TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/properties/${property.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/properties/${property.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
