# Ctrl Z on Embarko

## Active deployment

The existing account deployment is live at [ctrl-z.embarko.app](https://ctrl-z.embarko.app/), serving source revision `8a78698`. Embarko confirmed an update to the same claimed app with no warnings. Its current public app ID is `cmwmhb4t700qv1ze1awg7ui23`, recorded in [the release manifest](../config/embarko/embarko.json).

The release archive was rebuilt from the committed revision and checked against the tested entry points. Its 34 entries contain only the static pages, bundles, art and licenses. The optional identity manifest was omitted for this update because the tracked ID belonged to the deleted instance. The authenticated request verified the existing named app before uploading. Archive SHA-256 `E1C0010CC374DA7D77D5AE74BDF6DE5E28119A8055A3570F7B3CC0AE29D5E981`.

Hosted checks passed on Chromium desktop at 1440x900 and Chromium with Playwright iPhone 13 settings at 320x700 and 844x390. The desktop check matched the release bundle to the archived HTML and confirmed the corrected Crisis Help and Sandbox entry. The phone emulation exercised the responsive panels, touch gestures, low power and the outage-to-comparison flow. Physical phone, native picker and hardware performance checks remain open.

## Preserved checkpoint — 17 November 2026

The creator stopped the deployment session and subsequently requested docs/handoff/archive/UI_REDESIGN.md. Existing compatibility work is preserved as an independent tested checkpoint. Fresh validation: 100 unit tests and both desktop/mobile production-CSP cases pass. The earlier authenticated claim was interrupted; no claimed-response receipt is present locally, so permanence remains unconfirmed. Credentials and authentication are not part of the UI task and must never be committed. No Embarko deployment or claim was retried for the redesign. Historical anonymous status/expiry below is not a current availability claim.

## Original anonymous app (historical)

- URL returned by Embarko: https://ctrl-z.embarko.app
- App name: ctrl-z
- Public app ID: cmwj82l6f01t37w6h5hox7m5n (the former instance).
- Anonymous expiry: 2026-11-17T12:10:59.894Z, or 17 November 2026 at 5:40 PM IST.
- No account, deployment token or existing credentials were used. The email question was presented only after real hosted desktop gameplay worked. Claiming remains pending the creator's email/token.

The existing GitHub Pages site and .github/workflows remain unchanged. This is an additional host. Browser saves are local to each origin: existing GitHub Pages saves remain there; Embarko has its own browser slot. The current v2 format still loads compatible v1 saves.

## Build and compatibility

The default `npm run build` retains the /Ctrl-Z/ Pages base and original game entry. For Embarko, `npm run build -- --mode embarko` uses the root base and replaces only the simulation HTML entry with src/embarko-main.tsx. That entry evaluates src/embarko-pixi.ts before mounting the unchanged src/main.tsx.

The host's policy does not allow unsafe-eval, blob workers or data-URL fetches. The original anonymous upload served the homepage but exposed a real Pixi startup error in browser testing. The Embarko profile uses the installed Pixi package's official pixi.js/unsafe-eval compatibility module (it provides synchronizers that avoid dynamic evaluation), and sets preferWorkers/preferCreateImageBitmap false so the same PNGs use Pixi's HTML image loader. Host security policy is preserved. No dependency was installed, no Dockerfile was added and no city/art/gameplay/HUD/camera/save code was changed. The landing entry remains lightweight and separate.

The dedicated regression command is `npm run test:embarko -- --workers=1`. It builds the production profile, serves it with the same mode and tests desktop/mobile under the actual restrictive policy. It exercises embedded startup, outage, pause, hospital inspection, supply delivery, save, full-screen resume and restoration. The initial local test caught a preview-mode mismatch; the configuration now passes --mode embarko to preview too.

## Packaging and account redeploy

Follow https://embarko.ai/docs/quickstart.md and https://embarko.ai/docs/static-sites. The uploaded artifact is a prepared static website: index.html, simulation.html, assets and license files at archive root. The optional identity manifest is stored at config/embarko/embarko.json; the archive expects it at its root as embarko.json. Do not upload source-control data, credentials, .env, skill directories or node_modules. Never commit the archive or raw API replies.

Run `npm run build -- --mode embarko` from the approved revision. For account updates, check that the manifest identifies the current live app, then copy it into the static output as `embarko.json` at the archive root. Archive the built files as a .tar.gz and inspect the member list. Use the existing app name and saved Embarko key to upload the archive to https://ship.embarko.ai/apps. Verify the provider's live status and the hosted bundle before reporting success.

The corrected archive is retained locally at .impeccable/review/deploy/ctrl-z-embarko-csp.tar.gz (SHA256 A89D5544D371F1C27B3E6E48BA66F30B3AA5F460D877887889D530A1B26967C1). The server returned success, live, claimed false, the same app ID/URL/expiry, and no warnings. Raw replies/claim links remain ignored and must not be published.

## Original compatibility verification (historical)

100 unit checks pass. The production Embarko build and both local desktop/mobile restrictive-policy cases pass. Default Pages build also passes and retains its previous simulation/City/CSS artifact names. Hosted desktop homepage, embedded save/navigation/minimap/inspection and full gameplay/replay cases pass; mobile homepage passes and its gameplay checks are still running at this checkpoint. Update this receipt when those finish. No permanent-hosting claim has occurred.
