# Architecture Decision Log

## ADL-001: Supabase for Database

**Date**: 2026-09-01  
**Status**: Accepted  

### Decision
Use Supabase (PostgreSQL) for storing daily prompt results.

### Rationale
- Provides managed PostgreSQL with good free tier
- Built-in authentication and RLS
- Real-time subscriptions for future features
- Easy integration with Next.js via @supabase/supabase-js

### Alternatives Considered
- Firebase Firestore: More expensive at scale, less control
- MongoDB Atlas: Good but overkill for simple schema
- Local JSON file: Not scalable

---

## ADL-002: Next.js for Frontend

**Date**: 2026-09-01  
**Status**: Accepted  

### Decision
Use Next.js 14 with App Router for the portal frontend.

### Rationale
- Server-side rendering for better performance
- API routes for backend functionality if needed
- Built-in optimizations (images, fonts, code splitting)
- Great developer experience
- Easy deployment to Vercel

### Alternatives Considered
- React SPA: Would require separate backend
- Vue/Nuxt: Personal preference for Next.js
- Static HTML: Not flexible for data updates

---

## ADL-003: GitHub Copilot for Automation

**Date**: 2026-09-01  
**Status**: Accepted  

### Decision
Use GitHub Copilot scheduled automation for daily prompt generation.

### Rationale
- Integrated with GitHub (no additional services)
- Uses Copilot's LLM for generation
- Easy scheduling and monitoring
- Cost-effective

### Alternatives Considered
- GitHub Actions with external LLM API: More setup, additional costs
- AWS Lambda + EventBridge: Overkill for this use case
- Cron job on VPS: Manual management needed

---

## ADL-004: Tailwind CSS for Styling

**Date**: 2026-09-01  
**Status**: Accepted  

### Decision
Use Tailwind CSS for styling the frontend.

### Rationale
- Utility-first approach speeds up development
- Small bundle size with purging
- Highly customizable
- Great for responsive design

---

## ADL-005: TypeScript

**Date**: 2026-09-01  
**Status**: Accepted  

### Decision
Use TypeScript for type safety across the project.

### Rationale
- Catches errors at compile time
- Better IDE support and autocomplete
- Improves code maintainability
- Easier refactoring

---

## Future Considerations

- [ ] Add email notifications for new prompts
- [ ] Implement user authentication for personalization
- [ ] Add prompt analytics/engagement tracking
- [ ] Create mobile app version
- [ ] Support multiple prompt categories/themes
