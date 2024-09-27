import { Tables } from "@/supabase/types";
import Stripe from "stripe";

/**
 * The necessary data that is collected for the embed widget's displayed events.
 */
export interface EventData {
  events: Tables<"Events">[];
  stripeData?: StripeData;
}

export interface StripeData {
  charges?: Stripe.Charge[];
  checkoutSessions?: Stripe.Checkout.Session[];
}

export interface DisplayNotification {
  message: string | TrustedHTML;
  time: string;
  event: Tables<"Events"> | undefined;
  product?: Tables<"Products"> | undefined;
}
