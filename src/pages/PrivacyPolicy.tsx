import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Information</h4>
                    <p className="text-muted-foreground">
                      We collect information you provide directly, such as your name, email address, phone number, 
                      and payment details when you create an account or book services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pet Information</h4>
                    <p className="text-muted-foreground">
                      Information about your pets including breed, age, medical conditions, and special care instructions 
                      to ensure proper care during walks.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Location Data</h4>
                    <p className="text-muted-foreground">
                      We collect location information to match you with nearby walkers and track walks for safety purposes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide and improve our pet care services</li>
                    <li>Match you with qualified dog walkers in your area</li>
                    <li>Process payments and communicate about bookings</li>
                    <li>Send important updates about your pet's care</li>
                    <li>Ensure safety and security of all users</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We do not sell your personal information. We may share information in these limited circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>With dog walkers assigned to care for your pet</li>
                    <li>With service providers who help us operate our platform</li>
                    <li>When required by law or to protect safety</li>
                    <li>With your explicit consent</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your information against unauthorized access, 
                    alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of non-essential communications</li>
                    <li>Request a copy of your data</li>
                    <li>File a complaint with regulatory authorities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy, please contact us at privacy@pawwalks.com 
                    or call (555) 123-PAWS.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Last updated: December 2024
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}