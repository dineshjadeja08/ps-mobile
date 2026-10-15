# Home Needs Pro → Purple Squad implementation mapping

| Reference screen | Purple Squad route | Existing / implementation | Required or completed change | API dependency | Status |
| --- | --- | --- | --- | --- | --- |
| Home | `/(tabs)` | `src/app/(tabs)/index.tsx` | Compact logo/location/utilities, four-column image categories, search, promotional banner, trust strip, trending services | categories, services, service-area, reverse geocode, cart | Screenshot-verified structure; implemented |
| Services/category | `/(tabs)/categories` | `src/app/(tabs)/categories.tsx` | Search, category chips, service cards using live catalogue | categories, services | Partial reference; implemented |
| Service detail | `/service/[slug]` | `src/app/service/[slug].tsx` | Wide image, compact pricing/trust/duration, sticky book action, real add-to-cart | service detail, cart | Screenshot-verified top portion; implemented |
| Cart | `/cart` | New cart screen | Server totals, quantity, remove, service selection for booking | cart GET/POST/PATCH/DELETE | Body unverified; functional Purple Squad assumption |
| Sign in / OTP | `/login` | `src/app/login.tsx` | Match verified white-card phone state; preserve OTP security and validation | OTP send/verify | Phone state verified; OTP unverified |
| Address management | `/addresses` | New address manager plus `/book/address` | List/edit/delete account addresses; booking selector remains real | addresses CRUD, serviceability | Reference entry point only; functional |
| Date and slot | `/book/slot` | `src/app/book/slot.tsx` | Horizontal dates and filled selected slots | slots | Screenshot-verified structure; implemented |
| Review/checkout | `/book/review` | Existing | Server-authoritative summary and idempotent create | bookings create | Reference unverified; functional |
| Payment | `/book/pay/[bookingId]` | Existing | Native Razorpay + backend verification | payment order/verify | Reference unverified; functional |
| Confirmation | `/booking-success/[bookingId]` | Existing | Verified booking result and navigation | booking detail | Reference unverified; functional |
| Orders | `/(tabs)/bookings` | Existing | Rename visible tab to Orders; real booking cards | bookings list | Destination verified; body unverified |
| Order detail/status | `/booking/[id]` | Existing | Timeline, totals, pay/cancel/reschedule/review | booking detail/actions/review | Reference unverified; functional within API limits |
| Profile | `/(tabs)/account` | Existing | Reference-style stacked menu; add saved-address entry; omit unsupported wallet | auth me/update, FAQ | Screenshot-verified structure; implemented |
| Help/FAQ | `/support`, `/help/faqs` | Existing | Real support links and backend FAQs | FAQs | Reference unverified; functional |
| Notifications | — | None | Requires customer inbox/device-token API | Missing | Blocked by backend |
| Technician tracking | booking detail | Status text only | Requires safe technician projection/live tracking API | Missing | Blocked by backend |

## Verification terms

- `Screenshot-verified structure`: visible hierarchy exists in official published imagery.
- `Functional`: Purple Squad flow is connected to real APIs and has error handling.
- `Reference unverified`: no exact visual fidelity claim is made.
- `Blocked by backend`: deliberately not fabricated in the client.
