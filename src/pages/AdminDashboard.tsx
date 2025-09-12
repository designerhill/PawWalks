import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { CheckCircle, XCircle, Users, Calendar, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface WalkerProfile {
  id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  hourly_rate: number | null;
  experience_years: number | null;
  service_radius: number | null;
  is_verified: boolean | null;
  approval_status: string;
  created_at: string;
  phone: string | null;
  profile_image_url: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  rejection_reason?: string | null;
}

interface Booking {
  id: string;
  scheduled_date: string;
  status: string;
  total_price: number | null;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [walkers, setWalkers] = useState<WalkerProfile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    totalWalkers: 0,
    pendingApprovals: 0,
    totalBookings: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('user_id', user?.id)
        .single();

      if (profile?.user_type !== 'admin') {
        toast.error("Access denied. Admin privileges required.");
        return;
      }

      // Fetch walker profiles
      const { data: walkersData, error: walkersError } = await supabase
        .from('walker_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (walkersError) throw walkersError;
      setWalkers(walkersData || []);

      // Fetch bookings with simple data
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, scheduled_date, status, total_price')
        .order('scheduled_date', { ascending: false })
        .limit(50);

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Calculate stats
      const { data: allUsers } = await supabase
        .from('profiles')
        .select('id');

      setStats({
        totalWalkers: walkersData?.length || 0,
        pendingApprovals: walkersData?.filter(w => w.approval_status === 'pending').length || 0,
        totalBookings: bookingsData?.length || 0,
        totalUsers: allUsers?.length || 0,
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error("Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleWalkerApproval = async (walkerId: string, action: 'approved' | 'rejected', reason?: string) => {
    try {
      const updateData: any = {
        approval_status: action,
        approved_by: user?.id,
        approved_at: new Date().toISOString(),
      };

      if (action === 'rejected' && reason) {
        updateData.rejection_reason = reason;
      }

      if (action === 'approved') {
        updateData.is_verified = true;
      }

      const { error } = await supabase
        .from('walker_profiles')
        .update(updateData)
        .eq('id', walkerId);

      if (error) throw error;

      toast.success(`Walker ${action} successfully`);
      fetchAdminData(); // Refresh data
    } catch (error) {
      console.error('Error updating walker status:', error);
      toast.error(`Failed to ${action} walker`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage walkers, bookings, and system overview</p>
          </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Walkers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWalkers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <XCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.pendingApprovals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="walkers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="walkers">Walker Management</TabsTrigger>
          <TabsTrigger value="bookings">Bookings Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="walkers">
          <Card>
            <CardHeader>
              <CardTitle>Walker Applications</CardTitle>
              <CardDescription>Review and approve walker registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {walkers.map((walker) => (
                    <TableRow key={walker.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{walker.display_name}</div>
                          <div className="text-sm text-muted-foreground">{walker.phone || 'No phone'}</div>
                        </div>
                      </TableCell>
                      <TableCell>{walker.experience_years || 0} years</TableCell>
                      <TableCell>${walker.hourly_rate || 0}/hr</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            walker.approval_status === 'approved' ? 'default' : 
                            walker.approval_status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {walker.approval_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(walker.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {walker.approval_status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleWalkerApproval(walker.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleWalkerApproval(walker.id, 'rejected', 'Admin rejection')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Overview of all booking activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Dog Owner</TableHead>
                    <TableHead>Walker</TableHead>
                    <TableHead>Dog</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        {new Date(booking.scheduled_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            booking.status === 'completed' ? 'default' : 
                            booking.status === 'confirmed' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${booking.total_price || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}