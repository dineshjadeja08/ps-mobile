# Implementation plan

## Phase 1 — implemented foundation

- Expo SDK 57, React Native 0.86, TypeScript, Expo Router.
- TanStack Query server state, Zustand auth/booking state, React Hook Form + Zod.
- Secure token persistence and centralized refresh/retry behavior.
- Branded onboarding, OTP login, home discovery, catalogue, address, slot, booking review, direct booking, Razorpay advance, success, booking history/detail, cancellation, review, account, and support.
- Backend-authoritative pricing, idempotent critical mutations, payment reconciliation, and explicit failure states.

## Phase 2 — complete existing backend coverage

1. Add reschedule UI and policy/error presentation.
2. Add cart UI and grouped checkout.
3. Add invoice download/share, FAQs, banners, address edit/delete, and richer service reviews.
4. Add problem-photo capture/upload after agreeing a storage and booking attachment contract.
5. Add component/integration tests, API fixtures, Maestro/Detox critical-path tests, analytics, crash reporting, and notification plumbing.

## Phase 3 — backend-dependent product completion

1. Native OTP abuse-prevention contract.
2. Customer balance-payment order and verification.
3. Customer-safe technician assignment/profile and contact policy.
4. Technician live-location stream with consent, retention, and fallback status UX.
5. Customer notification inbox/read states and push token registration.
6. Support tickets, public packages, coupon validation, and server-defined discovery ranking.

## Release gates

- Close every P0 item in `BACKEND_AUDIT.md`.
- Run lint, TypeScript, Expo Doctor, native Android/iOS development builds, and critical-path E2E tests.
- Exercise Razorpay and OTP on real devices with production-like callbacks.
- Verify privacy/data-retention disclosures for location, phone, address, and payment metadata.
- Complete store artwork, signing, privacy URLs, support URLs, screenshots, and staged rollout/rollback plans.
- Do not deploy production without explicit owner approval.

