import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Camera, Star, Shield } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "30-Minute Walk",
      price: "$25",
      duration: "30 min",
      features: ["Perfect for young dogs", "Basic exercise", "Potty break", "Photo updates"],
      icon: Clock,
      popular: false
    },
    {
      title: "60-Minute Adventure",
      price: "$40", 
      duration: "60 min",
      features: ["Extended exercise", "Park playtime", "Socialization", "GPS tracking", "Video updates"],
      icon: MapPin,
      popular: true
    },
    {
      title: "Group Walk",
      price: "$20",
      duration: "45 min", 
      features: ["Socialization", "Cost effective", "Small groups (3-4 dogs)", "Experienced walkers"],
      icon: Users,
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose the Perfect Walk for Your Dog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dog is unique. Our flexible services ensure your furry friend gets exactly what they need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`relative p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 ${service.popular ? 'border-primary bg-gradient-card' : ''}`}>
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-2xl mb-4 ${service.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                  <service.icon className={`h-8 w-8 ${service.popular ? 'text-primary' : 'text-foreground'}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">{service.price}</span>
                  <span className="text-muted-foreground">/ {service.duration}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-1 rounded-full">
                      <Star className="h-3 w-3 text-secondary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={service.popular ? "hero" : "default"} 
                className="w-full"
                size="lg"
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-2xl mb-3">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">Insured & Bonded</h4>
            <p className="text-sm text-muted-foreground">Full coverage protection</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-secondary/10 p-4 rounded-2xl mb-3">
              <Camera className="h-8 w-8 text-secondary" />
            </div>
            <h4 className="font-semibold mb-1">Photo Updates</h4>
            <p className="text-sm text-muted-foreground">See your dog's adventure</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-accent/10 p-4 rounded-2xl mb-3">
              <MapPin className="h-8 w-8 text-accent" />
            </div>
            <h4 className="font-semibold mb-1">GPS Tracking</h4>
            <p className="text-sm text-muted-foreground">Live walk monitoring</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-2xl mb-3">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">5-Star Rated</h4>
            <p className="text-sm text-muted-foreground">Trusted by pet parents</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;