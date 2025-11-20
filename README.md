# GetHumbled 🔥

**Brutally honest AI feedback for LinkedIn profiles**

GetHumbled is a web application that roasts LinkedIn profiles using AI, giving users the harsh reality check they need to stand out in a sea of corporate buzzwords and generic achievements.

## What It Does

GetHumbled analyzes LinkedIn profile text and delivers savage, recruiter-perspective feedback that cuts through the noise. Think of it as your brutally honest friend who actually tells you what's wrong with your profile - except it's an AI trained to think like a ruthless recruiter.

### Key Features

- **AI-Powered Roasting**: Uses Groq's LLaMA 3.3 70B model with a custom "ruthless recruiter" persona to analyze profiles
- **Screenshot Upload**: Mobile-friendly OCR using Tesseract.js - just snap a screenshot of your LinkedIn profile instead of copy-pasting
- **Instant Feedback**: Get roasted in seconds with actionable insights on what needs fixing
- **Wall of Shame**: Public feedback board where brave souls share their reactions
- **Educational Content**: Learn why the "About" section is critical and how to optimize it
- **Feedback Moderation**: Admin controls to manage and rank user testimonials

## How It Works

### 1. Input

Users can provide their LinkedIn profile in two ways:

- **Paste text**: Traditional copy-paste from LinkedIn
- **Upload screenshot**: Snap a photo on mobile, upload it, and OCR extracts the text automatically

### 2. AI Analysis

The profile text is sent to Groq's API with a carefully crafted system prompt that instructs the AI to:

- Think like a senior recruiter who's seen thousands of profiles
- Identify buzzwords, vague claims, and red flags
- Deliver feedback in a sarcastic, brutalist tone
- Focus on the "About" section as the most critical element

### 3. Results Display

The roast is displayed in a Bento Grid layout with:

- **Main roast**: The brutal feedback
- **Key issues**: Specific problems identified
- **Action items**: What to fix first
- **Educational link**: Why the About section matters

### 4. Feedback Loop

After getting roasted, users can:

- Submit their reaction to the "Wall of Shame"
- Share their results
- Learn from educational content

## Tech Stack

- **Frontend**: Next.js 16 with React, TypeScript, and Tailwind CSS
- **AI**: Groq API (LLaMA 3.3 70B Versatile model)
- **OCR**: Tesseract.js for client-side image-to-text conversion
- **Database**: Vercel KV (Redis) for persistent data storage
- **Deployment**: Vercel with automatic GitHub integration

## Architecture

### Rate Limiting

- 2 requests per minute per IP address
- Prevents API abuse and manages costs

### Security

- Prompt injection protection with input sanitization
- Admin dashboard protected by password authentication
- Server-side validation for all user inputs

### Data Storage

All data is stored in Vercel KV (Redis):

- **Funding amount**: Tracks donations for API costs
- **Visitor count**: Analytics for homepage traffic
- **Feedback list**: User testimonials with ranking system

### Admin Features

The admin dashboard (`/admin`) provides:

- Funding progress tracking
- Visitor analytics
- Feedback moderation (delete inappropriate content)
- Ranking system to feature the best testimonials

## Design Philosophy

**Brutalist Aesthetic**: The entire UI embraces a dark, brutalist design with:

- High contrast (black background, red accents)
- Monospace fonts
- Strong borders and geometric layouts
- Micro-animations for engagement
- No-nonsense, direct messaging

This design choice reinforces the product's core value: brutal honesty without sugar-coating.

## Why It Exists

Most LinkedIn profiles are filled with:

- Generic buzzwords ("passionate," "results-driven," "team player")
- Vague achievements without metrics
- Copy-pasted job descriptions
- Weak or missing "About" sections

Recruiters spend an average of 6 seconds scanning a profile. If yours doesn't immediately stand out, you're invisible.

GetHumbled exists to give people the wake-up call they need - before it costs them opportunities.

---

**Live Demo**: [https://gethumbled-three.vercel.app/](https://gethumbled-three.vercel.app/) _(replace with your actual URL)_

**Built by**: Brian Roy  
**License**: MIT
