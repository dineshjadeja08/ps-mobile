# Purple Squad backend audit

Audit date: 2026-10-10

## Executive result

`ps_core` is a substantial Django/DRF backend, not a mock API. It already covers the first production customer journey: authentication, catalogue, serviceability, addresses, slots, direct booking, advance payment, booking history, cancellation, reviews, and invoices. Pricing and payment authority correctly remain server-side.

The mobile app should not ship until the P0 gaps below are closed and exercised against a production-like environment.

## Existing architecture

- Django 5.2, Django REST Framework, PostgreSQL, SimpleJWT, drf-spectacular.
- MSG91 OTP and WhatsApp integrations, optional Firebase login.
- Razorpay order creation, signature verification, webhooks, refunds, and invoice generation.
- Cloudinary-compatible media storage, Redis-ready infrastructure, WhiteNoise static serving.
- Domain modules for accounts, catalogue, locations, scheduling, bookings/cart, payments, technicians, reviews, notifications, operations, and audit.

## Customer capabilities confirmed

| Capability | Backend state | Notes |
|---|---|---|
| Phone OTP | Implemented | `/api/v1/auth/otp/send/`, `/otp/verify/` |
| Token refresh/logout/profile | Implemented | Refresh rotation is supported by the mobile client |
| Categories/services/details | Implemented | Public catalogue endpoints |
| Serviceability/location | Implemented | Pincode check, reverse geocode, autocomplete |
| Saved addresses | Implemented | Authenticated CRUD |
| Slots | Implemented | Public availability query |
| Direct booking | Implemented | Supports `Idempotency-Key` |
| Cart and checkout | Implemented | Supports multi-line booking checkout and idempotency |
| Advance payment | Implemented | Server creates order; server verifies Razorpay response |
| Booking list/detail | Implemented | Customer-scoped queryset |
| Cancel/reschedule | Implemented | Policy and allowed-status checks are server-side |
| Reviews | Implemented | Create for booking; public list by service |
| Invoice | Implemented | Authenticated booking invoice download |
| FAQs/home banners | Implemented | Public endpoints |

## Pricing and booking rules

- The backend calculates subtotal, discount, training fee, tax, total, advance, and balance. The app only displays returned values.
- Current tax is effectively zero in the calculation service.
- Advance can be fixed or percentage based.
- Customer cancellation is limited to eligible pre-service statuses and an environment-configured minimum lead time.
- Rescheduling is limited to confirmed/assigned bookings and an environment-configured minimum lead time.
- Payment success is authoritative only after server verification or webhook reconciliation.

## Gaps and risks

### P0 — launch blockers

1. **Native OTP versus Turnstile:** production can require `REQUIRE_TURNSTILE_FOR_OTP`. A native app cannot safely reuse the website’s browser CAPTCHA token flow without an explicit mobile challenge/attestation design. Add and document a native-safe anti-abuse contract before release.
2. **Production integration environment:** provide a TLS API base URL, enabled service areas, real catalogue/slots, MSG91 credentials/templates, Razorpay keys/webhook secret, and mobile deep-link policy.
3. **Payment recovery QA:** validate app-kill, network-loss, duplicate-tap, checkout-cancel, webhook-delay, and verification-timeout cases with Razorpay test mode on physical Android and iOS devices.
4. **Mobile release assets:** approved square icon, adaptive Android foreground/background art, notification icon, privacy policy, store declarations, and signing/account ownership are still required.

### P1 — required for the complete product brief

- No customer-facing balance-payment endpoint. Balance collection is currently an admin/offline operation.
- Booking responses do not expose customer-safe assigned-technician profile/contact data.
- No customer technician live-location endpoint or event stream.
- No customer notification inbox/read-state API.
- No support-ticket API; current app falls back to phone/WhatsApp/email links.
- No problem-photo upload contract attached to booking creation.
- Packages are admin-only; coupons are absent.
- Define deterministic discovery/ranking fields for "popular" services instead of relying on generic list order.

### Contract/documentation concerns

- The generated OpenAPI schema reports authentication on some views that explicitly disable authentication and allow public access. Correct schema annotations so generated clients do not treat public catalogue/location/slot endpoints as protected.
- Existing web documentation says direct booking lacks idempotency, but the current backend implementation supports it. Treat implementation and current tests as authoritative, then update stale docs.
- Add explicit serializer return type hints/schema declarations for method fields and stable enum names to remove the seven unique drf-spectacular warnings.

## Verification evidence

- `python manage.py check`: passed with zero issues.
- `python manage.py spectacular --validate`: zero schema errors; seven unique warnings.
- Full backend suite: 244 passed, 1 failed. The failure is the admin dashboard test because WhiteNoise’s test manifest cannot find `admin/css/base.css`; customer API tests were not the failure.
- The failure should be fixed by aligning test static-file storage/collection, not by weakening production static-file configuration.

