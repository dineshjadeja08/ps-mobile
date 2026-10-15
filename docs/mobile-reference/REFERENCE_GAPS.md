# Reference and integration gaps

## Screenshot coverage gaps

- No login form screenshot after tapping `Log In`.
- No Home scroll below the first category section.
- No search-results or no-results screen.
- No cart empty state.
- No address list/add-new sheet during checkout.
- No disabled slot visual example.
- No payment failure/cancelled/pending-verification state.
- No confirmation, Orders list/detail, tracking, cancellation, reschedule, profile, notifications, help, FAQ, review submission, invoice, or receipt screens.
- Static images cannot verify transitions, scroll restoration, keyboard avoidance, Android Back behavior, or animation timing.

## Purple Squad backend gaps

- Registration referral code and acquisition-source fields are not modeled.
- Customer notification inbox/device push-token API is absent.
- Customer-safe assigned-technician detail/live tracking is absent.
- Nested service variants/problem options are absent; services are currently flat catalogue items.
- Wallet/referral-cash/tip models are absent.
- Balance-payment endpoint is absent; current payment flow handles booking advance.
- Customer invoice endpoint exists, but mobile download/share UI is not implemented.

## Environment gaps

- `adb` is unavailable, so no Android emulator screenshot comparison was possible in this environment.
- Web rendering can validate React layout but cannot prove native Android/iOS parity.
- Native Google Maps UI would require an SDK-compatible native map dependency and a development build. The current project has location permission/reverse geocoding but no map-view dependency.

## Asset boundary

Reference photographs and logos are evidence only and are not copied into the app. Purple Squad uses backend/owned images plus `assets/images/welcome-hero.png`, generated as an original project asset.
