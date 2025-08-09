import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About PawWalks</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  At PawWalks, we believe every dog deserves love, care, and adventure. 
                  We connect pet owners with trusted, professional dog walkers who treat 
                  your furry family members like their own.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Founded in 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Started by dog lovers who understand the challenges of busy schedules 
                  and the need for reliable pet care. We've grown into a trusted 
                  community of walkers and pet families.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Safety and security for all pets</li>
                  <li>Professional, background-checked walkers</li>
                  <li>Transparent communication</li>
                  <li>Affordable, quality care</li>
                  <li>Building lasting relationships</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose PawWalks?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Verified and insured walkers</li>
                  <li>Real-time updates and photos</li>
                  <li>Flexible scheduling</li>
                  <li>24/7 customer support</li>
                  <li>Satisfaction guarantee</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;