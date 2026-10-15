# Screen-to-API matrix

Base path: `${EXPO_PUBLIC_API_URL}/api/v1`

| Mobile surface | Endpoint(s) | Auth | State |
|---|---|---:|---|
| Splash/session restore | `POST /auth/refresh/`, `GET /auth/me/` | Refresh | Built |
| Phone login | `POST /auth/otp/send/`, `POST /auth/otp/verify/` | No | Built; CAPTCHA production contract unresolved |
| Home | `GET /service-categories/`, `GET /services/`, `GET /service-areas/check/` | No | Built |
| Current location | `GET /location/reverse-geocode/` | No | Built |
| Categories/search/filter | `GET /service-categories/`, `GET /services/` | No | Built |
| Service detail | `GET /services/{slug}/`, `GET /services/{id}/reviews/` | No | Built core detail; review summary can be expanded |
| Saved/new address | `GET/POST /addresses/`, `PATCH/DELETE /addresses/{id}/` | Yes | Built create/select |
| Slot selection | `GET /slots/` | No | Built |
| Review booking | Server-provided service price plus local selections | Mixed | Built |
| Create booking | `POST /bookings/` with `Idempotency-Key` | Yes | Built |
| Razorpay advance | `POST /bookings/{id}/payments/order/`, `POST /payments/verify/`, `GET /bookings/{id}/` | Yes | Built native checkout + reconciliation |
| Booking success | `GET /bookings/{id}/` | Yes | Built |
| My bookings | `GET /bookings/` | Yes | Built |
| Booking detail/status | `GET /bookings/{id}/` | Yes | Built |
| Cancel | `POST /bookings/{id}/cancel/` | Yes | Built |
| Reschedule | `POST /bookings/{id}/reschedule/`, `GET /slots/` | Yes/No | Backend ready; dedicated mobile screen next |
| Review submission | `POST /bookings/{id}/review/` | Yes | Built |
| Invoice | `GET /bookings/{id}/invoice/` | Yes | Backend ready; download/share UI next |
| Cart | `GET /cart/`, item endpoints, `POST /cart/checkout/` | Yes | Backend ready; app currently uses direct booking |
| FAQs | `GET /faqs/` | No | Backend ready; UI next |
| Support | No ticket endpoint | — | Phone/WhatsApp/email fallback built |
| Notifications | No customer endpoint | — | Blocked on backend |
| Technician card/tracking | No customer-safe technician/tracking contract | — | Blocked on backend |
| Pay balance | No customer balance-payment endpoint | — | Blocked on backend |

## Client contract rules

- Access tokens are attached centrally and refreshed once for concurrent 401 responses.
- Refresh tokens are stored in SecureStore on native platforms; web local storage exists only to support browser development.
- Booking and payment-order mutations include stable idempotency keys.
- The client never computes an authoritative total and never treats Razorpay SDK success as payment success.
- Loading, empty, validation, offline/API error, cancelled payment, and pending verification states are explicit.

