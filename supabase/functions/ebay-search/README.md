# eBay search Edge Function

Required Supabase secrets:

- `EBAY_CLIENT_ID` – the production eBay App ID / Client ID
- `EBAY_CLIENT_SECRET` – the production eBay Cert ID / Client Secret
- `EBAY_MARKETPLACE_ID` – optional; defaults to `EBAY_DE`

The function obtains and temporarily caches an eBay application access token, searches active Browse API listings, and returns only relevant vinyl LP results. Credentials never reach the browser.
