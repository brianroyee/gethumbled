# 🔑 API Keys Setup - Quick Reference

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Groq API Key (for AI roasting)
# Get from: https://console.groq.com/keys
GROQ_API_KEY=gsk_your_groq_api_key_here

# RapidAPI Key (for LinkedIn scraping)
# Get from: https://rapidapi.com/rockapis-rockapis-default/api/linkedin-profile-data
# Subscribe to "Basic" plan (FREE - 100 requests/month)
RAPIDAPI_KEY=your_rapidapi_key_here
```

---

## Quick Links

**Groq API:**
- Console: https://console.groq.com/keys
- Free tier: Unlimited requests
- Model: llama-3.3-70b-versatile

**RapidAPI:**
- API Page: https://rapidapi.com/rockapis-rockapis-default/api/linkedin-profile-data
- Dashboard: https://rapidapi.com/developer/dashboard
- Free tier: 100 requests/month

---

## Setup Steps

1. Get Groq API key → Add to `.env.local`
2. Get RapidAPI key → Add to `.env.local`
3. Restart dev server: `npm run dev`
4. Test at: http://localhost:3000

---

## ✅ Checklist

- [ ] Created `.env.local` file
- [ ] Added `GROQ_API_KEY`
- [ ] Added `RAPIDAPI_KEY`
- [ ] Restarted dev server
- [ ] Tested with a LinkedIn URL

---

**After setup, the app will work reliably! 🔥**
