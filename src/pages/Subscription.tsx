import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";

export default function Subscription() {
  const [searchParams] = useSearchParams();
  const { refreshSubscription } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    const subscription = searchParams.get('subscription');
    
    if (subscription === 'success') {
      toast({
        title: "Subscription Successful!",
        description: "Welcome to your new subscription tier!",
      });
      // Refresh subscription status after successful payment
      setTimeout(refreshSubscription, 2000);
    } else if (subscription === 'cancelled') {
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription process was cancelled.",
        variant: "destructive",
      });
    }
  }, [searchParams, refreshSubscription, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Unlock premium features and get the best dog walking experience
          </p>
        </div>

        {/* Current Subscription Status */}
        <SubscriptionStatus />

        {/* Subscription Plans */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Available Plans</h2>
          <SubscriptionPlans />
        </div>

        {/* Features Comparison */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Why Subscribe?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Premium Walkers</h4>
              <p className="text-muted-foreground">Access to our top-rated, verified walkers</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Priority Booking</h4>
              <p className="text-muted-foreground">Get first pick of available time slots</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Real-time Tracking</h4>
              <p className="text-muted-foreground">Follow your dog's walk with GPS tracking</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">24/7 Support</h4>
              <p className="text-muted-foreground">Round-the-clock customer support</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Walk Analytics</h4>
              <p className="text-muted-foreground">Detailed reports on your dog's activity</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">No Booking Fees</h4>
              <p className="text-muted-foreground">Save on per-booking transaction fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}