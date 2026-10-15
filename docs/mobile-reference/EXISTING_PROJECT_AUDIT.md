# Existing Purple Squad project audit

## Repositories

- `ps_mobile`: Expo SDK 57 / React Native 0.86 / TypeScript / Expo Router customer application.
- `ps_core`: Django REST Framework backend; retained as the source of truth.
- `ps_coreF1`: Next.js web/admin surface; out of scope and unchanged.

## Mobile architecture

- TanStack Query handles server state.
- Zustand handles authenticated user, language, and in-progress booking selection.
- SecureStore persists native JWT sessions; browser storage is used for web development.
- React Hook Form + Zod provide client-side form validation.
- Razorpay native SDK initiates payment; backend verification determines success.
- Central tokens already exist at `src/theme/tokens.ts`.

## Reusable functionality

- OTP send/verify, access refresh, logout, and profile update.
- Category/service catalogue and server-provided media/pricing.
- Reverse geocode, autocomplete, serviceability checks, and saved addresses.
- Live slot lookup.
- Idempotent booking creation.
- Razorpay order creation and verification.
- Booking list/detail/status history, cancellation, and rescheduling.
- Review submission and FAQ retrieval.
- Server-owned cart CRUD and price totals.

## Refactor targets

- Auth routes need screenshot-derived sheets and separated OTP state.
- Location search should use the existing autocomplete endpoint.
- Categories need horizontal image navigation and larger service showcase cards.
- Slot screen needs full-month calendar geometry.
- Review screen needs compact address/date cards and reference-like price summary.
- Shared reference header, search, rounded card, and sticky action components should replace repeated JSX over time.

## Do not duplicate

- Pricing, discounts, advance amount, serviceability, capacity, cancellation rules, and payment verification remain server-owned.
- `ps_coreF1` and admin behavior must not change to support cosmetic mobile parity.
