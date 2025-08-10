import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Home, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "30-Minute Walks",
      icon: Clock,
      price: "$15-25",
      duration: "30 minutes",
      description: "Perfect for daily exercise and bathroom breaks. Ideal for busy schedules and senior dogs.",
      features: [
        "Basic exercise and potty break",
        "Photo updates during walk",
        "Fresh water provided",
        "Post-walk report"
      ],
      popular: false
    },
    {
      title: "60-Minute Adventures",
      icon: MapPin,
      price: "$25-40",
      duration: "60 minutes",
      description: "Extended walks with playtime at parks. Great for high-energy dogs and thorough exercise.",
      features: [
        "Extended exercise and exploration",
        "Park playtime included",
        "Multiple photo updates",
        "Detailed activity report",
        "Basic training reinforcement"
      ],
      popular: true
    },
    {
      title: "Group Walks",
      icon: Users,
      price: "$20-30",
      duration: "45 minutes",
      description: "Socialization walks with other friendly dogs. Perfect for social pets who love company.",
      features: [
        "Supervised dog socialization",
        "Maximum 3 dogs per group",
        "Temperament matching",
        "Group play sessions",
        "Social behavior reports"
      ],
      popular: false
    },
    {
      title: "Pet Sitting",
      icon: Home,
      price: "$30-50",
      duration: "Per visit",
      description: "In-home pet care while you're away. Includes feeding, playtime, and companionship.",
      features: [
        "Feeding and medication",
        "Indoor playtime",
        "Litter box cleaning",
        "Plant watering",
        "Home security check",
        "Extended companionship"
      ],
      popular: false
    },
    {
      title: "Emergency Care",
      icon: Heart,
      price: "Contact us",
      duration: "As needed",
      description: "Last-minute pet care for unexpected situations. Available 24/7 for urgent needs.",
      features: [
        "24/7 availability",
        "Same-day service",
        "Emergency vet transport",
        "Medication administration",
        "Special needs care",
        "Immediate response"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Professional pet care services tailored to your furry friend's needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className={`relative ${service.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <service.icon className="h-6 w-6 text-primary" />
                    {service.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Badge variant="outline">{service.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={service.popular ? "default" : "outline"}
                    onClick={() => navigate("/walkers")}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Need a Custom Service?</h3>
                <p className="text-muted-foreground mb-6">
                  We understand every pet has unique needs. Contact us to discuss custom care packages 
                  tailored specifically for your furry family member.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate("/booking")}>
                    Get Custom Quote
                  </Button>
                  <Button variant="outline">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;