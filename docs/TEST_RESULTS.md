# Verification results

## Reference reconstruction pass — 2026-10-12

| Check | Result |
|---|---|
| 25 reference JPEG dimensions | Pass — all 702 × 1599 |
| Individual original-resolution inspection | Pass — 25/25 |
| `npx tsc --noEmit` | Pass |
| `npx eslint src --max-warnings=0` | Pass |
| `npx expo-doctor` | Pass — 21/21 |
| `npx expo export --platform web` | Pass — 31 static routes |
| Targeted backend suites | Pass — 60 tests |
| Live local autocomplete | Blocked — configured location provider returned HTTP 503 |
| Native same-viewport screenshot comparison | Blocked — `adb` unavailable and local browser capture could not attach |

Targeted backend suites: cart, location lookup, locations, bookings, and payments. Warnings were limited to the known missing `staticfiles` directory in the test environment.

The generated authentication hero asset is original and stored at `assets/images/welcome-hero.png`; no reference photography is bundled in the application.

Run on 2026-10-10.

## Mobile

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass, zero warnings/errors |
| `npx expo-doctor` | Pass, 21/21 checks |
| `npx expo export --platform web` | Pass, 20 static routes bundled |

The web export validates route/module bundling only. The Razorpay bridge intentionally requires an Android/iOS development build for actual checkout.

## Backend

| Check | Result |
|---|---|
| `python manage.py check` | Pass, zero issues |
| OpenAPI generation/validation | Pass with seven unique warnings |
| `pytest -q` | 244 passed, 1 failed, 224 warnings |

The single backend failure is the admin dashboard test under test configuration: WhiteNoise cannot find `admin/css/base.css` in its static manifest. It is not a customer booking/payment test failure, but should still be repaired before CI is considered green.

## Dependency audit

`npm audit --omit=dev` reports 29 advisories (11 moderate, 18 high, zero critical) in the Expo/Metro/React Native toolchain dependency graph. The proposed automatic remediations downgrade Expo/React Native or jump Expo Router across the SDK compatibility boundary, so no unsafe `--force` rewrite was applied. Recheck against the next compatible Expo SDK/patch set and evaluate the affected build-time attack surfaces in the release threat model.

## Still required

- Android development-build compile and physical-device test.
- iOS development-build compile and physical-device test on macOS/Xcode.
- Real OTP, Razorpay test-mode, webhook, deep-link, offline/retry, accessibility, and store-release checks.

