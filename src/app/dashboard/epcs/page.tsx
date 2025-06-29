'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { searchEpcs, getCertificate, DomesticSearchResult, DomesticCertificate } from './actions';
import { Loader2, Search, FileText, Download } from 'lucide-react';

const EnergyRatingBadge = ({ rating }: { rating: string }) => {
  const ratingColors: { [key: string]: string } = {
    a: 'bg-green-700',
    b: 'bg-green-600',
    c: 'bg-yellow-500',
    d: 'bg-yellow-400',
    e: 'bg-orange-500',
    f: 'bg-orange-600',
    g: 'bg-red-700',
  };
  const colorClass = ratingColors[rating.toLowerCase()] || 'bg-gray-400';
  const textColor = ['c', 'd'].includes(rating.toLowerCase()) ? 'text-black' : 'text-white';

  return (
    <div className={`flex h-6 w-8 items-center justify-center rounded-sm font-bold ${textColor} ${colorClass}`}>
        {rating.toUpperCase()}
    </div>
  );
};

const EnergyRatingChart = ({ value, isPotential = false }: { value: number, isPotential?: boolean }) => {
    const getBarData = (val: number) => {
        if (val >= 92) return { rating: 'A', range: '92+', color: 'bg-green-700', left: '7%' };
        if (val >= 81) return { rating: 'B', range: '81-91', color: 'bg-green-600', left: '22%' };
        if (val >= 69) return { rating: 'C', range: '69-80', color: 'bg-yellow-500', left: '37%' };
        if (val >= 55) return { rating: 'D', range: '55-68', color: 'bg-yellow-400', left: '52%' };
        if (val >= 39) return { rating: 'E', range: '39-54', color: 'bg-orange-500', left: '67%' };
        if (val >= 21) return { rating: 'F', range: '21-38', color: 'bg-orange-600', left: '82%' };
        return { rating: 'G', range: '1-20', color: 'bg-red-700', left: '94%' };
    };

    const data = getBarData(value);

    return (
        <div className="font-sans w-full">
            <div className="flex text-xs text-white text-center font-bold">
                <div className="w-[15%] bg-green-700 rounded-l-sm py-1">A</div>
                <div className="w-[15%] bg-green-600 py-1">B</div>
                <div className="w-[15%] bg-yellow-500 py-1 text-black">C</div>
                <div className="w-[15%] bg-yellow-400 py-1 text-black">D</div>
                <div className="w-[15%] bg-orange-500 py-1">E</div>
                <div className="w-[15%] bg-orange-600 py-1">F</div>
                <div className="w-[10%] bg-red-700 rounded-r-sm py-1">G</div>
            </div>
            <div className="relative h-4 mt-1">
                <div 
                    className={`absolute -top-1 w-10 h-6 ${isPotential ? 'bg-blue-600' : 'bg-black'} text-white rounded flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg`} 
                    style={{ left: `calc(${data.left} - 20px)` }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
};


const CertificateDetails = ({ certificate }: { certificate: DomesticCertificate }) => {
    const downloadUrl = `https://find-energy-certificate.service.gov.uk/energy-certificate/${certificate['lmk-key']}`;

    return (
        <div className="w-full space-y-4">
            <div>
                <h4 className="font-semibold text-sm mb-2">Energy efficiency rating</h4>
                <div className='space-y-2'>
                    <EnergyRatingChart value={certificate['current-energy-efficiency']} />
                    <EnergyRatingChart value={certificate['potential-energy-efficiency']} isPotential />
                </div>
                 <div className="flex items-center gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-black" /> Current</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-blue-600" /> Potential</div>
                </div>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="font-semibold mb-2">Property Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p><strong>Address:</strong> {certificate.address}, {certificate.postcode}</p>
                    <p><strong>Property Type:</strong> {certificate['property-type']}</p>
                    <p><strong>Built Form:</strong> {certificate['built-form']}</p>
                    <p><strong>Total Floor Area:</strong> {certificate['total-floor-area']} m²</p>
                    <p><strong>Local Authority:</strong> {certificate['local-authority-label']}</p>
                    <p><strong>Valid Until:</strong> {new Date(certificate['expiry-date']).toLocaleDateString()}</p>
                    <p className="col-span-full"><strong>Certificate Key:</strong> <span className="font-mono text-xs">{certificate['lmk-key']}</span></p>
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button asChild>
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download Certificate
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default function EpcPage() {
  const [postcode, setPostcode] = useState('');
  const [results, setResults] = useState<DomesticSearchResult['rows']>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<DomesticCertificate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wasSearched, setWasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;

    setIsSearching(true);
    setWasSearched(true);
    setError(null);
    setResults([]);
    try {
      const searchResults = await searchEpcs(postcode);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to fetch EPC data. Please try again.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleViewCertificate = async (lmkKey: string) => {
    setIsFetchingDetails(true);
    setSelectedCertificate(null);
    try {
        const certificateDetails = await getCertificate(lmkKey);
        setSelectedCertificate(certificateDetails);
    } catch (err) {
        setError('Failed to fetch certificate details.');
        console.error(err);
    } finally {
        setIsFetchingDetails(false);
    }
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Energy Performance Certificate (EPC) Lookup</CardTitle>
        <CardDescription>
          Check and order EPCs without leaving your screen. Safeguard your time and let our team oversee the entire process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSearch} className="flex w-full max-w-md items-center space-x-2">
          <Input
            placeholder="Enter a UK postcode (e.g., SW1A 0AA)"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            disabled={isSearching}
          />
          <Button type="submit" disabled={isSearching || !postcode.trim()}>
            {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
            <span className="hidden sm:inline ml-2">Search</span>
          </Button>
        </form>
        
        {error && <p className="text-destructive">{error}</p>}

        {isSearching && (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Searching for certificates...</p>
            </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Potential</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result['lmk-key']}>
                    <TableCell className="font-medium max-w-xs truncate">{result.address}</TableCell>
                    <TableCell>
                      <EnergyRatingBadge rating={result['current-energy-rating']} />
                    </TableCell>
                    <TableCell>
                      <EnergyRatingBadge rating={result['potential-energy-rating']} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewCertificate(result['lmk-key'])}>
                          View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {!isSearching && results.length === 0 && wasSearched && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold mt-4">No Certificates Found</h3>
                <p className="mt-2 text-muted-foreground">
                    No EPC records found for the postcode "{postcode}". Please check the postcode and try again.
                </p>
            </div>
        )}

      </CardContent>
    </Card>
    
    <Dialog open={!!selectedCertificate || isFetchingDetails} onOpenChange={(open) => {if (!open) setSelectedCertificate(null)}}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>EPC Details</DialogTitle>
                <DialogDescription>
                    Full details for the selected Energy Performance Certificate.
                </DialogDescription>
            </DialogHeader>
            <div className="min-h-[200px] flex items-center justify-center">
                {isFetchingDetails && <Loader2 className="h-8 w-8 animate-spin"/>}
                {selectedCertificate && <CertificateDetails certificate={selectedCertificate} />}
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}
