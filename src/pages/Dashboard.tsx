import { useState, useEffect } from "react";
import { Calendar, Clock, DollarSign, User, Heart, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Booking {
  id: string;
  scheduled_date: string;
  start_time: string;
  end_time?: string;
  status: string;
  total_price?: number;
  special_instructions?: string;
  created_at: string;
  dogs: {
    name: string;
    breed?: string;
  };
  walker_profiles: {
    display_name: string;
    user_id: string;
  };
  services: {
    name: string;
    service_type: string;
    duration_minutes: number;
  };
}

interface WalkerBooking {
  id: string;
  scheduled_date: string;
  start_time: string;
  end_time?: string;
  status: string;
  total_price?: number;
  special_instructions?: string;
  dogs: {
    name: string;
    breed?: string;
    owner_id: string;
  };
  services: {
    name: string;
    service_type: string;
    duration_minutes: number;
  };
}

const Dashboard = () => {
  const [ownerBookings, setOwnerBookings] = useState<Booking[]>([]);
  const [walkerBookings, setWalkerBookings] = useState<WalkerBooking[]>([]);
  const [isWalker, setIsWalker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalSpent: 0,
    totalEarned: 0
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Check if user is a walker
      const { data: walkerProfile } = await supabase
        .from('walker_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      setIsWalker(!!walkerProfile);

      // Fetch bookings as dog owner
      const { data: ownerBookingsData, error: ownerError } = await supabase
        .from('bookings')
        .select(`
          *,
          dogs (name, breed),
          walker_profiles (display_name, user_id),
          services (name, service_type, duration_minutes)
        `)
        .eq('dog_owner_id', user?.id)
        .order('scheduled_date', { ascending: false });

      if (ownerError) throw ownerError;
      setOwnerBookings(ownerBookingsData || []);

      let walkerBookingsData: any[] = [];
      // Fetch bookings as walker (if user is a walker)
      if (walkerProfile) {
        const { data: walkerData, error: walkerError } = await supabase
          .from('bookings')
          .select(`
            *,
            dogs (name, breed, owner_id),
            services (name, service_type, duration_minutes)
          `)
          .eq('walker_id', walkerProfile.id)
          .order('scheduled_date', { ascending: false });

        if (walkerError) throw walkerError;
        walkerBookingsData = walkerData || [];
        setWalkerBookings(walkerBookingsData);
      }

      // Calculate stats
      const totalSpent = ownerBookingsData?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;
      const completedOwnerBookings = ownerBookingsData?.filter(b => b.status === 'completed').length || 0;
      
      const totalEarned = walkerProfile && walkerBookingsData
        ? walkerBookingsData.reduce((sum, booking) => sum + (booking.total_price || 0), 0)
        : 0;

      setStats({
        totalBookings: ownerBookingsData?.length || 0,
        completedBookings: completedOwnerBookings,
        totalSpent,
        totalEarned
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string, isWalkerBooking = false) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${newStatus} successfully`,
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary';
      case 'completed': return 'bg-primary';
      case 'cancelled': return 'bg-destructive';
      case 'in_progress': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const BookingCard = ({ booking, isWalkerView = false }: { booking: Booking | WalkerBooking, isWalkerView?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-card transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
              {booking.dogs.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold">{booking.dogs.name}</h3>
              <p className="text-sm text-muted-foreground">
                {isWalkerView ? 'Your client\'s dog' : ('walker_profiles' in booking ? booking.walker_profiles.display_name : 'Walker')}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(booking.status)}
              {booking.status}
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(booking.scheduled_date).toLocaleDateString()}</span>
            <Clock className="w-4 h-4 text-muted-foreground ml-2" />
            <span>{booking.start_time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{booking.services.name}</span>
            <span className="text-muted-foreground">({booking.services.duration_minutes} min)</span>
          </div>
          
          {booking.total_price && (
            <div className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span>${booking.total_price}</span>
            </div>
          )}
          
          {booking.special_instructions && (
            <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
              <strong>Instructions:</strong> {booking.special_instructions}
            </p>
          )}
          
          {/* Action buttons for walker */}
          {isWalkerView && booking.status === 'pending' && (
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                onClick={() => updateBookingStatus(booking.id, 'confirmed', true)}
                className="flex-1"
              >
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => updateBookingStatus(booking.id, 'cancelled', true)}
              >
                Decline
              </Button>
            </div>
          )}
          
          {/* Action buttons for confirmed bookings */}
          {booking.status === 'confirmed' && (
            <div className="flex gap-2 pt-2">
              {isWalkerView ? (
                <Button 
                  size="sm" 
                  onClick={() => updateBookingStatus(booking.id, 'in_progress', true)}
                  className="flex-1"
                >
                  Start Walk
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          )}
          
          {/* Complete walk button */}
          {booking.status === 'in_progress' && isWalkerView && (
            <Button 
              size="sm" 
              onClick={() => updateBookingStatus(booking.id, 'completed', true)}
              className="w-full"
            >
              Complete Walk
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
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
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded" />
              ))}
            </div>
            <div className="h-96 bg-muted rounded" />
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedBookings}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSpent}</div>
            </CardContent>
          </Card>
          
          {isWalker && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalEarned}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="owner" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="owner">My Bookings</TabsTrigger>
            {isWalker && (
              <TabsTrigger value="walker">Walker Bookings</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="owner">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Bookings</h2>
                <Button onClick={() => navigate('/walkers')}>
                  <Heart className="w-4 h-4 mr-2" />
                  Book a Walk
                </Button>
              </div>
              
              {ownerBookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Book your first walk to get started
                  </p>
                  <Button onClick={() => navigate('/walkers')}>
                    Find a Walker
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {ownerBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          {isWalker && (
            <TabsContent value="walker">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Walker Bookings</h2>
                
                {walkerBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No walker bookings yet</h3>
                    <p className="text-muted-foreground">
                      Bookings from clients will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {walkerBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} isWalkerView />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;