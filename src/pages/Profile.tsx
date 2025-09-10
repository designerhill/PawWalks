import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Camera, Shield, Star, Phone, MapPin, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UserProfile {
  id: string;
  user_id: string;
  user_type: 'user' | 'walker' | 'admin';
  display_name?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

interface WalkerProfile {
  id: string;
  user_id: string;
  display_name: string;
  bio?: string;
  hourly_rate?: number;
  experience_years?: number;
  service_radius?: number;
  is_verified: boolean;
  is_active: boolean;
  available_days: string[];
  phone?: string;
  profile_image_url?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [walkerProfile, setWalkerProfile] = useState<WalkerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [serviceRadius, setServiceRadius] = useState("");

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
      setProfile(profileData);
      setDisplayName(profileData?.display_name || "");
      setPhone(profileData?.phone || "");
      setBio(profileData?.bio || "");

      // If user is a walker, fetch walker profile
      if (profileData?.user_type === 'walker') {
        const { data: walkerData, error: walkerError } = await supabase
          .from('walker_profiles')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (walkerError && walkerError.code !== 'PGRST116') {
          console.log("No walker profile found");
        } else {
          setWalkerProfile(walkerData);
          setHourlyRate(walkerData?.hourly_rate?.toString() || "");
          setExperienceYears(walkerData?.experience_years?.toString() || "");
          setServiceRadius(walkerData?.service_radius?.toString() || "");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Update main profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          phone: phone,
          bio: bio,
        })
        .eq('user_id', user?.id);

      if (profileError) throw profileError;

      // If user is a walker, update walker profile
      if (profile?.user_type === 'walker' && walkerProfile) {
        const { error: walkerError } = await supabase
          .from('walker_profiles')
          .update({
            display_name: displayName,
            bio: bio,
            hourly_rate: hourlyRate ? parseFloat(hourlyRate) : null,
            experience_years: experienceYears ? parseInt(experienceYears) : null,
            service_radius: serviceRadius ? parseInt(serviceRadius) : null,
            phone: phone,
          })
          .eq('user_id', user?.id);

        if (walkerError) throw walkerError;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const initials = displayName ? displayName.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U';

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
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
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4 md:col-span-1">
                <div className="h-32 bg-muted rounded-lg" />
              </div>
              <div className="space-y-4 md:col-span-2">
                <div className="h-96 bg-muted rounded-lg" />
              </div>
            </div>
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
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-soft">
                      <AvatarImage src={profile?.avatar_url || walkerProfile?.profile_image_url} />
                      <AvatarFallback className="text-2xl bg-gradient-primary text-white">{initials}</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-soft">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{displayName || user.email}</CardTitle>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant={profile?.user_type === 'walker' ? 'default' : 'secondary'} className="shadow-sm">
                    {profile?.user_type === 'walker' ? 'Walker' : 'Dog Owner'}
                  </Badge>
                  {walkerProfile?.is_verified && (
                    <Badge variant="outline" className="text-primary border-primary bg-primary/10">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">{/* // ... keep existing code (profile content) */}
                {profile?.user_type === 'walker' && walkerProfile && (
                  <>
                    <div className="flex items-center gap-2 text-sm bg-secondary/10 p-3 rounded-lg">
                      <Star className="w-4 h-4 text-secondary" />
                      <span className="font-medium">{walkerProfile.experience_years || 0} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-accent/10 p-3 rounded-lg">
                      <MapPin className="w-4 h-4 text-accent-foreground" />
                      <span>{walkerProfile.service_radius || 5} km service radius</span>
                    </div>
                    {walkerProfile.hourly_rate && (
                      <div className="bg-gradient-primary text-white p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold">${walkerProfile.hourly_rate}</div>
                        <div className="text-sm opacity-90">per hour</div>
                      </div>
                    )}
                  </>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profile?.created_at || '').toLocaleDateString()}</span>
                </div>
                {phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{phone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-6 bg-muted/50">
                <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">General</TabsTrigger>
                {profile?.user_type === 'walker' && (
                  <TabsTrigger value="walker" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Walker Settings</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="general">
                <Card className="shadow-card border-0">
                  <CardHeader className="bg-gradient-card">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        General Information
                      </CardTitle>
                      <Button
                        variant={isEditing ? "outline" : "default"}
                        onClick={() => setIsEditing(!isEditing)}
                        className={isEditing ? "" : "bg-gradient-primary hover:opacity-90"}
                      >
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user.email || ""} disabled />
                      </div>
                      <div>
                        <Label htmlFor="userType">Account Type</Label>
                        <Input id="userType" value={profile?.user_type || ""} disabled />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Your display name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-2 pt-6 border-t">
                        <Button onClick={handleSaveProfile} disabled={saving} className="bg-gradient-primary hover:opacity-90">
                          {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {profile?.user_type === 'walker' && (
                <TabsContent value="walker">
                  <Card className="shadow-card border-0">
                    <CardHeader className="bg-gradient-card">
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Walker Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            disabled={!isEditing}
                            placeholder="25.00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="experienceYears">Years of Experience</Label>
                          <Input
                            id="experienceYears"
                            type="number"
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            disabled={!isEditing}
                            placeholder="2"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="serviceRadius">Service Radius (km)</Label>
                        <Input
                          id="serviceRadius"
                          type="number"
                          value={serviceRadius}
                          onChange={(e) => setServiceRadius(e.target.value)}
                          disabled={!isEditing}
                          placeholder="5"
                        />
                      </div>

                      {walkerProfile && (
                        <div className="space-y-2">
                          <Label>Walker Status</Label>
                          <div className="flex gap-2">
                            <Badge variant={walkerProfile.is_active ? 'default' : 'secondary'}>
                              {walkerProfile.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Badge variant={walkerProfile.is_verified ? 'default' : 'outline'}>
                              {walkerProfile.is_verified ? 'Verified' : 'Not Verified'}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;