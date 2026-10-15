# Purple Squad mobile application audit

Audit updated: 2026-10-12

## Repositories and architecture

- `ps_core`: Django 5.2/DRF backend with PostgreSQL production support and SQLite local fallback.
- `ps_coreF1`: Next.js 16 customer/admin web application.
- `ps_mobile`: Expo SDK 57, React Native 0.86, TypeScript customer application created as a separate client of `ps_core`.

The mobile project is separate so it cannot disturb the deployed web application. It reuses the same backend contracts and business rules.

## Capability classification

| Feature | Classification | Evidence or required action |
|---|---|---|
| JWT session, refresh, logout and profile | Already implemented and reusable | `/auth/refresh/`, `/auth/me/`, `/auth/logout/` |
| SMS/WhatsApp OTP | Implemented but requires changes | Native anti-abuse contract is required before production Turnstile enforcement |
| Categories, services and service detail | Already implemented and reusable | Public catalogue APIs and backend-managed media/prices |
| Service variants/add-ons | Missing | Current service model supports quantity/training fee, but no public variant/add-on quote contract |
| Serviceability and reverse geocoding | Already implemented and reusable | Pincode check and location provider endpoints |
| Saved addresses | Already implemented and reusable | Customer-scoped CRUD |
| Available slots | Already implemented and reusable | Backend capacity and closure logic |
| Direct booking | Already implemented and reusable | Backend pricing plus `Idempotency-Key` |
| Cart checkout | Already implemented and reusable | Mobile cart UI remains to be completed |
| Advance payment | Already implemented and reusable | Backend-created Razorpay order, verification and webhook reconciliation |
| Customer balance payment | Missing | Only admin/offline balance collection exists |
| Booking list/detail/cancel/reschedule | Already implemented and reusable | Reschedule mobile UI remains |
| Technician assignment | Implemented but requires changes | Customer serializer does not expose a safe technician projection |
| Live tracking | Missing | Do not implement until technician location infrastructure exists |
| Reviews | Already implemented and reusable | Backend enforces completed booking/customer ownership |
| Invoice | Already implemented and reusable | Mobile download/share UI remains |
| WhatsApp notifications | Already implemented and reusable | Transactional server notifications exist |
| Customer notification inbox/push tokens | Missing | Requires models, authenticated endpoints, Expo/FCM delivery and deep-link policy |
| FAQs and support links | Already implemented and reusable | Public FAQ endpoint; no support-ticket API |
| Profile update | Already implemented and reusable | `GET/PATCH /auth/me/` |
| Account deletion | Missing | Requires explicit authorization, retention and audit policy |
| English/Tamil | Implemented but requires changes | Persistent translation store and primary navigation/home/profile strings exist; remaining screens require full string extraction and Tamil copy review |
| Android/iOS build profiles | Implemented but requires changes | EAS profiles exist; signing, native builds and store assets remain external blockers |

## Quality evidence

- Backend `manage.py check`: pass.
- Backend tests: 244 passed; one admin static-manifest test failed.
- Mobile TypeScript and lint: pass after the current design update.
- Expo Doctor: 21/21 checks pass.
- Expo web static export: 20 routes pass.

## External blockers

- Apple Developer and Google Play signing/account access.
- Approved production Razorpay, MSG91, map/location and push-notification credentials.
- Native-safe OTP anti-abuse design.
- Approved square/adaptive app artwork.
- Direct Figma inspection remains unavailable because the connected account reached its MCP limit.

