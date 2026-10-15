# API integration matrix

| UI capability | Endpoint | Client status | Notes |
| --- | --- | --- | --- |
| Send OTP | `POST /api/v1/auth/otp/send/` | Integrated | Production CAPTCHA/Turnstile token still requires native production strategy. |
| Verify OTP | `POST /api/v1/auth/otp/verify/` | Integrated | Returns JWT + `created`; registration can update display name afterward. |
| Profile | `GET/PATCH /api/v1/auth/me/` | Integrated | Supports first/last/display name, email, alternate phone. |
| Categories | `GET /api/v1/service-categories/` | Integrated | Real content only. |
| Services/detail | `GET /api/v1/services/`, `GET /api/v1/services/{slug}/` | Integrated | Real prices/media/descriptions. |
| Location autocomplete | `GET /api/v1/location/autocomplete/?input=` | API ready; mobile pending | Returns normalized suggestions including coordinates and pincode. |
| Reverse geocode | `GET /api/v1/location/reverse-geocode/?lat=&lng=` | Integrated | Used by current-location action. |
| Serviceability | `GET /api/v1/service-areas/check/?postal_code=` | Integrated | Must gate address/slot flow. |
| Public service areas | `GET /api/v1/service-areas/` | Mobile pending | Can power screenshot-derived availability page without hardcoded cities. |
| Addresses | `/api/v1/addresses/` CRUD | Integrated | Create/list/update/delete; booking screen validates pincode. |
| Cart | `GET/POST /api/v1/cart/`, `PATCH/DELETE /api/v1/cart/items/{service_id}/` | Integrated | Pricing/quantity server-owned. |
| Cart checkout | `POST /api/v1/cart/checkout/` | Mobile pending | Needs a slot/address selection for every service. |
| Slots | `GET /api/v1/slots/` | Integrated | Service + pincode + date. |
| Booking | `POST /api/v1/bookings/` | Integrated | Idempotency key included. |
| Booking list/detail | `/api/v1/bookings/` | Integrated | Real order state/history. |
| Cancel/reschedule | booking action endpoints | Integrated | Server policy is authoritative. |
| Payment order | `POST /api/v1/bookings/{id}/payments/order/` | Integrated | Opens official Razorpay UI. |
| Payment verification | `POST /api/v1/payments/verify/` | Integrated | App never trusts SDK success alone. |
| Invoice | `GET /api/v1/bookings/{id}/invoice/` | Mobile pending | Download/share UX needed. |
| Reviews | `POST /api/v1/bookings/{id}/review/` | Integrated | Completed bookings only. |
| FAQs | `GET /api/v1/faqs/` | Integrated | Real backend content. |
| Notification inbox | None | Blocked | Do not fabricate. |
| Technician detail/tracking | No safe customer projection/live feed | Blocked | Status text/support fallback only. |
