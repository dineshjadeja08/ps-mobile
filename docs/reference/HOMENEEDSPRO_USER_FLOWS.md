# Home Needs Pro user-flow evidence

## Verified navigation model

The public website exposes four primary destinations: `Home → Services → Orders → Profile`. Store screenshots support the same home/service/profile information architecture. Purple Squad maps these labels to its existing Expo Router tabs while keeping its established routes.

## Service discovery and booking

```text
Home
  → location control (entry point verified; selector behavior unverified)
  → search or service category (verified)
  → category/subcategory (screenshot-verified)
  → service detail (screenshot-verified)
  → booking configuration (unverified reference geometry)
  → address (capability/entry point partially verified)
  → date and time (screenshot-verified)
  → review / checkout (unverified reference geometry)
  → secure payment (capability verified, UI unverified)
  → confirmation (unverified)
  → order detail (destination verified, UI unverified)
```

Purple Squad retains its safer backend-authoritative sequence:

```text
Service → authenticated customer → serviceable saved/new address
→ live server slots → review → idempotent booking creation
→ Razorpay order → server signature verification → confirmation
```

## Account and order flows

- Website `Sign In` opens the verified phone-number card. OTP continuation is unverified.
- Orders is a persistent primary destination. Purple Squad maps it to real bookings.
- Profile exposes account preferences and an Address destination in the reference screenshot. Purple Squad provides real profile editing, saved-address management, FAQ/support, language, and logout.
- Reference wallet/parts-pricing features are not recreated because Purple Squad has no equivalent customer API or business rule.

## Cart

A cart utility is visible in published header imagery, but its internal sequence was not accessible. Purple Squad implements a real server-owned cart for add, quantity, remove, and totals. The established direct booking journey remains the checkout path until a per-item multi-service scheduling UI is verified and completed.

## Back navigation

Reference screenshots show back controls on category/detail surfaces. Purple Squad uses Expo Router's native back stack for those screens and replacement navigation after irreversible milestones such as booking creation/payment confirmation.
