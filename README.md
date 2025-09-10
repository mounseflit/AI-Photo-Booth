# Magic Face Transform — Node.js

This version of **Magic Face Transform** has been fixed and enhanced to work with the **Runware API** as the primary provider and **fal.ai / FLUX.1 Kontext [pro]** as a fallback. The goal is to keep the user experience identical—capture or upload a photo, choose a transformation prompt, generate an AI‑enhanced face, and share or download the result—but with reliable back‑end integration.

## Setup

1. **Install dependencies** (including fal.ai client and nodemailer):

   ```bash
   npm install
   ```

2. **Create a `.env` file** with at least your Runware API key. Fallback and SMTP are optional but recommended:

   ```env
   # Primary provider (required)
   RUNWARE_API_KEY=sk_live_your_runware_key

   # Optional fallback provider (fal.ai)
   FAL_KEY=fal_xxx

   # Optional SMTP for /api/send-email
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=username
   SMTP_PASS=password
   SMTP_FROM="Magic Face <noreply@example.com>"
   ```

3. **Run the app locally**:

   ```bash
   npm run dev
   # or simply
   node server.js
   ```

   Then open `http://localhost:3000` in your browser.

## API Endpoints

### `POST /api/transform`

Transforms a face using a prompt. Accepts a JSON body with:

- `image`: The input image as a `data:image/…;base64,…` data URI.
- `prompt`: A string describing the desired transformation (e.g., "make me look like a superhero").
- `character` (optional): Ignored by the server, but kept for compatibility with the front‑end.

Returns a JSON object on success:

```json
{
  "success": true,
  "image_url": "https://...",      // URL to the generated image
  "prompt_used": "<enhanced prompt>",
  "provider": "runware" | "fal-ai/flux-pro/kontext"
}
```

If Runware fails or is misconfigured, the server will automatically attempt the fal.ai fallback if `FAL_KEY` is set. Otherwise a 502 error is returned.

### `POST /api/send-email`

Sends an email containing the generated image. Accepts a JSON body with:

- `to`: Recipient email address (required).
- `subject`: Subject line (optional).
- `message`: HTML body (optional).
- `imageUrl`: The URL of the generated image (optional if included in `message`).

If SMTP is not configured in `.env`, the endpoint returns `{ ok: true, demo: true }` without actually sending email. This ensures the demo flow remains smooth.

## Providers

- **Runware (primary)** — Uses two-step tasks (`imageUpload` then `imageInference`) via `https://api.runware.ai/v1`. The model used is `runware:101@1`. See the Runware documentation for details.
- **fal.ai / FLUX.1 Kontext [pro] (fallback)** — When configured, the server uploads the image to fal storage and calls `fal-ai/flux-pro/kontext`. See <https://fal.ai/models/fal-ai/flux-pro/kontext/api> for details.

## License

MIT