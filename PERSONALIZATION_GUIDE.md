# Portfolio Personalization & Deployment Guide

> [!IMPORTANT]
> This document lists **every placeholder and mock item** in the portfolio that you need to replace with your real data before deployment. Follow each section carefully to ensure full marks on all evaluation criteria.

---

## 1. Personal Information

### File: `client/src/components/sections/Hero.jsx`
- **Line ~82**: Change `"● Available for Opportunities"` to your actual availability status
- **Line ~90-98**: Name is already "PAL PATHAK" — update if needed

### File: `client/src/components/sections/About.jsx`
- **Line ~19**: Replace the Cloudinary image URL with your own photo URL:
  ```
  src="https://res.cloudinary.com/dprcvoo9b/image/upload/v1776441789/Pokecut_1776424114577_ff45kc.jpg"
  ```
- **Line ~48-51**: Update the about paragraph with your actual description
- **Lines ~73-77**: Update checklist items to match your real skills/traits

### File: `client/src/components/sections/Contact.jsx`
- **Line ~29**: Replace `'hello@dev.com'` with your real email
- **Line ~83**: Same email displayed to users
- **Line ~93**: Update location from "Gujarat, India" if needed

---

## 2. Social Links (ALL placeholder `#` links)

> [!CAUTION]
> All social links are currently set to `#` (placeholder). You MUST update these for the evaluation.

### Files to update:

#### `client/src/components/sections/Hero.jsx` (Lines ~8-13)
```js
const socialLinks = [
  { icon: Github, href: 'https://github.com/YOUR_USERNAME', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/YOUR_USERNAME', label: 'LinkedIn' },
  { icon: Code2, href: 'https://leetcode.com/u/YOUR_USERNAME', label: 'LeetCode' },
  { icon: Twitter, href: 'https://twitter.com/YOUR_USERNAME', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@YOUR_CHANNEL', label: 'YouTube' },
];
```

#### `client/src/components/layout/Navbar.jsx` (Lines ~17-23)
```js
const socialLinks = [
    { icon: Github, href: 'https://github.com/YOUR_USERNAME', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/YOUR_USERNAME', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@YOUR_CHANNEL', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com/YOUR_USERNAME', label: 'Twitter' },
    { icon: Code2, href: 'https://leetcode.com/u/YOUR_USERNAME', label: 'LeetCode' },
    { icon: GraduationCap, href: 'https://sololearn.com/YOUR_PROFILE', label: 'SoloLearn' },
];
```

#### `client/src/components/layout/Footer.jsx` (Lines ~7-13)
```js
const socialLinks = [
  { icon: Github, href: 'https://github.com/YOUR_USERNAME', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/YOUR_USERNAME', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@YOUR_CHANNEL', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/YOUR_USERNAME', label: 'Twitter' },
  { icon: Code2, href: 'https://leetcode.com/u/YOUR_USERNAME', label: 'LeetCode' },
];
```

#### `client/src/components/sections/Stats.jsx` (Lines ~262-278)
Update the platform `href` and `username` fields:
```js
{
  title: 'GitHub',
  username: '@YOUR_USERNAME',
  href: 'https://github.com/YOUR_USERNAME',
},
{
  title: 'LeetCode',
  username: '@YOUR_USERNAME',
  href: 'https://leetcode.com/u/YOUR_USERNAME',
},
{
  title: 'LinkedIn',
  username: '/in/YOUR_USERNAME',
  href: 'https://linkedin.com/in/YOUR_USERNAME',
},
```

Also update the **mock stats** in `Stats.jsx` with your real numbers:
- GitHub: repos, stars, forks, followers, contribution count
- LeetCode: easy/medium/hard solved counts, contest rating, streak
- LinkedIn: connections, endorsements, post engagement

---

## 3. Projects Data

### File: `client/src/data/data.js`

Replace ALL `mockProjects` entries with your real projects. For each project:

```js
{
  _id: 'unique-id',
  title: 'Your Project Name',
  description: 'Brief one-line description',
  longDescription: 'Detailed multi-line description...',
  category: 'personal',          // or 'hackathon'
  subCategory: 'Full Stack',     // 'Frontend', 'Clone', 'Game', 'Full Stack'
  tags: ['React', 'Node.js'],    // Tech stack used
  thumbnail: 'URL_TO_SCREENSHOT',
  githubUrl: 'https://github.com/YOUR_USERNAME/repo-name',
  liveUrl: 'https://your-project.vercel.app',
  youtubeId: 'YOUTUBE_VIDEO_ID', // Optional — YouTube demo video ID
  featured: true                  // Whether to highlight
}
```

> [!IMPORTANT]
> **Per the requirements:**
> - Each project MUST have GitHub link, live link, and YouTube demo
> - Full-stack projects MUST include Postman API documentation link
> - Projects should be categorized: Games, Clones, Full Stack, Frontend

---

## 4. Hackathon Data

### File: `client/src/data/data.js`

Replace `mockHackathons` with your real hackathon entries. Each needs:
- `name`, `date`, `outcome` (Winner/Finalist/etc.)
- `techStack` array
- `problemStatement` and `solution` (brief)
- `longSolution` (detailed description)
- `highlights` array with key metrics/achievements
- `images` array (5-6 images of your hackathon — team photos, slides, demo screenshots)
- `repoUrl` and `demoUrl`

---

## 5. Certificates Data

### File: `client/src/data/data.js`

Replace `mockCertificates` with your real certifications:
```js
{
  _id: 'unique-id',
  title: 'Certificate Title',
  issuer: 'Issuing Organization',
  issueDate: 'Month Year',
  category: 'educational',    // or 'hackathon'
  imageUrl: 'URL_TO_CERTIFICATE_IMAGE',
  description: 'Brief description of what this certifies'
}
```

> [!IMPORTANT]
> Certificates must include proper description and valid proof (image). No fake content.

---

## 6. Education Data

### File: `client/src/data/data.js`

Replace `mockEducation`:
```js
{
  _id: 'e1',
  institution: 'Your University Name',
  degree: 'Your Degree',
  field: 'Your Field of Study',
  startYear: '2021',
  endYear: '2025',
  grade: 'Your GPA/Grade'
}
```

---

## 7. Achievements Data

### File: `client/src/data/data.js`

Replace `mockAchievements`:
```js
{
  _id: 'a1',
  title: 'Achievement Title',
  description: 'What you achieved',
  date: '2024',
  icon: 'Award'   // Lucide icon name
}
```

---

## 8. Resume Setup

> [!WARNING]
> The Resume button in the navbar currently opens a modal. You need to add your actual resume PDF.

### Steps:
1. Place your resume PDF in `client/public/resume.pdf`
2. In `App.jsx`, create or update the ResumeModal component to display the PDF using an embed or iframe viewer — **NOT auto-download**
3. Example viewer:
   ```jsx
   <iframe src="/resume.pdf" className="w-full h-full" />
   ```

---

## 9. Contact Form (EmailJS)

> [!IMPORTANT]
> The contact form currently uses a mock `setTimeout` — you MUST integrate EmailJS for the real form.

### Steps:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and template
3. Install: `npm install @emailjs/browser` (already in package.json)
4. Update `Contact.jsx` `handleSubmit`:

```js
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('loading');
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (err) {
    console.error(err);
    setStatus('error');
    setTimeout(() => setStatus('idle'), 3000);
  }
};
```

---

## 10. Figma Designs

### File: `client/src/components/sections/Figma.jsx`

Update `mockFigma` array with your real Figma designs:
```js
const mockFigma = [
  { id: 1, title: 'Your Design Name', image: 'URL_TO_PREVIEW', link: 'https://figma.com/file/...' },
  // Add more...
];
```

---

## 11. SEO & Deployment

### A. Update Domain Info

#### `client/index.html`
- Line 6: Update `<title>` with your name
- Line 7: Update `<meta description>` 
- Line 14: Update `og:url` to your domain
- Line 15-17: Update Open Graph title, description, image
- Line 20-24: Update Twitter card info
- Line 26: Update `canonical` URL
- Add a favicon: place `favicon.ico` in `client/public/`

#### `client/public/robots.txt`
- Update `Sitemap:` URL to your actual domain

#### `client/public/sitemap.xml`
- Replace all `pal-pathak.dev` with your actual domain

### B. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain as a property
3. Verify ownership (DNS or HTML file method)
4. Submit your sitemap URL: `https://your-domain.com/sitemap.xml`
5. Reference: https://github.com/codinggita/CGxSU_Semester_1/tree/main/react(sem_02)/07.SEO

### C. Deployment

#### Option 1: Vercel (Recommended for Frontend)
```bash
npm install -g vercel
cd client
vercel --prod
```

#### Option 2: Netlify
```bash
cd client
npm run build
# Upload the `dist` folder to Netlify
```

#### Option 3: GitHub Pages
```bash
npm run build
# Deploy the `dist` folder
```

> [!TIP]
> Your domain name MUST include your own name (e.g., `pal-pathak.dev`, `palpathak.com`, etc.)

---

## 12. Final Checklist Before Submission

- [ ] Portfolio is deployed and accessible via URL
- [ ] Domain includes your name
- [ ] Profile photo visible in Hero & About sections
- [ ] All social links (GitHub, LinkedIn, LeetCode, Twitter, YouTube) are working
- [ ] All projects have GitHub links, live demos, and YouTube videos
- [ ] Full-stack projects have Postman API documentation
- [ ] Figma designs have real links and preview images
- [ ] All certificates have proper images and descriptions
- [ ] Hackathon entries have supporting materials (repo, demo, images)
- [ ] Resume is viewable (NOT auto-downloaded)
- [ ] Contact form sends real emails (EmailJS)
- [ ] `robots.txt` exists with correct domain
- [ ] `sitemap.xml` exists with correct domain
- [ ] Website submitted to Google Search Console
- [ ] All navigation links work correctly
- [ ] Theme toggle (light/dark) works
- [ ] Site is fully responsive on mobile
- [ ] No console errors in browser
- [ ] All achievements are real (no fake content)

---

## Quick Find: All Files You Need to Edit

| File | What to Change |
|------|---------------|
| `client/src/data/data.js` | Projects, Skills, Certificates, Hackathons, Achievements, Education |
| `client/src/components/sections/Hero.jsx` | Social links, name |
| `client/src/components/sections/About.jsx` | Photo URL, description, checklist |
| `client/src/components/sections/Contact.jsx` | Email, location, EmailJS integration |
| `client/src/components/sections/Stats.jsx` | Social usernames, URLs, platform stats |
| `client/src/components/sections/Figma.jsx` | Figma design links and previews |
| `client/src/components/layout/Navbar.jsx` | Social links in mobile menu |
| `client/src/components/layout/Footer.jsx` | Social links, copyright info |
| `client/index.html` | SEO meta tags, title, favicon |
| `client/public/robots.txt` | Domain URL |
| `client/public/sitemap.xml` | Domain URL |
| `client/public/resume.pdf` | Your actual resume PDF |
