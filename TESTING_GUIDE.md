# 🧪 Vision Pro Portfolio - Testing Guide

## Quick Test Commands

### Start Development Servers
```bash
# Terminal 1 - Backend (port 5002)
cd /Users/aryantiwari/Documents/portfolio/mern-portfolio/server
npm run dev

# Terminal 2 - Frontend (port 5175)
cd /Users/aryantiwari/Documents/portfolio/mern-portfolio/client
npm run dev
```

### Build for Production
```bash
cd /Users/aryantiwari/Documents/portfolio/mern-portfolio/client
npm run build
```

---

## 🎯 What to Test

### 1. Vision Pro Dock
**Location**: Fixed at bottom center of every page

**Test on Desktop**:
- ✅ Hover over icons → magnetic scale effect
- ✅ Active icon has glowing ring
- ✅ Labels always visible below icons
- ✅ Scroll down → dock shrinks and fades
- ✅ Scroll up → dock expands and brightens
- ✅ Click any icon → navigates to correct page
- ✅ Mouse moves near dock → icons respond with parallax

**Test on Mobile**:
- ✅ Tap icon → ripple effect
- ✅ Labels visible (10px text)
- ✅ Icons smaller (22-32px)
- ✅ Dock height 70px
- ✅ Tilt device → dock has 3D rotation (if gyroscope available)
- ✅ Bottom padding → no content hidden
- ✅ Safe area → doesn't overlap iPhone notch

### 2. Navigation
**Routes to Test**:
```
/ → Landing Page (unified scroll)
/about → About Page
/projects → Projects Page
/stats → Stats Page (NEW - combined GitHub + LeetCode)
/contact → Contact Page
/github → Auto-redirects to /stats
/leetcode → Auto-redirects to /stats
```

**Navbar**:
- ✅ Links updated: Home, About, Projects, **Stats**, Contact
- ✅ No more separate GitHub/LeetCode links
- ✅ Active indicator moves with navigation

### 3. Vision Pro Typography
**Check all page headers**:
- ✅ Landing: "Full Stack Developer" (text-[110px])
- ✅ About: "About Me" (text-[60-110px])
- ✅ Projects: "Featured Work" (text-[60-110px])
- ✅ Stats: "Dev Stats" (text-[60-110px])
- ✅ Contact: "Let's Connect" (text-[60-110px])

**Typography Features**:
- ✅ Gradient text (white → white/70 → white/40)
- ✅ Soft glow behind text (80px blur)
- ✅ Responsive: 60px → 80px → 110px
- ✅ Aqua shadow effect

### 4. Stats Page (NEW)
**URL**: http://localhost:5175/stats

**Test Features**:
- ✅ GitHub section at top
- ✅ GitHub username input
- ✅ GitHub calendar displays
- ✅ GitHub profile stats (repos, followers, following)
- ✅ LeetCode section below
- ✅ LeetCode username input
- ✅ LeetCode overview (total solved, ranking)
- ✅ LeetCode radial chart
- ✅ Difficulty breakdown (Easy, Medium, Hard)
- ✅ All cards have glassmorphism
- ✅ Hover effects work

### 5. Background Effects
**Should appear on ALL pages**:
- ✅ Aurora background (4 blobs, 28-40s cycles)
- ✅ Gradient clouds (4 blobs, 45-55s drift)
- ✅ Floating tech icons (15 icons, 3D tilt)
- ✅ Spotlight cursor (follows mouse)
- ✅ Grid overlay (subtle, 10% opacity)

### 6. Glassmorphism
**Check all cards/panels**:
- ✅ Background: `bg-white/5`
- ✅ Blur: `backdrop-blur-xl`
- ✅ Border: `border-white/10`
- ✅ Rounded: `rounded-3xl`
- ✅ Shadow: `shadow-2xl`
- ✅ Hover: `scale-1.01`

### 7. Animations
**Scroll Animations**:
- ✅ Headers have parallax (move up as you scroll)
- ✅ Cards fade in on scroll (`whileInView`)
- ✅ Animations only trigger once
- ✅ No janky performance

**Hover Animations**:
- ✅ Cards lift up (y: -6 to -8)
- ✅ Cards scale slightly (1.01-1.02)
- ✅ Smooth spring transitions
- ✅ Icons rotate/shift on hover

### 8. Mobile Responsiveness
**Test at breakpoints**:
```
Mobile: 375px, 414px (iPhone)
Tablet: 768px, 834px (iPad)
Desktop: 1024px, 1440px, 1920px
```

**Check**:
- ✅ Typography scales down properly
- ✅ Dock adapts to screen size
- ✅ Cards stack vertically on mobile
- ✅ No horizontal scroll
- ✅ Touch targets ≥44px
- ✅ Safe area padding on iPhone
- ✅ Bottom padding prevents dock overlap

---

## 🐛 Common Issues & Fixes

### Issue: Dock not visible
**Fix**: Check z-index hierarchy, dock should be z-50

### Issue: Content hidden behind dock
**Fix**: Add `pb-40` class to section, or use spacer div

### Issue: Gyroscope not working
**Fix**: Only works on HTTPS or mobile devices with sensors

### Issue: Stats page shows errors
**Fix**: Ensure backend is running on port 5002

### Issue: Typography too large on mobile
**Fix**: Check responsive classes `text-[60px] sm:text-[80px] md:text-[110px]`

### Issue: Animations laggy
**Fix**: Reduce `useSpring` stiffness or add `will-change` CSS

---

## 📊 Performance Metrics to Check

### Lighthouse Scores (Target)
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### Load Times (Target)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Total Bundle Size: <500KB gzipped

### Animation FPS (Target)
- Scroll animations: 60fps
- Hover effects: 60fps
- Dock interactions: 60fps

---

## 🎨 Visual Checklist

### Design Consistency
- [ ] All pages have same background effects
- [ ] All headers use Vision Pro typography
- [ ] All cards have glassmorphism
- [ ] All animations use spring physics
- [ ] Color palette matches (aqua, purple, pink)
- [ ] Spacing is consistent
- [ ] Hover states are uniform

### Brand Identity
- [ ] Logo visible in navbar
- [ ] Colors match theme (#6EE7FF, #C084FC, #F472B6)
- [ ] Typography is consistent
- [ ] Icons are recognizable
- [ ] Overall feel is "Apple Vision Pro"

---

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Check all routes work
- [ ] Verify API endpoints
- [ ] Test on multiple devices
- [ ] Check browser compatibility
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN for assets
- [ ] Configure environment variables

---

## 📱 Device Testing Matrix

| Device | Browser | Dock | Typography | Animations |
|--------|---------|------|------------|------------|
| iPhone 14 Pro | Safari | ✅ | ✅ | ✅ |
| iPhone SE | Safari | ✅ | ✅ | ✅ |
| iPad Pro | Safari | ✅ | ✅ | ✅ |
| MacBook Pro | Chrome | ✅ | ✅ | ✅ |
| MacBook Pro | Safari | ✅ | ✅ | ✅ |
| Windows PC | Chrome | ✅ | ✅ | ✅ |
| Windows PC | Edge | ✅ | ✅ | ✅ |

---

## 🎯 User Experience Flow

### First Visit
1. Land on homepage → See hero with aurora background
2. Scroll down → See about, projects, stats, contact sections
3. Notice dock at bottom → Always accessible
4. Click dock icon → Navigate to page
5. Hover dock (desktop) → See magnetic effect
6. Explore each page → Consistent Vision Pro theme

### Navigation Journey
```
Home → Scroll → Sections → Dock Click → About
About → Dock Click → Projects → View Projects
Projects → Dock Click → Stats → See GitHub + LeetCode
Stats → Dock Click → Contact → Send Message
Contact → Dock Click → Home → Loop Complete
```

### Mobile Experience
1. Tap dock icon → Ripple animation
2. Navigate → Smooth page transition
3. Scroll → Dock shrinks out of way
4. Tilt device → Dock has 3D depth
5. Bottom content → Never hidden by dock

---

## ✅ Sign-Off Criteria

**Before marking as complete**:
- ✅ All 5 dock icons working
- ✅ Stats page loads both services
- ✅ All pages have Vision Pro headers
- ✅ Dock responds to scroll
- ✅ Mobile optimizations working
- ✅ No console errors
- ✅ No compilation errors
- ✅ Lighthouse scores acceptable
- ✅ Works on iOS Safari
- ✅ Works on Chrome/Firefox/Edge
- ✅ Responsive at all breakpoints
- ✅ Animations smooth (60fps)

**Final Test**: 
Navigate through entire site using ONLY the dock → Everything should work perfectly!

---

## 🎊 Success Indicators

You'll know it's working when:
1. 🎯 Dock appears on every page
2. 🧲 Icons magnify when you hover
3. ✨ Active section glows with aqua ring
4. 📱 Works flawlessly on mobile
5. 🎨 All pages look like Vision Pro
6. 🚀 No jank, pure 60fps smoothness
7. 💎 Glassmorphism everywhere
8. 🌈 Aurora + clouds + spotlight
9. 📊 Stats page shows both services
10. 😍 You feel like you're using visionOS

**If all 10 ✅ → SHIP IT! 🚢**
