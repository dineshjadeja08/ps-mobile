# Component specification

## `ReferenceHeader`

- Optional 44 px circular back control.
- Center/left-aligned title plus smaller subtitle.
- One or two 42–46 px utility cards on the right.
- Notification/cart badge: red, 16–18 px, top-right overlap.

## `SearchField`

- Height 52–58 px.
- Reference search uses a navy circular leading icon and a blue/navy outline; location search uses a filled neutral-gray pill.
- Clear icon appears at the trailing edge when populated.

## `ImageCategoryGrid`

- Home: four columns.
- Image dominates the tile; short label is centered below.
- White tile, fine border/shadow, 10–14 px radius.
- Exactly observed service categories are populated from Purple Squad's API, never hardcoded as production data.

## `ServiceShowcaseCard`

- White surface with ~22 px radius and fine border.
- Wide cover image; 60-minute pill overlaps its bottom-right.
- Title, two-line description, rating/trust row if real data exists.
- Price/savings/quality strip.
- Filled full-width Add to Cart CTA.
- Purple Squad omits ratings or savings if the backend does not provide them.

## `OptionRadioRow`

- 56–64 px row with label left and price right.
- 22 px radio at left.
- Selected state: 2 px primary outline and primary inner dot.
- Backend blocker: Purple Squad currently exposes flat services, not nested problem/variant options.

## `CartServiceGroup`

- Section title and group total.
- Thumbnail, service name, selected problem/description, line price, remove control.
- Stepper uses bordered minus/value/plus segments.
- Checkout CTA is filled; More Services is outlined.
- Wallet/referral blocks are omitted without matching business APIs.

## `AddressCard`

- White rounded card, location icon in a pale disc, label above bold address, supporting address below.
- Edit action at trailing edge where supported.

## `MonthCalendar`

- Month title with calendar icon and previous/next arrows.
- Seven-column weekday row and six possible date rows.
- Selected date: filled primary circle; alternate outlined state appears in one screenshot.
- Current implementation uses a seven-day strip and remains a documented visual delta.

## `TimeSlotGrid`

- Two equal columns, 52–58 px rows.
- Fine border, ~10 px radius.
- Selected slot filled primary with white text.
- Unavailable/disabled slots reduce contrast and remain non-interactive.

## `PriceSummary`

- Label/value rows with small information icon where appropriate.
- Discount uses a minus sign.
- Total row sits on a pale tinted surface with larger bold type.
- Final amounts remain server-authoritative.

## `StickyActionBar`

- White container fixed above bottom safe area with an upward shadow.
- Single wide pill CTA; optional split text/amount separated by a vertical rule.

## `AuthSheet`

- White sheet with 28–32 px top corners over full-bleed photography.
- Brand mark overlaps the top edge.
- Outlined fields with floating labels.
- Keyboard-safe scrolling.

## `UnavailableModal`

- Full scrim.
- Large centered white card, 28–32 px radius.
- Wide owned illustration/photograph, floating danger icon, title/body, filled acknowledgement CTA.
- Purple Squad currently uses inline form errors; modal is a remaining fidelity item.
