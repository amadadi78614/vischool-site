# Valencia Islamic School website (vischool.co.za)

Next.js 16 + Tailwind CSS 4. Builds to a static site in `out/` that runs on Netlify or Vercel.

## Edit content
All school details, curriculum, FAQ and worksheets live in `lib/site.ts`.
- Admissions year: `SITE.admissionsYear`
- Add a worksheet: add an entry to `WORKSHEETS`

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Build
    npm run build      # outputs static site to out/

## Deploy (current host: Netlify, team "Valencia Islamic School", project vischool.co.za)
Quick: Netlify > project vischool.co.za > Deploys > drag the `out` folder onto the drop zone.
Better: push this repo to GitHub (amadadi78614/vischool-site), then in Netlify link the repo
(build command `npm run build`, publish directory `out`) so every push deploys automatically.
