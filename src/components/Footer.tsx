import { Heart, MapPin, Phone, Mail } from "lucide-react";
import appIcon from "@/assets/app-icon.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={appIcon} alt="PawWalks" className="h-8 w-8 rounded-lg" />
              <span className="font-bold text-xl">PawWalks</span>
            </div>
            <p className="text-primary-foreground/80">
              Trusted dog walking services connecting loving walkers with pet parents in your neighborhood.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Made with love for pets</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/services" className="hover:text-accent transition-colors">30-Minute Walks</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">60-Minute Adventures</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Group Walks</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Pet Sitting</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/become-walker" className="hover:text-accent transition-colors">Become a Walker</a></li>
              <li><a href="/safety" className="hover:text-accent transition-colors">Safety Standards</a></li>
              <li><a href="/insurance" className="hover:text-accent transition-colors">Insurance</a></li>
              <li><a href="/careers" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>(555) 123-PAWS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>hello@pawwalks.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Available in 50+ cities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2024 PawWalks. All rights reserved. • <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a> • <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;