# TTS Panel
A text-to-speech panel using Cloudflare Workers, Cloudflare Pages, and Render.

## Features
- Input text and select voice to generate speech via OpenAI.fm.
- Tones are randomly selected by the backend.
- Frontend hosted on Cloudflare Pages.
- Backend (FastAPI + Playwright) hosted on Render.
- API routing via Cloudflare Workers.

## Deployment
1. Deploy Frontend to Cloudflare Pages:
   - Connect the `frontend` directory.
   - Build Command: `npm run build && npm run export`
   - Output Directory: `out`
2. Deploy Backend to Render:
   - Connect the `backend` directory.
   - Build Command: `pip install -r requirements.txt && playwright install --with-deps`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
3. Deploy Worker to Cloudflare Workers:
   - Upload `worker/worker.js`.
   - Update the Render URL in `worker.js`.
   - Update the Worker URL in `frontend/pages/api/tts.js`.

## Notes
- Update DOM selectors in `backend/automation.py` based on OpenAI.fm's HTML.
- Ensure compliance with OpenAI.fm's Terms of Service.
