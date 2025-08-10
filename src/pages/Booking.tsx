import { useState, useEffect } from "react";
import { Calendar, Clock, DollarSign, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Dog {
  id: string;
  name: string;
  breed?: string;
  size?: string;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  duration_minutes: number;
  price: number;
  service_type: string;
}

interface WalkerProfile {
  id: string;
  display_name: string;
  hourly_rate?: number;
  services: Service[];
}

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const walkerId = searchParams.get('walkerId');
  
  const [walker, setWalker] = useState<WalkerProfile | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDog, setSelectedDog] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    if (walkerId) {
      fetchWalkerAndDogs();
    } else {
      setLoading(false);
    }
  }, [user, walkerId]);

  const fetchWalkerAndDogs = async () => {
    try {
      // Fetch walker info with services
      const { data: walkerData, error: walkerError } = await supabase
        .from('walker_profiles')
        .select(`
          *,
          services (*)
        `)
        .eq('id', walkerId)
        .single();

      if (walkerError) throw walkerError;
      setWalker(walkerData);

      // Fetch user's dogs
      const { data: dogsData, error: dogsError } = await supabase
        .from('dogs')
        .select('id, name, breed, size')
        .eq('owner_id', user?.id)
        .eq('is_active', true);

      if (dogsError) throw dogsError;
      setDogs(dogsData || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load booking information",
        variant: "destructive",
      });
      navigate('/walkers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !walker) return;

    try {
      const selectedServiceData = walker.services.find(s => s.id === selectedService);
      if (!selectedServiceData) throw new Error('Service not found');

      const endTime = new Date(`${scheduledDate}T${startTime}`);
      endTime.setMinutes(endTime.getMinutes() + selectedServiceData.duration_minutes);

      const { error } = await supabase
        .from('bookings')
        .insert({
          dog_owner_id: user.id,
          walker_id: walkerId,
          dog_id: selectedDog,
          service_id: selectedService,
          scheduled_date: scheduledDate,
          start_time: startTime,
          end_time: endTime.toTimeString().slice(0, 5),
          special_instructions: specialInstructions || null,
          total_price: selectedServiceData.price,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your booking request has been sent to the walker",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking",
        variant: "destructive",
      });
    }
  };

  const getSelectedServicePrice = () => {
    const service = walker?.services.find(s => s.id === selectedService);
    return service?.price || 0;
  };

  const getSelectedServiceDuration = () => {
    const service = walker?.services.find(s => s.id === selectedService);
    return service?.duration_minutes || 0;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to book a walker</h1>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-96 bg-muted rounded" />
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!walker || dogs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {!walker ? "Walker not found" : "No dogs found"}
          </h1>
          <p className="text-muted-foreground mb-4">
            {!walker 
              ? "The walker you're trying to book is not available" 
              : "Please add a dog to your profile before booking a walker"
            }
          </p>
          <Button onClick={() => navigate(dogs.length === 0 ? '/dogs' : '/walkers')}>
            {dogs.length === 0 ? 'Add a Dog' : 'Browse Walkers'}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book a Walk</h1>
          <p className="text-muted-foreground">Schedule a walk with {walker.display_name}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Walker Info */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {walker.display_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{walker.display_name}</h3>
                  {walker.hourly_rate && (
                    <p className="text-muted-foreground">
                      ${walker.hourly_rate}/hour base rate
                    </p>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <h4 className="font-semibold mb-3">Available Services</h4>
              <div className="space-y-3">
                {walker.services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">{service.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {service.duration_minutes} minutes
                      </p>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${service.price}</p>
                      <Badge variant="outline" className="text-xs">
                        {service.service_type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dog Selection */}
                <div>
                  <Label htmlFor="dog">Select Dog *</Label>
                  <Select value={selectedDog} onValueChange={setSelectedDog} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your dog" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogs.map((dog) => (
                        <SelectItem key={dog.id} value={dog.id}>
                          <div className="flex items-center gap-2">
                            <span>{dog.name}</span>
                            {dog.breed && (
                              <span className="text-muted-foreground">({dog.breed})</span>
                            )}
                            {dog.size && (
                              <Badge variant="outline" className="text-xs">
                                {dog.size}
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Service Selection */}
                <div>
                  <Label htmlFor="service">Select Service *</Label>
                  <Select value={selectedService} onValueChange={setSelectedService} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {walker.services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price} ({service.duration_minutes} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      min={minDate}
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any special instructions for the walker..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>

                {/* Booking Summary */}
                {selectedService && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{walker.services.find(s => s.id === selectedService)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{getSelectedServiceDuration()} minutes</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${getSelectedServicePrice()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;