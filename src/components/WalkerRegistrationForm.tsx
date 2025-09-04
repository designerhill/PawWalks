import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const walkerRegistrationSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  experienceYears: z.number().min(0, "Experience years must be positive").max(50, "Please enter a realistic number"),
  hourlyRate: z.number().min(10, "Minimum rate is $10/hour").max(100, "Maximum rate is $100/hour"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceRadius: z.number().min(1, "Service radius must be at least 1 mile").max(50, "Maximum radius is 50 miles"),
  availableDays: z.array(z.string()).min(1, "Please select at least one available day"),
});

type WalkerRegistrationForm = z.infer<typeof walkerRegistrationSchema>;

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

interface WalkerRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalkerRegistrationForm = ({ isOpen, onClose }: WalkerRegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WalkerRegistrationForm>({
    resolver: zodResolver(walkerRegistrationSchema),
    defaultValues: {
      availableDays: [],
      serviceRadius: 5,
      hourlyRate: 25,
      experienceYears: 1,
    },
  });

  const watchedDays = watch("availableDays");

  const handleDayToggle = (day: string, checked: boolean) => {
    const currentDays = watchedDays || [];
    if (checked) {
      setValue("availableDays", [...currentDays, day]);
    } else {
      setValue("availableDays", currentDays.filter(d => d !== day));
    }
  };

  const onSubmit = async (data: WalkerRegistrationForm) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register as a walker.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("walker_profiles")
        .insert({
          user_id: user.id,
          display_name: data.displayName,
          bio: data.bio,
          experience_years: data.experienceYears,
          hourly_rate: data.hourlyRate,
          phone: data.phone,
          service_radius: data.serviceRadius,
          available_days: data.availableDays,
          is_verified: false,
          is_active: true,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Application Submitted!",
        description: "Your walker application has been submitted successfully. We'll review it and get back to you within 24 hours.",
      });

      onClose();
      navigate("/walkers");
    } catch (error: any) {
      console.error("Error submitting walker application:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply to Become a Walker</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name *</Label>
            <Input
              id="displayName"
              {...register("displayName")}
              placeholder="How you'd like to be shown to pet owners"
            />
            {errors.displayName && (
              <p className="text-sm text-destructive">{errors.displayName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell pet owners about yourself, your experience with dogs, and why you love being around them..."
              rows={4}
            />
            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Years of Experience *</Label>
              <Input
                id="experienceYears"
                type="number"
                {...register("experienceYears", { valueAsNumber: true })}
                placeholder="Years of dog experience"
              />
              {errors.experienceYears && (
                <p className="text-sm text-destructive">{errors.experienceYears.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
              <Input
                id="hourlyRate"
                type="number"
                {...register("hourlyRate", { valueAsNumber: true })}
                placeholder="Your hourly rate"
              />
              {errors.hourlyRate && (
                <p className="text-sm text-destructive">{errors.hourlyRate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Your contact number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceRadius">Service Radius (miles) *</Label>
              <Input
                id="serviceRadius"
                type="number"
                {...register("serviceRadius", { valueAsNumber: true })}
                placeholder="How far you'll travel"
              />
              {errors.serviceRadius && (
                <p className="text-sm text-destructive">{errors.serviceRadius.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Available Days *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={watchedDays?.includes(day) || false}
                    onCheckedChange={(checked) => handleDayToggle(day, checked as boolean)}
                  />
                  <Label htmlFor={day} className="text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
            {errors.availableDays && (
              <p className="text-sm text-destructive">{errors.availableDays.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WalkerRegistrationForm;