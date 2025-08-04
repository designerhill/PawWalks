import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MapPin, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-dog-walker.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional dog walker with happy dogs" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-bounce-in">
            Trusted Dog Walking
            <span className="text-accent block">Made Simple</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Connect with verified, loving dog walkers in your neighborhood. 
            Your furry friend deserves the best care while you're away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Button variant="hero" size="xl" className="animate-bounce-in">
              <Heart className="h-5 w-5" />
              Find a Walker
            </Button>
            <Button variant="cta" size="xl" className="animate-bounce-in">
              Become a Walker
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 text-center text-white">
            <div className="animate-float">
              <Shield className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">Verified Walkers</p>
            </div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>
              <MapPin className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">GPS Tracking</p>
            </div>
            <div className="animate-float" style={{ animationDelay: '2s' }}>
              <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="text-sm font-medium">24/7 Support</p>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 shadow-glow">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Loving Care</h3>
                <p className="text-muted-foreground">
                  Each walker is background-checked and trained to provide the best care for your pet.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 shadow-glow">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Updates</h3>
                <p className="text-muted-foreground">
                  Get live GPS tracking, photos, and updates throughout every walk.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-white/20 shadow-glow">
            <div className="flex items-start gap-4">
              <div className="bg-accent/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground">
                  Book walks on-demand or schedule recurring walks that fit your routine.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;