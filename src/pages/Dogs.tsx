import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Dog {
  id: string;
  name: string;
  breed?: string | null;
  age?: number | null;
  weight?: number | null;
  size?: string | null;
  temperament?: string | null;
  special_needs?: string | null;
  medical_notes?: string | null;
  photo_url?: string | null;
  is_active: boolean;
}

const Dogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDog, setEditingDog] = useState<Dog | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    size: "",
    temperament: "",
    special_needs: "",
    medical_notes: "",
    photo_url: ""
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchDogs();
    }
  }, [user]);

  const fetchDogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('owner_id', user?.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDogs(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your dogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const dogData = {
        name: formData.name,
        breed: formData.breed || null,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        size: formData.size || null,
        temperament: formData.temperament || null,
        special_needs: formData.special_needs || null,
        medical_notes: formData.medical_notes || null,
        photo_url: formData.photo_url || null,
        owner_id: user.id
      };

      if (editingDog) {
        const { error } = await supabase
          .from('dogs')
          .update(dogData)
          .eq('id', editingDog.id);
        if (error) throw error;
        toast({ title: "Success", description: "Dog profile updated successfully!" });
      } else {
        const { error } = await supabase
          .from('dogs')
          .insert(dogData);
        if (error) throw error;
        toast({ title: "Success", description: "Dog profile created successfully!" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchDogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save dog profile",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (dog: Dog) => {
    setEditingDog(dog);
    setFormData({
      name: dog.name,
      breed: dog.breed || "",
      age: dog.age?.toString() || "",
      weight: dog.weight?.toString() || "",
      size: dog.size || "",
      temperament: dog.temperament || "",
      special_needs: dog.special_needs || "",
      medical_notes: dog.medical_notes || "",
      photo_url: dog.photo_url || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (dogId: string) => {
    try {
      const { error } = await supabase
        .from('dogs')
        .update({ is_active: false })
        .eq('id', dogId);

      if (error) throw error;
      toast({ title: "Success", description: "Dog profile removed successfully!" });
      fetchDogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove dog profile",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      breed: "",
      age: "",
      weight: "",
      size: "",
      temperament: "",
      special_needs: "",
      medical_notes: "",
      photo_url: ""
    });
    setEditingDog(null);
  };

  const getSizeColor = (size?: string) => {
    switch (size) {
      case 'small': return 'bg-secondary';
      case 'medium': return 'bg-primary';
      case 'large': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to manage your dogs</h1>
          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dogs</h1>
            <p className="text-muted-foreground">Manage your furry family members</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Dog
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingDog ? 'Edit Dog Profile' : 'Add New Dog'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="breed">Breed</Label>
                    <Input
                      id="breed"
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="temperament">Temperament</Label>
                  <Input
                    id="temperament"
                    value={formData.temperament}
                    onChange={(e) => setFormData({ ...formData, temperament: e.target.value })}
                    placeholder="e.g., Friendly, energetic, calm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="special_needs">Special Needs</Label>
                  <Textarea
                    id="special_needs"
                    value={formData.special_needs}
                    onChange={(e) => setFormData({ ...formData, special_needs: e.target.value })}
                    placeholder="Any special requirements or behavioral notes"
                  />
                </div>
                
                <div>
                  <Label htmlFor="medical_notes">Medical Notes</Label>
                  <Textarea
                    id="medical_notes"
                    value={formData.medical_notes}
                    onChange={(e) => setFormData({ ...formData, medical_notes: e.target.value })}
                    placeholder="Medical conditions, medications, or vet instructions"
                  />
                </div>
                
                <div>
                  <Label htmlFor="photo_url">Photo URL</Label>
                  <Input
                    id="photo_url"
                    type="url"
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    placeholder="https://example.com/dog-photo.jpg"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingDog ? 'Update Dog' : 'Add Dog'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {dogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No dogs added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first furry friend to get started with PawWalks
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Dog
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dogs.map((dog) => (
              <Card key={dog.id} className="overflow-hidden hover:shadow-card transition-all duration-300 hover-scale">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                        {dog.photo_url ? (
                          <img 
                            src={dog.photo_url} 
                            alt={dog.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          dog.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{dog.name}</CardTitle>
                        {dog.breed && (
                          <p className="text-sm text-muted-foreground">{dog.breed}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(dog)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(dog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {dog.size && (
                        <Badge className={getSizeColor(dog.size)}>
                          {dog.size}
                        </Badge>
                      )}
                      {dog.age && (
                        <Badge variant="outline">
                          {dog.age} year{dog.age !== 1 ? 's' : ''}
                        </Badge>
                      )}
                      {dog.weight && (
                        <Badge variant="outline">
                          {dog.weight} lbs
                        </Badge>
                      )}
                    </div>
                    
                    {dog.temperament && (
                      <p className="text-sm">
                        <span className="font-medium">Temperament:</span> {dog.temperament}
                      </p>
                    )}
                    
                    {dog.special_needs && (
                      <p className="text-sm">
                        <span className="font-medium">Special needs:</span> {dog.special_needs}
                      </p>
                    )}
                    
                    {dog.medical_notes && (
                      <p className="text-sm">
                        <span className="font-medium">Medical:</span> {dog.medical_notes}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dogs;