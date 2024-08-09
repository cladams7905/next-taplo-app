export enum EventType {
  OnPurchase = "On Purchase",
  OnReview = "On Review",
  ActiveUsers = "Active Users",
  Custom = "Custom",
}

export enum Providers {
  Stripe = "Stripe",
  Google = "Google",
  TrustPilot = "TrustPilot",
  GoogleAnalytics = "Google Analytics",
}

export enum ScreenAlignment {
  BottomLeft = "Bottom Left",
  BottomRight = "Bottom Right",
  TopLeft = "Top Left",
  TopRight = "Top Right",
}

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
