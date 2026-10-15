# Mobile API mapping

Base URL: `${EXPO_PUBLIC_API_URL}/api/v1`

| Domain | Method and endpoint | Authentication | Mobile use |
|---|---|---|---|
| OTP | `POST /auth/otp/send/` | Public | Send login OTP |
| OTP | `POST /auth/otp/verify/` | Public | Verify OTP and receive JWTs |
| Session | `POST /auth/refresh/` | Refresh token | Rotate access token |
| Profile | `GET/PATCH /auth/me/` | Bearer | Profile display/edit |
| Logout | `POST /auth/logout/` | Bearer | Blacklist refresh token |
| Categories | `GET /service-categories/` | Public | Home/category discovery |
| Services | `GET /services/` | Public | Search/filter/featured/popular catalogue |
| Service detail | `GET /services/{slug}/` | Public | Package details and backend prices |
| Serviceability | `GET /service-areas/check/` | Public | Validate pincode |
| Location | `GET /location/reverse-geocode/` | Public | Coordinates to normalized address |
| Addresses | `GET/POST /addresses/` | Bearer | List/create saved addresses |
| Address | `PATCH/DELETE /addresses/{id}/` | Bearer | Edit/remove saved address |
| Slots | `GET /slots/` | Public | `service_id`, `postal_code`, `date` |
| Booking | `POST /bookings/` | Bearer | Direct checkout with `Idempotency-Key` |
| Bookings | `GET /bookings/` | Bearer | Customer history |
| Booking | `GET /bookings/{id}/` | Bearer | Status/payment timeline |
| Cancel | `POST /bookings/{id}/cancel/` | Bearer | Policy-controlled cancellation |
| Reschedule | `POST /bookings/{id}/reschedule/` | Bearer | Policy-controlled slot change |
| Cart | `/cart/`, `/cart/items/{service_id}/`, `/cart/checkout/` | Bearer | Multi-service checkout; client UI pending |
| Payment order | `POST /bookings/{id}/payments/order/` | Bearer | Idempotent Razorpay order |
| Payment verify | `POST /payments/verify/` | Bearer | Server signature verification |
| Invoice | `GET /bookings/{id}/invoice/` | Bearer | PDF receipt |
| Review | `POST /bookings/{id}/review/` | Bearer | Completed-booking review |
| Reviews | `GET /services/{service_id}/reviews/` | Public | Service review list |
| FAQs | `GET /faqs/` | Public | Help centre |
| Banners | `GET /homepage-banners/` | Public | Backend-managed promotions |

## Missing contracts

- Customer notification inbox/read state and device push-token registration.
- Customer-safe assigned technician details.
- Customer online balance-payment order/verification.
- Live technician location.
- Booking problem-photo attachment.
- Support tickets, public packages, variants/add-ons, coupon validation and account deletion.

The mobile client must not invent these responses. Any extension must be added to DRF with permissions, schema, tests and backward-compatible serializers.

