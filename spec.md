# Raushan Kumar – Cyberpunk Portfolio

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page portfolio for Raushan Kumar (raushankumarhacker)
- Hero section with animated typing effect cycling through roles: "Cybersecurity Specialist", "Ethical Hacker", "SEO Strategist"
- CTA buttons: View Projects, Download Resume, Contact Me
- About section with professional summary, skill progress bars
- Skills section divided into 4 categories: Cybersecurity, SEO & Digital Marketing, Technical Skills, Tools — shown as glowing cards
- Experience section with timeline layout:
  - India IVF – SEO Executive (July 2025 – Oct 2025)
  - Security vulnerability reporting experience
- Projects section with cards showing: title, description, tech stack, GitHub link, live demo link
  - Sample cybersecurity projects (SQL injection scanner, XSS detector, CTF writeups)
  - Sample SEO projects (audit tool, keyword tracker)
- Certifications & Achievements section with badge-style cards
- Contact section with email form (stored to backend), LinkedIn/GitHub buttons, location India, CTA tagline
- Sticky navbar with smooth scroll to sections
- Footer with social icons
- Hacker-style loading screen on initial visit
- Terminal-style command section (interactive terminal that shows fake hacker commands)
- Animated cursor (custom glowing cursor)
- Scroll reveal animations on all sections
- Animated particle/matrix-style background on hero
- Cyber grid background overlay

### Modify
Nothing — new project.

### Remove
Nothing — new project.

## Implementation Plan
1. Select no additional Caffeine components (contact form messages stored in backend)
2. Generate Motoko backend with: contact message submission and retrieval
3. Generate frontend:
   - Cyberpunk/glassmorphism dark theme with neon blue + electric purple
   - Framer Motion for scroll reveal animations and page transitions
   - Custom animated typing effect for hero subheading
   - Matrix/particle canvas background on hero
   - Loading screen with hacker boot sequence
   - Sticky navbar with active section highlighting
   - All 7 sections as described
   - Responsive layout (mobile-first)
   - Custom glowing cursor
   - Footer with GitHub and LinkedIn links
