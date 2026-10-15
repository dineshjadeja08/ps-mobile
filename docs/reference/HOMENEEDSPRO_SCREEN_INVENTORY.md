# Home Needs Pro screen inventory

Audit date: 12 October 2026. Sources: the public Home Needs Pro website, its official Apple App Store listing, and its official Google Play listing. `adb` is not available in this workspace, so no installed reference binary was inspected. “Verified” below means visible in one of those sources, not inferred from a product category.

| Screen / state | Evidence | Verification | Observable structure |
| --- | --- | --- | --- |
| Public website shell | Website, mobile viewport | Verified | Logo; `Delivering Address` control with Hyderabad; utility control; Sign In; fixed bottom navigation with Home, Services, Orders, Profile; footer links. The content feed returned `Server Error Please Try After Sometime` with a `Retry Again` action during the audit. |
| Sign in | Website `/login`, mobile viewport | Verified | Light-gray page; elevated white card; dark title; short supporting copy; Phone Number label; outlined `+91` input; full-width dark primary button; Sign Up secondary action. |
| Home | Apple and Google Play screenshots | Screenshot-verified | Compact identity/location header; notification/cart utilities; prominent lifestyle promotion; pill-like search; `Our Services`; image-led category shortcuts; additional promotional/service content; persistent four-item bottom navigation. |
| Category / subcategory | Apple screenshot (Plumbing) and Google Play marketing screenshot | Screenshot-verified | Back/title header, utility actions, search, promotional referral card, compact image category tiles, then service content. Exact below-fold ordering is unverified. |
| Service discovery | Google Play `Discover` screenshot | Screenshot-verified | Image cards for service families, short labels, two-column grouping in the marketing frame. |
| Service detail | Apple screenshot (Deep Bathroom Cleaning) | Screenshot-verified | Large top image; back and utility actions; price and struck-through prior price; saving treatment; service title; rating/review count and trust copy; duration row; description card/content; bottom content not visible. |
| Schedule | Google Play `Schedule` screenshot | Screenshot-verified | `Select Date & Slot` header; month/date strip or calendar; available time-slot groups; selected time receives filled primary treatment. |
| Profile | Apple screenshot | Screenshot-verified | Title and supporting label; greeting; editorial image; wallet/balance card; vertically stacked rounded menu rows including profile, address, and parts/prices; notification/profile utility. Purple Squad must omit wallet data because its backend has no wallet API. |
| Splash / onboarding | No accessible screenshot | UNVERIFIED | No fidelity claim. |
| OTP entry | No accessible screenshot | UNVERIFIED | Only the phone-number sign-in state was observed. |
| Location selector | Header control observed only | PARTIAL | Entry point is verified; selector sheet/search/map behavior is unverified. |
| Search results | Search field observed only | PARTIAL | Search entry point and placement verified; result layout and filters unverified. |
| Cart | Cart-like header utility visible in screenshots | PARTIAL | Entry point is plausible/visible; cart body, quantity behavior, checkout transition, and empty state are unverified. |
| Address selection | Profile `Address` row visible | PARTIAL | Account entry point is verified; booking selection UI is unverified. |
| Checkout / payment | Store description mentions scheduling and secure payment | PARTIAL | Capability verified; screen geometry and method selector are unverified. |
| Confirmation | No accessible screenshot | UNVERIFIED | No fidelity claim. |
| Orders / order detail / status | Website bottom tab and `My Orders` footer link | PARTIAL | Navigation destination is verified; list, detail, tracking timeline, and state treatments are unverified. |
| Reviews | Rating/review summary visible on service detail | PARTIAL | Summary is verified; submission experience is unverified. |
| Help and support | Website mail support and store app-support sections | PARTIAL | Support availability is verified; in-app help screen is unverified. |

## Captured geometry and hierarchy

- The published phone screenshots use a narrow portrait frame and dense above-the-fold composition.
- Headers are compact rather than large-title navigation bars.
- Cards use modest corner radii, fine neutral borders/shadows, and white surfaces.
- The reference brand uses deep navy. Purple Squad substitutes its primary purple while retaining the verified contrast and hierarchy.
- Service imagery is photographic and cropped consistently. Purple Squad uses only its own/backend-provided imagery.
- The bottom navigation remains visible on the primary destinations and contains exactly Home, Services, Orders, and Profile.

## Source links

- https://homeneedspro.com/
- https://apps.apple.com/in/app/home-needs-pro/id6520390917
- https://play.google.com/store/apps/details?id=com.grownext.homeneedprouserapp
