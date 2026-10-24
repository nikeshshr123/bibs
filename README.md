# A little question for you ♡

A responsive romantic invitation, built with plain HTML, CSS, and JavaScript.

- A playful No button that moves on hover or tap.
- A Yes celebration and a soulmate initial game.
- B (including lowercase b or a name starting with B) always reveals N; other letters produce a random A–Z initial.
- An animated moon and a romantic quote featuring the revealed initial.
- Keyboard focus, input validation, mobile layouts, and reduced-motion support.

The game is for fun. Responses stay in the browser; it does not send notifications or collect answers. Google Fonts is optional; system fonts work offline.

## Preview locally

Open `dist/index.html` in a browser, or serve the `dist` directory with any static HTTP server.

## Deploy on Render

1. Sign in at https://dashboard.render.com/.
2. Choose **New → Static Site**.
3. Connect your GitHub account and select **nikeshshr123/bibs**.
4. Select the **main** branch. Leave **Root Directory** blank.
5. Set **Build Command** to `echo Ready to serve`.
6. Set **Publish Directory** to `dist`.
7. Click **Create Static Site**. After deployment, open and share its `onrender.com` address.

Alternatively, create a Render Blueprint from this repository to use `render.yaml`.

Render's deployed static site is publicly reachable. Deploy when you are ready to share it; a private GitHub repository does not make the Render website private.

Official instructions: https://render.com/docs/static-sites

## Customize

Edit the invitation in `dist/index.html`, colors/layout in `dist/styles.css`, and the initial mapping or romantic quote in `dist/app.js`.
