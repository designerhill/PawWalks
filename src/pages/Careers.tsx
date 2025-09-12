import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Code, Heart, Briefcase } from "lucide-react";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Build and maintain our React-based web platform that connects pet owners with trusted walkers.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Experience with modern web APIs"]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Experience",
      location: "San Francisco, CA",
      type: "Full-time", 
      salary: "$80k - $100k",
      description: "Help pet owners and walkers have amazing experiences on our platform.",
      requirements: ["3+ years customer success experience", "Excellent communication skills", "Love for pets"]
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      salary: "$70k - $90k", 
      description: "Drive growth through digital marketing campaigns and community building.",
      requirements: ["2+ years digital marketing", "Social media expertise", "Data-driven mindset"]
    },
    {
      title: "Operations Coordinator",
      department: "Operations",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$60k - $75k",
      description: "Coordinate walker onboarding and ensure smooth daily operations.",
      requirements: ["Operations experience", "Organizational skills", "Problem-solving abilities"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Pet-Friendly Office",
      description: "Bring your furry friends to work every day"
    },
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Above-market compensation plus equity"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible scheduling"
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Work with passionate pet lovers"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Join the PawWalks Pack</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Help us build the future of pet care while working with an amazing team of pet lovers
            </p>
            <Button size="lg" variant="secondary">
              View Open Positions
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Company Culture */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Work at PawWalks?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{position.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">{position.department}</Badge>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {position.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {position.salary}
                          </span>
                        </CardDescription>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Pet First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every decision we make puts the safety and happiness of pets at the center.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Driven
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We build strong communities of pet lovers who support each other.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We use technology to make pet care more accessible and reliable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Application Process */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      1
                    </div>
                    <h4 className="font-semibold mb-2">Apply</h4>
                    <p className="text-sm text-muted-foreground">Submit your application online</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      2
                    </div>
                    <h4 className="font-semibold mb-2">Screen</h4>
                    <p className="text-sm text-muted-foreground">Initial phone or video call</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      3
                    </div>
                    <h4 className="font-semibold mb-2">Interview</h4>
                    <p className="text-sm text-muted-foreground">Meet the team and discuss the role</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      4
                    </div>
                    <h4 className="font-semibold mb-2">Welcome</h4>
                    <p className="text-sm text-muted-foreground">Join the PawWalks family!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don't see a role that fits? We're always looking for talented pet lovers!
              </p>
              <Button variant="outline">Send Us Your Resume</Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}