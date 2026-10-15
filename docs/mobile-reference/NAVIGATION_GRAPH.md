# Navigation graph

```text
/onboarding (Welcome)
  ├─ Register → /register → /verify-otp
  └─ Log In → /login → /verify-otp

/location-search
  ├─ Search suggestion → selected normalized location → /(tabs)
  └─ Current location → reverse geocode → serviceability check → /(tabs)

/(tabs)
  ├─ Trending → /(tabs)/trending (real `is_popular` catalogue query)
  ├─ Services → /(tabs)/categories
  ├─ Home → /(tabs)
  ├─ Orders → /(tabs)/bookings
  └─ Profile → /(tabs)/account

/(tabs) Home
  ├─ Location → /location-search
  ├─ Cart → /cart
  ├─ Category → /(tabs)/categories?category=<slug>
  └─ Service → /service/[slug]

/service/[slug]
  ├─ Add to Cart → /cart state
  └─ Book → /book/address → /book/slot → /book/review
      → /book/pay/[bookingId] → /booking-success/[bookingId]
      → /booking/[id]

/(tabs)/bookings → /booking/[id]
  ├─ Pay advance → /book/pay/[bookingId]
  ├─ Reschedule → /booking/reschedule/[id]
  ├─ Cancel → confirmed mutation
  └─ Review → backend review mutation

/(tabs)/account
  ├─ /profile/edit
  ├─ /addresses
  ├─ /help/faqs
  └─ /support
```

## Screenshot-evidenced transitions

- Welcome → Register / Log In.
- Registration → OTP verification.
- Location search → map/address confirmation → unavailable or app entry.
- Home → category/service discovery → option selection → Add to Cart.
- Cart → date and slot → Review & Pay → official Razorpay payment UI.

## Deliberate Purple Squad differences

- Purple Squad implements the observed five-destination bar; Trending is backed by the catalogue's real `is_popular` flag.
- Payment authorization stays inside the official Razorpay SDK.
- Direct single-service booking remains available alongside the saved cart.
