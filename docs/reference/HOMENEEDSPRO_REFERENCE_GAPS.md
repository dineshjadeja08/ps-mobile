# Home Needs Pro reference gaps

## Audit constraints

- The public homepage feed returned `Server Error Please Try After Sometime` during inspection. Its header, bottom navigation, footer, and error state were observable; successful dynamic homepage content was not.
- `adb` is not installed/available in the workspace, so no Android emulator/device package inventory or installed app inspection was possible.
- Store media is static. It cannot verify taps, transitions, sheets, validation, scrolling, sticky behavior, or animation timing.
- Authentication was not attempted because no user-owned Home Needs Pro credentials or test account were provided.

## Screens requiring user-provided evidence for high-fidelity matching

Please provide current phone screenshots or a screen recording for:

1. Splash and every onboarding page.
2. OTP entry, resend timer, error states, and successful login transition.
3. Location sheet/search/map, permission denied, and unsupported-area states.
4. Search suggestions, results, filters, recent searches, and no-results state.
5. Complete category and service-list scroll states.
6. Service configuration, add-to-cart, quantity controls, and cart empty/filled states.
7. Address list/add/edit/delete and booking address selector.
8. Full calendar, time-slot groups, unavailable slots, and rescheduling.
9. Checkout, promo/coupon, taxes/fees, payment-method selector, payment pending/failure.
10. Confirmation, Orders list, order detail, status tracking, cancellation/refund.
11. Notifications, support, reviews, policies, logout, and account deletion.
12. Motion examples, including sheet opening/closing and cart-control animation.

## Implementation assumptions (not reference claims)

- Purple Squad uses its established direct single-service booking flow while offering a server-backed saved cart.
- Purple Squad uses its existing design token rhythm and Manrope font, tuned to observed scale.
- Purple Squad retains pull-to-refresh, native confirmation alerts, and standard navigation transitions.
- Wallet, referral cash, parts-pricing, live technician tracking, and notification inbox are omitted unless Purple Squad APIs/business rules are added.

## Do-not-claim boundary

No unobserved screen is marked as an exact visual match. A screen can be called `implemented` without being called `reference-matched`; the latter requires same-viewport screenshot comparison.
