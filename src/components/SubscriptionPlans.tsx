import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for occasional dog walking needs",
    features: [
      "Up to 5 walks per month",
      "Basic walker matching",
      "Email support",
      "Walk photos included",
    ],
    icon: Check,
    popular: false,
  },
  {
    name: "Premium",
    price: "$19.99", 
    description: "Great for regular dog walking requirements",
    features: [
      "Unlimited walks",
      "Priority walker matching",
      "24/7 phone support",
      "Real-time GPS tracking",
      "Premium walker access",
      "Walk videos included",
    ],
    icon: Star,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$39.99",
    description: "For multiple dogs or professional needs",
    features: [
      "Everything in Premium",
      "Multiple dog profiles",
      "Dedicated account manager",
      "Custom walk schedules",
      "Advanced analytics",
      "API access",
    ],
    icon: Crown,
    popular: false,
  },
];

export function SubscriptionPlans() {
  const { subscriptionData, createCheckoutSession, loading } = useSubscription();

  const handleSubscribe = (tier: string) => {
    createCheckoutSession(tier);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => {
        const isCurrentPlan = subscriptionData.subscription_tier === plan.name;
        const Icon = plan.icon;
        
        return (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''} ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
            )}
            {isCurrentPlan && (
              <Badge className="absolute -top-2 right-4 bg-green-600">
                Current Plan
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-3xl font-bold text-primary">
                {plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {isCurrentPlan ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Subscribe to ${plan.name}`}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}