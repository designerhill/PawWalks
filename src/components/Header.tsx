import { Button } from "@/components/ui/button";
import { Heart, User, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import appIcon from "@/assets/app-icon.jpg";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={appIcon} alt="PawWalks" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-xl text-primary">PawWalks</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => navigate("/dogs")} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            My Dogs
          </button>
          <button 
            onClick={() => navigate("/walkers")} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Find Walkers
          </button>
          <button 
            onClick={() => navigate("/dashboard")} 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Dashboard
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleAuthAction} className="hidden md:flex">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleAuthAction} className="hidden md:flex">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}
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