# Design audit and mobile system

## Inputs inspected

- Existing `ps_coreF1` customer website implementation and its shipped brand/service assets.
- Live `purplesquad.in` homepage for brand, typography, service taxonomy, trust language, and support contact conventions.
- The supplied Figma file was requested through the Figma connector, but the account returned its Starter-plan MCP call limit. No claim in this repository depends on an unverified Figma frame.

## Design direction used

The app is a native interpretation of Purple Squad rather than a compressed web page:

- Purple is the primary action and brand color; warm off-white surfaces reduce glare.
- Manrope is loaded across the app to match the website.
- Official logos and existing service art are reused from the web repository.
- Bottom navigation prioritizes Home, Services, Bookings, and Account.
- Critical actions use full-width, thumb-friendly controls; cards have restrained rounding and visible borders.
- Serviceability is introduced on Home before the user invests in checkout.
- Trust cues appear near discovery and payment, where they affect confidence.
- Payment copy distinguishes checkout completion from backend verification.

## Reusable primitives

- `Screen`: safe-area, keyboard-aware scrolling, pull-to-refresh, optional sticky action area.
- `Button`: primary/secondary/ghost/danger variants with loading and disabled states.
- `Field`: labelled input with validation/help text.
- `LoadingState`, `EmptyState`, `MessageState`: consistent asynchronous UX.
- `ServiceCard`: reusable service summary and pricing surface.
- Central tokens cover brand colors, semantic colors, spacing, radii, shadows, and Manrope font roles.

## Accessibility baseline

- High-contrast text/action combinations and semantic error/success colors.
- Controls target approximately 44–48 dp minimum height.
- Text inputs have labels; icon-only support controls have accessible intent.
- Dynamic content is represented by text as well as color.
- The next QA pass should include VoiceOver/TalkBack ordering, large-text layouts, reduced motion, and automated contrast checks on physical devices.

## Remaining design decisions

- Reconcile exact colors, spacing, component variants, and copy against Figma once connector access is restored.
- Obtain approved square/adaptive app-icon artwork rather than manufacturing one from the horizontal wordmark.
- Design technician, notification, balance-payment, package, coupon, and live-tracking surfaces after their API contracts exist.

