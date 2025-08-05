import { useState, useEffect } from "react";
import { Search, MapPin, Star, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface WalkerProfile {
  id: string;
  display_name: string;
  bio: string;
  hourly_rate: number;
  experience_years: number;
  service_radius: number;
  is_verified: boolean;
  profile_image_url?: string;
  services?: Array<{
    id: string;
    name: string;
    service_type: string;
    price: number;
    duration_minutes: number;
  }>;
}

const Walkers = () => {
  const [walkers, setWalkers] = useState<WalkerProfile[]>([]);
  const [filteredWalkers, setFilteredWalkers] = useState<WalkerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWalkers();
  }, []);

  useEffect(() => {
    filterAndSortWalkers();
  }, [walkers, searchTerm, sortBy, experienceFilter]);

  const fetchWalkers = async () => {
    try {
      const { data, error } = await supabase
        .from('walker_profiles')
        .select(`
          *,
          services (
            id,
            name,
            service_type,
            price,
            duration_minutes
          )
        `)
        .eq('is_active', true);

      if (error) throw error;
      setWalkers(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load walkers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortWalkers = () => {
    let filtered = walkers.filter(walker => {
      const matchesSearch = walker.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (walker.bio && walker.bio.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesExperience = experienceFilter === "all" || 
        (experienceFilter === "beginner" && walker.experience_years <= 2) ||
        (experienceFilter === "experienced" && walker.experience_years > 2 && walker.experience_years <= 5) ||
        (experienceFilter === "expert" && walker.experience_years > 5);

      return matchesSearch && matchesExperience;
    });

    // Sort walkers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.hourly_rate || 0) - (b.hourly_rate || 0);
        case "price-high":
          return (b.hourly_rate || 0) - (a.hourly_rate || 0);
        case "experience":
          return (b.experience_years || 0) - (a.experience_years || 0);
        default:
          return a.display_name.localeCompare(b.display_name);
      }
    });

    setFilteredWalkers(filtered);
  };

  const WalkerCard = ({ walker }: { walker: WalkerProfile }) => (
    <Card className="group overflow-hidden hover:shadow-card transition-all duration-300 hover-scale">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
              {walker.profile_image_url ? (
                <img 
                  src={walker.profile_image_url} 
                  alt={walker.display_name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                walker.display_name.charAt(0).toUpperCase()
              )}
            </div>
            {walker.is_verified && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{walker.display_name}</h3>
              {walker.is_verified && (
                <Badge variant="secondary" className="text-xs">Verified</Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{walker.experience_years}+ years</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{walker.service_radius} mile radius</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-lg font-semibold text-primary">
              <DollarSign className="w-5 h-5" />
              <span>{walker.hourly_rate || 'Contact'}</span>
            </div>
            <span className="text-sm text-muted-foreground">per hour</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {walker.bio && (
          <p className="text-muted-foreground mb-4 line-clamp-2">{walker.bio}</p>
        )}
        
        {walker.services && walker.services.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm">Services offered:</h4>
            <div className="flex flex-wrap gap-2">
              {walker.services.slice(0, 3).map((service) => (
                <Badge key={service.id} variant="outline" className="text-xs">
                  {service.name}
                </Badge>
              ))}
              {walker.services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{walker.services.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            size="sm"
            onClick={() => navigate(`/booking?walkerId=${walker.id}`)}
          >
            Book Now
          </Button>
          <Button variant="outline" size="sm">
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="flex gap-2">
                      <div className="h-8 bg-muted rounded flex-1" />
                      <div className="h-8 bg-muted rounded w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search walkers by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Best Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                <SelectItem value="expert">Expert (5+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dog Walkers Near You</h1>
            <p className="text-muted-foreground">
              {filteredWalkers.length} walker{filteredWalkers.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Walkers Grid */}
        {filteredWalkers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No walkers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setExperienceFilter("all");
              setSortBy("rating");
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWalkers.map((walker) => (
              <WalkerCard key={walker.id} walker={walker} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Walkers;