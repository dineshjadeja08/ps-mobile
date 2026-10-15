# Screen mapping and implementation state

| Reference | Purple Squad route/component | API | Work class | State |
| --- | --- | --- | --- | --- |
| Welcome | `/onboarding` | local onboarding storage | Refactor | Implemented from verified screenshot structure |
| Registration | `/register` | OTP send, profile update after verify | New | Implemented for supported name/phone; referral/source blocked |
| OTP | `/verify-otp` | OTP verify | New/refactor | Implemented with six cells/resend state |
| Location search | `/location-search` | location autocomplete/reverse, service area check | New | Implemented; local provider currently returns 503 until configured |
| Map confirmation | `/book/address` | reverse geocode, addresses CRUD | Refactor | Manual address supported; native map not installed |
| Unavailable city | `/service-availability` | service-area check/list | New | Implemented with live service-area cities; imagery simplified |
| Home | `/(tabs)` | categories, services, cart, location | Refactor | Core hierarchy implemented |
| Category/service listing | `/(tabs)/categories` | categories/services | Refactor | Functional; reference carousel/banner geometry pending |
| Service card/detail | `/service/[slug]` | service detail, cart | Refactor | Image/price/actions implemented |
| Problem selection | No exact equivalent | — | Backend extension | Blocked: no service-variant/problem-option model |
| Cart | `/cart` | cart CRUD | New | Functional; reference grouping/address geometry pending |
| Date & slot | `/book/slot` | slots | Refactor | Full-month grid and two-column live slots implemented |
| Review & Pay | `/book/review`, `/book/pay/[bookingId]` | booking create, payment order/verify | Refactor | Screenshot-derived cards/summary implemented; backend-authoritative |
| Razorpay sheets | SDK-owned | Razorpay | Reuse | Correctly delegated to official SDK |
| Confirmation | `/booking-success/[bookingId]` | booking detail | Reuse/inferred | Functional, not screenshot-verified |
| Orders/detail | `/(tabs)/bookings`, `/booking/[id]` | bookings/actions/reviews/invoice | Reuse/inferred | Functional except invoice UI |
| Profile/support | `/(tabs)/account`, `/support`, `/help/faqs` | profile/FAQ | Reuse/inferred | Functional |

`Screenshot-matched` is intentionally not used yet: implementation screenshots at the same 702 × 1599 viewport have not been captured in an Android/iOS emulator.
