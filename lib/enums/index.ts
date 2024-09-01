/**
 * The different types of notification events a user can create with integrations.
 */
export enum EventType {
  Purchase = "Purchase",
  AddToCart = "Add to Cart",
  SomeoneViewing = "Someone is Viewing",
  ActiveUsers = "Active Users",
  Custom = "Custom",
}

/**
 * The 3rd-party services that users can integrate with.
 */
export enum Providers {
  Stripe = "Stripe",
  Google = "Google",
  TrustPilot = "TrustPilot",
  GoogleAnalytics = "Google Analytics",
}

/**
 * Where the popup notifications appear on the screen.
 */
export enum ScreenAlignment {
  BottomLeft = "Bottom Left",
  BottomRight = "Bottom Right",
  BottomCenter = "Bottom Center",
  TopLeft = "Top Left",
  TopRight = "Top Right",
  TopCenter = "Top Center",
}

/**
 * The different styles of popup templates.
 */
export enum TemplateTypes {
  SmPopup = "Small popup",
  SmPopupNoImg = "Small popup (no image)",
  LgPopup = "Large popup",
  LgPopupNoImg = "Large popup (no image)",
  Card = "Card",
  CardNoImg = "Card (no image)",
  Banner = "Banner",
  BannerNoImg = "Banner (no image)",
}

/**
 * The different variables users have access to set within the text content of a popup.
 */
export enum ContentVars {
  Person = "person",
  Location = "location",
  Product = "product",
  Price = "price",
  NumUsers = "numusers",
  RecentUsers = "recentusers",
}

/**
 * The different payment plans users can purchase.
 */
export enum PaymentPlans {
  StarterMonthly = "starter_monthly",
  StarterYearly = "starter_yearly",
  ProMonthly = "pro_monthly",
  ProYearly = "pro_yearly",
}
