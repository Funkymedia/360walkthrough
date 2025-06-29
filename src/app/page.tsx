import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Sparkles, Building, PanelTop, Check, Orbit, Camera, FileCheck } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-image.png"
              alt="A tablet showcasing the 360 Walkthrough application interface"
              fill
              className="object-cover"
              data-ai-hint="app interface"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">
              Create Stunning 360° Virtual Tours
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200 mb-10">
              360 Walkthrough helps you build and share immersive property experiences. Upload your 360° photos and floor plans, and let our AI do the heavy lifting.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Powerful Features, Simplified</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Everything you need to create professional virtual tours that captivate and convert.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Easy 360° Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Quickly upload images from your Ricoh 360 cameras and other sources. Our platform optimises them for a smooth viewing experience.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">AI-Powered Tagging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our AI automatically generates descriptive tags for your images, saving you time and improving searchability.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <PanelTop className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Floor Plan Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Upload floor plans to give a complete spatial context to your virtual tours, linking photos to specific rooms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Create a Floor Plan in 10 Minutes</h2>
                <p className="text-muted-foreground mb-6">
                  Floor plans are a necessity when listing a property, yet they are often incredibly tedious and time consuming for estate agents. Our system is designed to streamline your floor plan creation process and remove the stress with our all-in-one solution.
                </p>
                <p className="text-muted-foreground mb-6">
                  By capturing one image per room we can create you a 98% accurate floor plan, eliminating the need for complex software and manual measuring.
                </p>
                <p className="font-semibold text-lg mb-6">You take the photo, we do the rest.</p>
                <div className="space-y-4">
                    <h3 className="font-bold text-xl">Reduce Admin Time</h3>
                    <p className="text-muted-foreground">Your floor plans are guaranteed to be delivered to you by the end of the next working day, with the option to be watermarked with your company logo.</p>
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-4 text-muted-foreground sm:grid-cols-2">
                        <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Next day working delivery</li>
                        <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> One-shot-per-room</li>
                        <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> No manual measuring</li>
                        <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> No floor plan software</li>
                        <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Customisable room labels</li>
                        <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Complete with dimensions</li>
                    </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Example of a generated floor plan"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="floor plan diagram"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Example of a 360 virtual tour"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="virtual tour property"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Virtual Tours Enhance Physical Viewings</h2>
                <p className="text-muted-foreground mb-6">
                  Upgrade your listings beyond traditional static images. Allow buyers to virtually explore a property from the comfort of their own homes, creating a
                  dynamic and engaging experience that brings your listings to life.
                </p>
                <p className="text-muted-foreground mb-6">
                  It is a common misconception that a virtual tour will minimise the number of viewings you get on a property, but this isn’t entirely true. Virtual tours
                  actually maximise the number of viewings you can get online by reaching out-of-area buyers. Furthermore, a virtual tour will pre-screen your buyers,
                  leading to more serious enquiries and higher quality buyer leads.
                </p>
                <p className="text-muted-foreground mb-8">
                  Our one-shot-per-room technology creates a fully branded 4K virtual tour and 98% accurate floor plan in under 10 minutes for a 3-bedroom house.
                </p>
                <Button asChild>
                  <Link href="#">
                    <Orbit className="mr-2 h-4 w-4" />
                    Example 360 Virtual Tour
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Official RICOH 360 Supplier</h2>
                <p className="text-muted-foreground mb-6">
                  As an official supplier of RICOH 360 cameras, we provide the best equipment for creating stunning virtual tours. Get the right gear to capture immersive, high-quality imagery for your properties.
                </p>
                 <ul className="grid grid-cols-1 gap-x-8 gap-y-4 text-muted-foreground sm:grid-cols-2 mb-8">
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Latest RICOH models</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Competitive Pricing</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Expert Support</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Fast UK Shipping</li>
                </ul>
                <Button asChild>
                  <Link href="#">
                    <Camera className="mr-2 h-4 w-4" />
                    Explore our camera models
                  </Link>
                </Button>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="RICOH 360 camera"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="RICOH 360 camera"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Example of an EPC certificate"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="EPC certificate"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Check and order EPCs, without leaving your screen</h2>
                <p className="text-muted-foreground mb-6">
                  Sorting your EPCs shouldn’t be an effort. Safeguard your time and let our team oversee the entire process.
                </p>
                <Button asChild>
                  <Link href="/dashboard/epcs">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Download the certificate
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering estate agents and our team</h2>
                <p className="text-muted-foreground mb-6">
                  We help ambitious estate agents win more instructions, generate more leads, and grow their businesses with 360 Walkthroughs. And we know that great work starts with a great team. That’s why we invest in our people – fostering a culture of collaboration, growth, and innovation. When our team thrives, so do our customers.
                </p>
                <p className="font-semibold text-lg text-right">- Cristina Axford, Founder of Funky Media LTD</p>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Portrait of the founder, Cristina Axford"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="professional portrait"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Ready to Create Your First Tour?</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4 mb-8">
              Sign up today and start creating virtual tours that leave a lasting impression.
            </p>
            <Button size="lg" variant="default" asChild>
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 360 Walkthrough. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
