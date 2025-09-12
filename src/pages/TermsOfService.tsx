import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Please read these terms carefully before using our services.
            </p>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Service Agreement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By using PawWalks, you agree to these terms and conditions. Our platform connects pet owners 
                    with verified dog walkers to provide safe, reliable pet care services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Pet Owners</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Provide accurate information about your pet's health, behavior, and needs</li>
                      <li>Ensure your pet is properly vaccinated and licensed</li>
                      <li>Inform walkers of any special care requirements or behavioral issues</li>
                      <li>Make timely payments for services</li>
                      <li>Treat walkers with respect and professionalism</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Dog Walkers</h4>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Provide safe, caring, and professional pet care services</li>
                      <li>Follow all instructions provided by pet owners</li>
                      <li>Maintain current insurance and background check clearance</li>
                      <li>Report any incidents or emergencies immediately</li>
                      <li>Respect client privacy and property</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking and Cancellation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Bookings must be made at least 2 hours in advance</li>
                    <li>Cancellations more than 24 hours in advance receive full refund</li>
                    <li>Cancellations within 24 hours may incur a 50% charge</li>
                    <li>Emergency cancellations will be evaluated case-by-case</li>
                    <li>Walkers who cancel with less than 2 hours notice may face penalties</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Payment is processed automatically after walk completion</li>
                    <li>Subscription plans auto-renew unless cancelled</li>
                    <li>Refunds are processed within 5-7 business days</li>
                    <li>Disputed charges must be reported within 48 hours</li>
                    <li>Service fees are non-refundable except in cases of service failure</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Safety and Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All walkers are insured and bonded through our comprehensive coverage. In the unlikely event 
                    of an incident, our insurance covers up to $1M in liability. Pet owners are responsible for 
                    ensuring their pets are healthy and safe for walking services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    PawWalks acts as a platform connecting pet owners with walkers. While we screen all walkers, 
                    we cannot guarantee outcomes. Our liability is limited to the cost of services. Users agree 
                    to resolve disputes through binding arbitration.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prohibited Uses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Users may not:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Use the platform for illegal activities</li>
                    <li>Harass, threaten, or abuse other users</li>
                    <li>Provide false information or impersonate others</li>
                    <li>Attempt to circumvent payment systems</li>
                    <li>Use automated systems to access the platform</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We may update these terms periodically. Users will be notified of significant changes 
                    via email. Continued use of the service constitutes acceptance of updated terms.
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