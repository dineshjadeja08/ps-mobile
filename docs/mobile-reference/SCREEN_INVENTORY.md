# Home Needs Pro mobile screenshot inventory

All 25 supplied JPEGs were inspected individually at their original 702 × 1599 resolution. Measurements below are approximate visual measurements; the screenshots appear to be roughly 2× device scale (about 351 × 800 logical px). Timestamp order is not treated as navigation order.

| # | Original filename | Screen identity | Key observed structure | Purple Squad route |
| --- | --- | --- | --- | --- |
| 1 | `WhatsApp Image 2026-10-12 at 11.58.27 AM (2).jpeg` | Welcome | Full-bleed lifestyle photo; logo and white/blue headline over dark left side; white bottom sheet; 4×2 service icon grid; three trust claims; filled Register and outlined Log In. | `/onboarding` |
| 2 | `WhatsApp Image 2026-10-12 at 11.58.27 AM (1).jpeg` | Registration, empty/lower viewport | Lifestyle photo background; white sheet with large rounded top corners; floating logo; outlined fields; filled SIGN UP; `Have an account? SIGN IN`. | `/register` |
| 3 | `WhatsApp Image 2026-10-12 at 11.58.27 AM.jpeg` | Registration, source dropdown open | Same registration sheet; discovery-source picker expanded with Facebook, Instagram ads, Google ads. | `/register` (source field blocked by backend) |
| 4 | `WhatsApp Image 2026-10-12 at 11.58.26 AM (2).jpeg` | Registration, populated | Name, `+91` contact, referral code, and discovery-source fields; sheet scrolls above keyboard/viewport. | `/register` |
| 5 | `WhatsApp Image 2026-10-12 at 11.58.26 AM (3).jpeg` | Registration dropdown lower state | Discovery-source menu scrolled to Pamphlet, YouTube, reference. | `/register` (blocked field) |
| 6 | `WhatsApp Image 2026-10-12 at 11.58.26 AM (1).jpeg` | OTP verification | Full-bleed photo; bottom white sheet; floating logo; 4 large OTP cells; resend countdown; wide VERIFY CTA. | `/verify-otp` |
| 7 | `WhatsApp Image 2026-10-12 at 11.58.25 AM (3).jpeg` | Location search, empty | Centered title; gray pill input; divider with OR; outlined current-location CTA; Google attribution; large whitespace. | `/location-search` |
| 8 | `WhatsApp Image 2026-10-12 at 11.58.25 AM.jpeg` | Location search, results | Same top structure; clear icon; provider attribution; vertical suggestion rows with search icons and multiline text. | `/location-search` |
| 9 | `WhatsApp Image 2026-10-12 at 11.58.24 AM (2).jpeg` | Map/address confirmation, supported | Map occupies ~57% height; centered red pin; map controls; lower white form with icon/title/address; two outlined fields; disabled confirmation CTA. | `/book/address` (manual/reverse-geocode equivalent; map UI blocked) |
| 10 | `WhatsApp Image 2026-10-12 at 11.58.25 AM (2).jpeg` | Map/address confirmation, unsupported input | Map and populated address form; filled navy confirmation CTA. | `/book/address` |
| 11 | `WhatsApp Image 2026-10-12 at 11.58.25 AM (1).jpeg` | Unavailable-city modal | Scrim over map; centered large white rounded modal; top image; floating red error icon; bold title; explanatory copy; navy Okay CTA. | serviceability error in `/book/address` |
| 12 | `WhatsApp Image 2026-10-12 at 11.58.26 AM.jpeg` | Service availability fallback | Back/title header; wide unavailable-location artwork; message with red emphasis; `Cities we currently serve`; 3-column city cards; sticky Continue. | UNIMPLEMENTED: requires public service-area/city UI |
| 13 | `WhatsApp Image 2026-10-12 at 11.58.24 AM (1).jpeg` | Home | Logo + user/address header; notification and cart icon cards; 2:1 hero; floating search; `Our Services`; 4-column image categories; five-item bottom nav with raised center Home. | `/(tabs)` |
| 14 | `WhatsApp Image 2026-10-12 at 11.58.24 AM.jpeg` | Category, Air conditioner | Compact title/subtitle header; promo banner; floating search; horizontal category cards; section copy; large service card below. | `/(tabs)/categories` |
| 15 | `WhatsApp Image 2026-10-12 at 11.58.22 AM (2).jpeg` | AC Inspection service card | Header/search/category carousel; section description; 1:1-ish service image; duration pill overlapping image; title, description, rating; price/savings/QA strip; selection count; filled Add to Cart. | `/service/[slug]` |
| 16 | `WhatsApp Image 2026-10-12 at 11.58.22 AM (1).jpeg` | AC problem selection | Four radio rows with label and price; selected row has navy border; total + filled Add to Cart control. | UNVERIFIED Purple mapping: backend has services, not option variants |
| 17 | `WhatsApp Image 2026-10-12 at 11.58.22 AM.jpeg` | Washing-machine service | Same listing composition; sticky bottom cart summary `1 item · ₹289 · Go to cart`. | `/service/[slug]`, `/cart` |
| 18 | `WhatsApp Image 2026-10-12 at 11.58.21 AM (3).jpeg` | Cart | Header; hero; wallet/referral banner; selected-address card; red clear-cart CTA; grouped service card; quantity control; checkout and more-services actions. | `/cart` |
| 19 | `WhatsApp Image 2026-10-12 at 11.58.21 AM (2).jpeg` | Date/slot, initial | Header + notification; selected-address card; full month calendar; selected-date/time summary; two-column slot grid. | `/book/slot` |
| 20 | `WhatsApp Image 2026-10-12 at 11.58.21 AM (1).jpeg` | Date/slot, selected | Selected date filled navy; selected time filled navy; summary values green/navy; two-column slots; sticky `Continue to Payment`. | `/book/slot` |
| 21 | `WhatsApp Image 2026-10-12 at 11.58.21 AM.jpeg` | Review & Pay, top | Back/title/security art; address and date cards; `Services & Charges`; quantity stepper; price rows; pale blue total; sticky Pay Securely. | `/book/review`, `/book/pay/[bookingId]` |
| 22 | `WhatsApp Image 2026-10-12 at 11.58.20 AM (3).jpeg` | Review & Pay, lower | Charge summary; tip selection card; wide rounded sticky payment CTA with lock and amount. | `/book/review`, `/book/pay/[bookingId]` |
| 23 | `WhatsApp Image 2026-10-12 at 11.58.20 AM (2).jpeg` | Payment launch/loading | Review header; large white space; centered courier/payment illustration. | `/book/pay/[bookingId]` pending state |
| 24 | `WhatsApp Image 2026-10-12 at 11.58.20 AM (1).jpeg` | Razorpay Google Pay sheet | Dimmed app; native/vendor bottom sheet; amount; Google Pay; More Options; Pay; privacy notice. | Official Razorpay SDK (not custom UI) |
| 25 | `WhatsApp Image 2026-10-12 at 11.58.20 AM.jpeg` | Razorpay payment options | Vendor-owned full payment-options sheet; offers, UPI, cards, EMI, netbanking, wallet; amount + Continue. | Official Razorpay SDK (not custom UI) |

## Repeated geometry

- Canvas: white, with very subtle pale-gray/blue sections.
- Primary navy reference role: approximately `#0D3F76`; Purple Squad substitutes its own purple.
- Screen gutter: approximately 15 logical px.
- Large cards and sheets: approximately 22–32 logical px radius.
- Inputs: approximately 56–66 logical px high with 1–1.5 px outline.
- Primary CTA: approximately 54–58 logical px high, pill radius, white semibold text.
- Section heading: approximately 20–24 logical px, heavy weight.
- Body: approximately 13–16 logical px, gray.
- Header icons sit in small white rounded cards with a short colored bottom edge/shadow and optional red badge.
