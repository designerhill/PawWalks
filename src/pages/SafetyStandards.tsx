import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, UserCheck, Camera, Phone, MapPin, Heart } from "lucide-react";

const SafetyStandards = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Safety Standards</h1>
            <p className="text-xl text-muted-foreground">
              Your pet's safety is our top priority. Learn about our comprehensive safety measures.
            </p>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-primary" />
                  Walker Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Comprehensive background checks including criminal history</li>
                  <li>• Identity verification with government-issued ID</li>
                  <li>• Reference checks from previous pet care experience</li>
                  <li>• In-person interviews and safety training</li>
                  <li>• Ongoing performance monitoring and reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  Walk Safety Protocols
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Mandatory safety training for all walkers</li>
                  <li>• Required use of proper leashes and safety equipment</li>
                  <li>• Adherence to local leash laws and regulations</li>
                  <li>• Emergency first aid training for pets</li>
                  <li>• Safe route planning avoiding high-traffic areas</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Camera className="h-6 w-6 text-primary" />
                  Real-Time Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• GPS tracking for all walks with live location sharing</li>
                  <li>• Photo updates during walks to show your pet is safe</li>
                  <li>• Start and end notifications for every service</li>
                  <li>• Walk reports with route maps and duration</li>
                  <li>• 24/7 customer support during all services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  Emergency Procedures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 24/7 emergency hotline for urgent situations</li>
                  <li>• Direct access to local veterinary emergency services</li>
                  <li>• Immediate notification to pet owners in case of incidents</li>
                  <li>• Detailed emergency contact information for each pet</li>
                  <li>• Pre-approved emergency veterinary care authorization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  Secure Key Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Secure key pickup and return protocols</li>
                  <li>• Verification of walker identity before key handover</li>
                  <li>• Digital key tracking system</li>
                  <li>• Immediate key return after each service</li>
                  <li>• Alternative secure entry options when available</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  Pet Health & Wellness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Required up-to-date vaccination records</li>
                  <li>• Health and temperament assessment for each pet</li>
                  <li>• Special needs and medical condition awareness</li>
                  <li>• Weather-appropriate walk adjustments</li>
                  <li>• Immediate attention to any signs of distress</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Questions About Safety?</h3>
                <p className="text-muted-foreground mb-6">
                  We're here to address any concerns and provide additional information about our safety protocols.
                </p>
                <p className="font-semibold">
                  Contact our Safety Team: safety@pawwalks.com
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

export default SafetyStandards;