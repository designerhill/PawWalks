import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Heart, Calendar, Shield } from "lucide-react";

const BecomeWalker = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Become a PawWalks Walker</h1>
            <p className="text-xl text-muted-foreground">
              Turn your love for dogs into a rewarding career. Join our community of trusted pet care professionals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Earn $15-40/hour</h3>
                <p className="text-sm text-muted-foreground">Set your own rates and schedule</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Love What You Do</h3>
                <p className="text-sm text-muted-foreground">Spend time with amazing dogs</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-sm text-muted-foreground">Work when it fits your life</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Full Insurance</h3>
                <p className="text-sm text-muted-foreground">Protected every walk</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">✓</Badge>
                  <span>18+ years old</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">✓</Badge>
                  <span>Experience with dogs (personal or professional)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">✓</Badge>
                  <span>Pass background check</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">✓</Badge>
                  <span>Reliable smartphone</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">✓</Badge>
                  <span>Available for walks in your area</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Submit Application</h4>
                    <p className="text-muted-foreground">Complete our online application with your experience and availability.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Background Check</h4>
                    <p className="text-muted-foreground">We'll conduct a thorough background check for safety and security.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Interview & Training</h4>
                    <p className="text-muted-foreground">Meet with our team and complete safety training.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Start Walking</h4>
                    <p className="text-muted-foreground">Create your profile and start accepting walks!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" className="px-8">
              Apply Now
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Application takes about 10 minutes. We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeWalker;