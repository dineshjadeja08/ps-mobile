# Home Needs Pro observed design system

This is an observation log, not a claim to Home Needs Pro's internal tokens. Measurements are visual estimates from published screenshots and the public mobile website.

## Color roles

| Role | Reference observation | Purple Squad implementation |
| --- | --- | --- |
| Brand / primary | Very dark navy on buttons, hero surfaces, headings, and active navigation | `#6527B8` Purple Squad purple |
| Pressed primary | Not directly measurable | `#4E1D91` for accessible pressed feedback |
| Accent | Offer artwork uses warm highlight colors | `#F58220` Purple Squad orange, used sparingly for promotion/price emphasis |
| Canvas | Pale neutral gray | `#F7F7F8` |
| Surface | White cards and sheets | `#FFFFFF` |
| Heading | Near-black / deep navy | `#202124` |
| Secondary copy | Mid neutral gray | `#686A70` |
| Border | Light gray | `#E7E7EA` |
| Success/trust | Green indicators where applicable | `#15803D` |

## Typography

- Reference: modern rounded sans-serif, strong weight contrast, compact mobile labels.
- Purple Squad: Manrope, already bundled.
- Display/title: 24–28 px, 700–800 weight.
- Section title: 18–20 px, 700–800 weight.
- Card title: 14–16 px, 600–700 weight.
- Body: 13–15 px, 400–500 weight, approximately 1.45 line height.
- Metadata/tab labels: 9–12 px, 600–700 weight.

## Spacing and geometry

- Base spacing rhythm: 4, 8, 12, 16, 24, 32 px.
- Page gutter: approximately 16 px.
- Compact header height: approximately 52–60 px plus safe area.
- Search field: approximately 48–52 px high, rounded rectangle.
- Category grid: four compact columns in the published home screenshot; artwork above a centered two-line label.
- Cards: approximately 10–14 px radius. Purple Squad standardizes on 12 px.
- Primary buttons: 48–52 px minimum height; full-width in forms/checkout.
- Bottom navigation: approximately 60–68 px plus device safe-area inset.

## Imagery

- Home promotions: wide image-backed/editorial banners, roughly 2:1 to 2.4:1.
- Category art: square or mildly landscape thumbnails, consistently cropped.
- Service-detail hero: wide photograph, approximately 1.4–1.6:1.
- Purple Squad must use backend-hosted or Purple Squad-owned imagery only; no Home Needs Pro screenshots/assets are shipped in the application.

## Elevation and states

- White cards separate primarily through border, subtle shadow, or canvas contrast.
- Active tabs, date cells, and slots use a filled primary state.
- Disabled choices reduce opacity and remain legible.
- Loading, empty, error, and offline states were not visible in store screenshots. The website error state was a centered message with a single retry action.

## Motion

No animation timing could be verified from static store imagery or the public website. Purple Squad therefore uses platform-standard press feedback and existing Expo Router transitions; no matching-animation claim is made.
