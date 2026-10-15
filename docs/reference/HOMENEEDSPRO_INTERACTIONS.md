# Home Needs Pro interaction inventory

| Interaction | Evidence | Purple Squad behavior |
| --- | --- | --- |
| Bottom navigation | Verified website shell | Four persistent tabs: Home, Services, Orders, Profile. Active item uses primary color. |
| Delivering address | Verified website header | Tapping reveals Purple Squad's service-location editor; current-location permission is requested only from that action. |
| Search | Verified store screenshots | Local filtering uses real catalogue data; an empty result provides a clear recovery action. |
| Category card | Verified screenshots | Opens Services with the category preselected. |
| Service card | Verified screenshots | Opens real service detail by slug. |
| Add / cart utility | Entry point screenshot-verified, body unverified | Authenticated users add through `/api/v1/cart/`; signed-out users are routed to sign-in; cart totals/quantity/remove are server-backed. |
| Primary detail CTA | Exact label unverified | `Book for ₹…` starts Purple Squad's existing booking flow. Sticky placement mirrors the observed action-first detail composition without claiming exact reference text. |
| Date selection | Screenshot-verified | Seven-day horizontal strip; changing date refetches live slots. |
| Slot selection | Screenshot-verified | Filled/outlined primary selected state; unavailable slots are disabled and marked Full. |
| Sign-in validation | Phone field verified; OTP state unverified | Ten-digit India mobile validation followed by six-digit OTP; server errors render inline. |
| Payment | Capability only | Native Razorpay; success is never accepted until Purple Squad backend verification. Cancellation/pending states remain recoverable. |
| Order status | Destination only | Real server status, payment totals, history, cancel/reschedule/review actions. No visual-match claim. |
| Pull to refresh | Unobserved | Purple Squad assumption on catalogue, orders, and detail screens; documented as a native usability enhancement. |
| Loading / empty / error | Website error only | Reusable progress, empty, and retry states. Exact reference skeletons are unverified. |
| Animations | Unobserved | Platform-standard navigation and press opacity only. |

## Fixed and sticky elements

- Primary tab bar is fixed on top-level destinations.
- Checkout/detail primary action is fixed above the bottom inset in Purple Squad.
- Reference sticky behavior beyond these visible structures is unverified.

## Accessibility and input behavior

- Purple Squad preserves explicit accessibility labels/roles on controls.
- Buttons maintain at least a 44 px target.
- Form screens use keyboard-safe scroll content.
- Destructive booking cancellation retains a native confirmation alert.
