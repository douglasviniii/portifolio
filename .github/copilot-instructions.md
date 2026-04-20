# Douglas Vini Portfolio - Project Setup

## Project Overview
A modern, exclusive portfolio website showcasing fullstack and mobile development projects. Built with React, Vite, TypeScript, TailwindCSS, and Framer Motion with a dark theme and neon accents.

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (blazing fast)
- **Styling**: TailwindCSS with custom neon theme
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Package Manager**: npm

## Project Structure
```
src/
├── components/
│   ├── Navigation.tsx      # Header with mobile menu
│   ├── Hero.tsx            # Main hero section
│   ├── Projects.tsx        # Project showcase
│   ├── About.tsx           # About & stats
│   ├── Skills.tsx          # Technical skills
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
├── App.tsx                 # Main app
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Opens at http://localhost:5173

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Customization Guide

### Update Project Data
Edit `src/components/Projects.tsx` - modify the `projects` array with your own projects

### Update Contact Information
Edit `src/components/Contact.tsx` - update email, GitHub links, and contact methods

### Update About Section
Edit `src/components/About.tsx` - personalize the bio and stats

### Modify Color Scheme
Edit `tailwind.config.ts` - customize neon colors:
- neon-pink: #FF006E
- neon-cyan: #00D9FF
- neon-purple: #B537F2
- neon-lime: #39FF14

## Features
✅ Modern dark UI with neon accents
✅ Smooth animations and transitions
✅ Fully responsive design
✅ Featured projects showcase
✅ Contact form integration
✅ Performance optimized with Vite
✅ TypeScript for type safety

## Development Notes
- Components use Framer Motion for animations
- Mobile-first responsive design
- Glass-morphism UI elements
- Custom CSS animations for unique effects
- Tailwind utility classes for styling

## Deployment
Ready to deploy to Vercel, Netlify, or any static hosting:
```bash
npm run build
# Deploy the dist/ folder
```

## Next Steps
1. Update all project information
2. Replace placeholder images with real screenshots
3. Update contact email and social links
4. Deploy to production
5. Add your own custom domain
