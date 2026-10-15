# Mobile implementation plan

## Sprint 1 — completed

- Repository/backend/web audit and screen/API mapping.
- Expo Router architecture, secure session persistence, TanStack Query and Zustand.
- Shared tokens, buttons, fields, async states and service cards.
- EAS profiles, runtime environment separation and native permission descriptions.

## Sprint 2 — completed, refinement active

- Onboarding, OTP login, browse-before-login, location/serviceability.
- Home discovery, category filtering, search and service detail.
- HomeNeedsPro/Urban Company-inspired hierarchy using Purple Squad identity.
- Remaining: OTP resend countdown/expiry presentation and complete string externalization.

## Sprint 3 — core journey completed

- Saved/new address, live slots, booking review and backend-authoritative direct booking.
- Remaining: address edit/delete, cart, service configuration/variants when supported, problem attachments.

## Sprint 4 — core payment completed

- Native Razorpay order, checkout, server verification, reconciliation polling and booking confirmation.
- Booking history/detail, cancellation and review submission.
- Remaining: reschedule UI, invoice share, balance payment after backend support.

## Sprint 5 — next

1. Finish string extraction and native-speaker review for the implemented English/Tamil store and language selector.
2. FAQ and profile editing are complete; saved-address management and invoice sharing remain.
3. Push token/inbox backend extension and deep links.
4. Rescheduling UI is complete; customer-safe technician projection remains.
5. Support/account-deletion contracts after retention policy approval.

## Sprint 6 — release hardening

- Unit/API-contract tests and critical-path device E2E tests.
- Android and iOS development builds, payment/OTP physical-device matrix.
- Accessibility, performance, offline and recovery testing.
- Crash reporting, analytics consent, store assets, privacy declarations and release checklist.

## Release rule

No production deployment or paid-provider activation is performed without explicit owner approval and credentials. Missing backend capabilities remain visibly blocked rather than mocked.

