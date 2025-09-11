import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Settings, RefreshCw } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { format } from "date-fns";

export function SubscriptionStatus() {
  const { subscriptionData, loading, refreshSubscription, openCustomerPortal } = useSubscription();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "PPP");
  };

  if (!subscriptionData.subscribed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            No Active Subscription
          </CardTitle>
          <CardDescription>
            Subscribe to unlock premium features and get the most out of PawWalk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={refreshSubscription} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Active Subscription
          <Badge variant="secondary" className="ml-auto">
            {subscriptionData.subscription_tier}
          </Badge>
        </CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>Next billing date: {formatDate(subscriptionData.subscription_end)}</span>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={openCustomerPortal} size="sm" disabled={loading}>
            <Settings className="w-4 h-4 mr-2" />
            Manage Subscription
          </Button>
          <Button onClick={refreshSubscription} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}