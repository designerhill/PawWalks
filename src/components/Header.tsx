import { Button } from "@/components/ui/button";
import { Heart, User, Menu } from "lucide-react";
import appIcon from "@/assets/app-icon.jpg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={appIcon} alt="PawWalks" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-xl text-primary">PawWalks</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-foreground/80 hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#walkers" className="text-foreground/80 hover:text-foreground transition-colors">
            Find Walkers
          </a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="h-4 w-4" />
            Sign In
          </Button>
          <Button variant="cta" size="sm">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;