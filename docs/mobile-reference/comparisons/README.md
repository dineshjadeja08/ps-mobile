# Visual comparison status

## Reference preparation

- All 25 source images are preserved under `references/homeneedspro/` at 702 × 1599.
- Every image was inspected individually at original resolution.
- Corresponding route and implementation status are recorded in `../SCREEN_INVENTORY.md` and `../SCREEN_MAPPING.md`.

## Implementation capture

No Android/iOS emulator is available through `adb` in this workspace, and the local Expo web page could not attach to the provided browser capture bridge at either `localhost:8083` or `192.168.1.8:8083`. Therefore no side-by-side or difference image is claimed in this directory yet.

The following checks did complete:

- TypeScript compile.
- ESLint with zero warnings.
- Expo Doctor 21/21.
- Static web export of 31 routes.
- 60 targeted backend tests covering cart, location, booking, and payment.

## Capture checklist for the next native QA pass

At a 351 × 800 logical viewport (or the original 702 × 1599 physical capture size), capture:

1. `/onboarding`
2. `/register`
3. `/verify-otp`
4. `/location-search`
5. `/service-availability`
6. `/(tabs)`
7. `/(tabs)/categories`
8. `/service/[slug]`
9. `/cart`
10. `/book/slot`
11. `/book/review`

Compare header height, 16 px gutters, card radii, image crop, text wrapping, fixed action bar, safe-area handling, and five-item bottom navigation. Do not compare or imitate Razorpay's native UI; verify the official SDK handoff instead.
