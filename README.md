# 🚀 ResumeMind AI

> AI-Powered Resume Analyzer Platform with ATS Scoring, Company Matching, Skill Intelligence & One-Page Resume Builder

---

## 🌟 Overview

**ResumeMind AI** is a modern AI-powered resume analysis platform designed to help students, freshers, and job seekers optimize their resumes for ATS systems and company-specific roles.

The platform analyzes uploaded PDF resumes using AI and provides detailed insights such as ATS score, company match score, missing skills, hiring probability, strengths, weaknesses, and improvement suggestions.

ResumeMind AI also helps users create a cleaner **one-page ATS-friendly resume** by asking for confirmed skills, projects, achievements, education, and role-specific details.

Built with a premium SaaS-style interface, ResumeMind AI delivers a professional and interactive user experience.

---

## ✨ Features

### 🔐 Authentication System

- Email and password authentication
- Google sign-in using Firebase
- Persistent login sessions
- Protected dashboard and service routes
- Users must login before accessing main platform features

---

### 📄 AI Resume Analyzer

Upload resumes in PDF format and get:

- ATS resume score
- Company compatibility score
- Combined score
- Hiring probability
- Project strength score
- Overall resume readiness level
- Resume summary
- AI improvement suggestions
- Resume strengths and weaknesses
- Missing skills and matched skills

---

### 📊 Dynamic Skill Analytics

Interactive analytics are generated based on:

- Uploaded resume skills
- Job description keywords
- Selected company
- Selected role

Charts include:

- Skill match bar graphs
- Skill category strength
- Missing skills analysis
- Detected skills overview

---

### 🏢 Company-Based Matching

ResumeMind AI supports role-based analysis for multiple companies including:

- Google
- Microsoft
- Amazon
- OpenAI
- Meta
- Netflix
- Apple
- Adobe
- NVIDIA
- Infosys
- TCS
- Accenture
- Deloitte
- Uber
- Spotify
- Swiggy
- Flipkart
- And more

---

### 💼 Supported Roles

- AI Engineer
- ML Engineer
- Data Scientist
- Full Stack Developer
- Frontend Developer
- Backend Developer
- DevOps Engineer
- Cloud Engineer
- Cyber Security Analyst
- Software Engineer
- Product Manager
- UI/UX Designer
- Blockchain Developer

---

### 🧾 AI Resume Rebuilder

After resume analysis, users can generate an improved resume by answering structured questions about:

- Skills
- Projects
- Education
- Certifications
- Achievements
- Experience
- Target role
- Target company

The generated resume is based only on confirmed user information and avoids fake skills or fake achievements.

---

### 📥 One-Page Resume Download

ResumeMind AI supports downloading optimized resumes in clean professional templates.

The generated resume follows company resume rules:

- Single-page resume format
- ATS-friendly structure
- Clean professional layout
- No tables
- No images
- No icons
- No progress bars
- Clear section headings
- Role-specific keywords
- Short impact-focused bullet points

---

## 🧩 Resume Creation Rules

ResumeMind AI follows standard resume rules used for company applications.

### For Students and Freshers

- Resume should preferably be one page
- Use only real skills and real project experience
- Add 2–3 strong projects
- Keep bullet points short and impact-focused
- Add measurable achievements where possible
- Avoid unnecessary personal details
- Avoid fake internships or fake work experience

### ATS-Friendly Rules

The resume avoids:

- Complex tables
- Heavy graphics
- Images
- Icons
- Text boxes
- Unreadable fonts
- Over-designed layouts

The resume uses:

- Standard headings
- Clean formatting
- Simple bullet points
- Readable font size
- Role-specific keywords
- Proper spacing and margins

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React |
| Backend | Node.js, Express.js |
| Authentication | Firebase Authentication |
| AI Engine | Gemini AI |
| Charts | Recharts |
| File Upload | React Dropzone, Multer |
| Resume Parsing | PDF-Parse |
| Styling | Custom CSS, Glassmorphism UI |
| Deployment | Vercel + Render |

---

## 📁 Project Structure

```txt
AI-platform/
│
├── client/
│   ├── app/
│   │   ├── analyzer/
│   │   ├── company-match/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── profile/
│   │   ├── signup/
│   │   ├── template/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── ATSCard.jsx
│   │   ├── AuthGuard.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── Navbar.jsx
│   │   ├── OptimizedResumePreview.jsx
│   │   ├── ResumeBuilderWizard.jsx
│   │   ├── SkillChart.jsx
│   │   └── UploadBox.jsx
│   │
│   ├── data/
│   │   └── companyRoles.js
│   │
│   ├── lib/
│   │   ├── api.js
│   │   └── firebase.js
│   │
│   └── package.json
│
├── server/
│   ├── data/
│   │   └── skills.js
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   └── resumeBuilderService.js
│   │
│   ├── utils/
│   │   ├── scoreCalculator.js
│   │   └── skillExtractor.js
│   │
│   ├── uploads/
│   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore
