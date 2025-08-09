import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, FileText, Phone } from "lucide-react";

const Insurance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Insurance Coverage</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive insurance protection for every walk, giving you complete peace of mind.
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Shield className="h-6 w-6" />
                  Complete Coverage Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  Every PawWalks service is fully insured through our partnership with leading pet insurance providers.
                  Your pet is protected from the moment our walker arrives until they safely return home.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Liability Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Up to $1,000,000 in general liability</li>
                    <li>• Property damage protection</li>
                    <li>• Third-party injury coverage</li>
                    <li>• Professional liability insurance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Pet Care Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Veterinary emergency expenses</li>
                    <li>• Lost or stolen pet recovery</li>
                    <li>• Pet injury during service</li>
                    <li>• Emergency medical transport</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Walker Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Worker injury compensation</li>
                    <li>• Personal property protection</li>
                    <li>• Professional indemnity</li>
                    <li>• Legal defense coverage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Bonding & Theft
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Walker bonding up to $25,000</li>
                    <li>• Theft and damage protection</li>
                    <li>• Key and access security</li>
                    <li>• Home security coverage</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  Coverage Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Automatic Coverage</h4>
                    <p className="text-muted-foreground">
                      All services are automatically covered at no additional cost to you. 
                      Coverage begins when your walker starts their service and continues until completion.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Claims Process</h4>
                    <p className="text-muted-foreground">
                      In the unlikely event of an incident, our claims process is simple and fast. 
                      Contact our support team immediately, and we'll guide you through every step.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Insurance Partners</h4>
                    <p className="text-muted-foreground">
                      We work with A-rated insurance companies specializing in pet care services. 
                      Our policies are regularly reviewed and updated to provide the best protection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  Filing a Claim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Report Immediately</h4>
                      <p className="text-muted-foreground">Contact our 24/7 claims hotline: 1-800-PAWCLAIM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Document Everything</h4>
                      <p className="text-muted-foreground">Take photos, gather information, and keep all relevant documentation</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Claims Processing</h4>
                      <p className="text-muted-foreground">Our team will investigate and process your claim within 48 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold mb-4">Fully Protected, Always</h3>
                <p className="text-muted-foreground">
                  With PawWalks, you never have to worry about "what if." 
                  Our comprehensive insurance means you and your pet are protected every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Insurance;