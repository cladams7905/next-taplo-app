/**
 * The different types of notification events a user can create.
 */
export enum EventType {
  Purchase = "On Purchase",
  Checkout = "On Checkout",
  ActiveUsers = "Active Users",
  SomeoneViewing = "Someone is Viewing",
  CustomerTrends = "Customer Trends",
}

/**
 * The default messages displayed when a new notification event is created.
 */
export enum DefaultMessages {
  Purchase = "\\PERSON in \\LOCATION purchased \\PRODUCT.",
  Checkout = "\\PERSON in \\LOCATION is considering buying \\PRODUCT.",
  ActiveUsers = "\\NUMUSERS user(s) are online now.",
  SomeoneViewing = "Someone in \\LOCATION is viewing \\PROJECTNAME's products.",
  CustomerTrends = "Over the past X days, X has gained X new customers.",
}

/**
 * The 3rd-party services that users can integrate with.
 */
export enum Providers {
  Stripe = "Stripe",
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
 * The different variables users have access to set within the message body of a popup.
 */
export enum ContentVars {
  Person = "person",
  Location = "location",
  Product = "product",
  Price = "price",
  NumUsers = "numusers",
  ProjectName = "projectname",
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
