'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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

const EpcCertificateDisplay = ({ certificate }: { certificate: DomesticCertificate }) => {
    const downloadUrl = `https://find-energy-certificate.service.gov.uk/energy-certificate/${certificate['lmk-key']}`;

    const calculateLeftPercentage = (value: number) => {
        if (value < 1) return 0.5;
        if (value > 100) return 99.5;
        return value;
    }

    return (
        <div className="w-full space-y-4 rounded-lg p-6 bg-white text-black shadow-lg font-sans">
            <div className="text-center pb-4 border-b">
                <h3 className="text-2xl font-bold">Energy Performance Certificate</h3>
                <p className="text-sm text-gray-600">England & Wales</p>
            </div>
            
            <div className="border-b pb-2 text-sm">
                <p className="font-bold">{certificate.address}, {certificate.postcode}</p>
                <div className="flex justify-between mt-1 text-gray-700">
                    <span>Certificate number: <span className="font-mono">{certificate['lmk-key']}</span></span>
                    <span>Valid until: {new Date(certificate['expiry-date']).toLocaleDateString()}</span>
                </div>
            </div>
            
            <div className="pt-2">
                <h4 className="font-semibold text-lg mb-2">Energy efficiency rating</h4>
                <div className="relative mb-16 mt-4">
                    <div className="flex text-sm text-white text-center font-bold rounded-sm overflow-hidden shadow-md">
                        <div className="w-[21%] bg-[#00833e] py-2 text-left pl-2 flex flex-col justify-center"><span>(92+)</span><span>A</span></div>
                        <div className="w-[12%] bg-[#25974a] py-2 flex flex-col justify-center"><span>(81-91)</span><span>B</span></div>
                        <div className="w-[14%] bg-[#97cb4a] py-2 text-black flex flex-col justify-center"><span>(69-80)</span><span>C</span></div>
                        <div className="w-[14%] bg-[#fef200] py-2 text-black flex flex-col justify-center"><span>(55-68)</span><span>D</span></div>
                        <div className="w-[16%] bg-[#f5a822] py-2 text-black flex flex-col justify-center"><span>(39-54)</span><span>E</span></div>
                        <div className="w-[18%] bg-[#f06d24] py-2 flex flex-col justify-center"><span>(21-38)</span><span>F</span></div>
                        <div className="w-[5%] bg-[#e92128] py-2 flex flex-col justify-center"><span>(1-20)</span><span>G</span></div>
                    </div>
                    
                    <div className="absolute top-full mt-2 w-full">
                         <div 
                            className="absolute font-bold text-sm text-black flex flex-col items-center"
                            style={{ left: `${calculateLeftPercentage(certificate['current-energy-efficiency'])}%`, transform: 'translateX(-50%)' }}
                        >
                            <div className="flex items-center bg-black text-white px-2 py-1 rounded">
                                {certificate['current-energy-efficiency']}
                            </div>
                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-b-black"></div>
                            <span className="text-xs mt-1">Current</span>
                        </div>

                         <div 
                            className="absolute top-10 font-bold text-sm text-blue-600 flex flex-col items-center"
                             style={{ left: `${calculateLeftPercentage(certificate['potential-energy-efficiency'])}%`, transform: 'translateX(-50%)' }}
                        >
                            <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded">
                                {certificate['potential-energy-efficiency']}
                            </div>
                             <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-b-blue-600"></div>
                             <span className="text-xs mt-1">Potential</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-gray-50 p-4 text-sm">
                <h4 className="font-semibold mb-2">Property Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <p><strong>Property Type:</strong> {certificate['property-type']}</p>
                    <p><strong>Built Form:</strong> {certificate['built-form']}</p>
                    <p><strong>Total Floor Area:</strong> {certificate['total-floor-area']} m²</p>
                    <p><strong>Local Authority:</strong> {certificate['local-authority-label']}</p>
                </div>
            </div>
             <div className="flex justify-end pt-2">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download Official Certificate
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
        <DialogContent className="max-w-2xl bg-transparent border-none shadow-none p-0">
            {isFetchingDetails && 
                <div className="min-h-[400px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white"/>
                </div>
            }
            {selectedCertificate && <EpcCertificateDisplay certificate={selectedCertificate} />}
        </DialogContent>
    </Dialog>
    </>
  );
}
