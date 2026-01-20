# Jatin Mishra Portfolio

A high-impact, professional portfolio website for a Senior Backend Engineer & Entrepreneur.

## Technical Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Designed for deployment via GitHub Pages (`github.io`)

## Key Features
- **Art Direction**: Professional "Dark Future" aesthetic with glassmorphism and grain textures.
- **Engagement Models**: Clear sections for Contract, Mentorship, Full-time, and Advisory roles.
- **System Metrics**: Visual representation of technical impact (latency reduction, SKU migration).
- **Contact Integration**: Direct WhatsApp, Email, and Topmate booking.

## Deployment to GitHub Pages
To deploy this as a static site:
1. Run `npm run build`
2. The static files will be generated in `dist/public`
3. Copy the contents of `dist/public` to your GitHub Pages repository.
4. Ensure your repository is named `username.github.io` or configured for project pages.

## Customization
- **Profile Image**: Replace the image in `attached_assets/` and update the import in `client/src/pages/home.tsx`.
- **Content**: Most text and links are managed in `client/src/pages/home.tsx` within the `LINKS` and `CONTACT` constants.
- **Design System**: Colors and typography are defined in `client/src/index.css` using CSS variables.
