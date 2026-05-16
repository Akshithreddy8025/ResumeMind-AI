# 🚀 ResumeMind AI

> AI-Powered Resume Analyzer Platform with ATS Scoring, Company Matching, Skill Intelligence & One-Page Resume Builder

---

## 🌟 Overview

**ResumeMind AI** is a modern AI-powered resume analysis platform designed to help students, freshers, and job seekers optimize their resumes for ATS systems and company-specific roles.

The platform analyzes uploaded PDF resumes using AI and provides detailed insights such as ATS score, company match score, missing skills, hiring probability, strengths, weaknesses, and improvement suggestions.

ResumeMind AI also helps users create a cleaner **one-page ATS-friendly resume** by asking for confirmed skills, projects, achievements, education, certifications, experience, and role-specific details.

Built with a premium SaaS-style interface, ResumeMind AI delivers a professional and interactive user experience.

---

## 🌐 Live Links

### Frontend

```txt
https://resume-mind-ai-plum.vercel.app
```

### Backend

```txt
https://resumemind-ai.onrender.com
```

### Backend Health Check

```txt
https://resumemind-ai.onrender.com/api/health
```

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
- Combined resume score
- Hiring probability
- Project strength score
- Overall resume readiness level
- AI-generated resume summary
- ATS score explanation
- Company match explanation
- AI improvement suggestions
- Resume strengths and weaknesses
- Missing skills and matched skills
- Extra resume skills

---

### 📊 Dynamic Skill Analytics

Interactive analytics are generated based on:

- Uploaded resume skills
- Job description keywords
- Selected company
- Selected role

Charts include:

- Skill match bar graphs
- Skill category strength analysis
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
- Job description requirements

The generated resume is based only on confirmed user information and avoids fake skills, fake achievements, and unsupported claims.

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
- Proper A4 print ratio

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
- Highlight role-relevant technical skills

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
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
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
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Akshithreddy8025/ResumeMind-AI.git
```

```bash
cd ResumeMind-AI
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

### 3️⃣ Backend Setup

Open another terminal:

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 🔑 Environment Variables

### Client Environment Variables

Create:

```txt
client/.env.local
```

For local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For Vercel deployment:

```env
NEXT_PUBLIC_API_URL=https://resumemind-ai.onrender.com
```

---

### Server Environment Variables

Create:

```txt
server/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

---

## 🔥 Firebase Configuration

Firebase Authentication is used for login and signup.

Enable these sign-in providers:

- Email/Password
- Google

Add authorized domains:

```txt
localhost
resume-mind-ai-plum.vercel.app
```

If your deployed domain changes, add the new domain in Firebase Authorized Domains.

---

## 🚀 Deployment

### Frontend Deployment

Frontend is deployed using Vercel.

Vercel environment variable:

```env
NEXT_PUBLIC_API_URL=https://resumemind-ai.onrender.com
```

Frontend live URL:

```txt
https://resume-mind-ai-plum.vercel.app
```

---

### Backend Deployment

Backend is deployed using Render.

Backend live URL:

```txt
https://resumemind-ai.onrender.com
```

Health check:

```txt
https://resumemind-ai.onrender.com/api/health
```

Render environment variable:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Backend CORS should allow:

```txt
https://resume-mind-ai-plum.vercel.app
```

---

## 📡 API Endpoints

### Health Check

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "Backend health check passed"
}
```

---

### Analyze Resume

```http
POST /api/analyze
```

Form data:

```txt
resume: PDF file
company: selected company
role: selected role
jobDescription: pasted job description
```

Response:

```json
{
  "success": true,
  "analysis": {
    "atsScore": 73,
    "companyMatch": 72,
    "combinedScore": 65,
    "hiringProbability": "Medium"
  }
}
```

---

### Generate Optimized Resume

```http
POST /api/resume/generate-optimized
```

Body:

```json
{
  "oldResumeText": "",
  "analysis": {},
  "userAnswers": {},
  "targetRole": "AI Engineer",
  "targetCompany": "Google",
  "jobDescription": ""
}
```

Response:

```json
{
  "success": true,
  "data": {
    "resumeTitle": "AI Engineer Resume",
    "professionalSummary": "",
    "skills": {},
    "projects": [],
    "education": [],
    "certifications": [],
    "achievements": [],
    "recommendedToLearn": []
  }
}
```

---

## 🧠 How Scoring Works

ResumeMind AI calculates scores using a role-based and keyword-based approach.

### ATS Score

Based on:

- Skill keyword match
- Job description relevance
- Resume readability
- Formatting
- Project relevance
- Measurable achievements

### Company Match Score

Based on:

- Target company role requirements
- Required skills
- Project strength
- Technical stack match
- Resume clarity
- Deployment/tools indicators

### Hiring Probability

Calculated from:

- ATS score
- Company match score
- Missing skills
- Project quality
- Overall resume readiness

---

## 🧪 Example Workflow

1. User signs up or logs in
2. User uploads resume PDF
3. User selects target company and role
4. User pastes job description
5. System analyzes resume
6. User receives ATS score and company match score
7. User views missing skills and improvement suggestions
8. User creates an optimized resume
9. User downloads a one-page ATS-friendly resume PDF

---

## 📸 Screenshots

### 🏠 Home Page

Add screenshot here

### 📊 Dashboard

Add screenshot here

### 📄 Resume Analyzer

Add screenshot here

### 🧾 Optimized Resume Builder

Add screenshot here

---

## 🔐 Security

- Firebase Authentication
- Protected dashboard routes
- Environment variables are not pushed to GitHub
- PDF-only uploads
- File size limits
- Backend CORS protection
- Secure Gemini API integration

Recommended `.gitignore` entries:

```txt
node_modules
.env
.env.local
client/.env.local
server/.env
.next
dist
build
uploads
```

---

## 🎯 Future Enhancements

- AI Cover Letter Generator
- DOCX Resume Export
- Backend PDF Generation
- LinkedIn Profile Analyzer
- AI Interview Question Generator
- Resume Templates Marketplace
- User History Dashboard
- Subscription Plans
- Multi-language Support
- Company-specific resume recommendations

---

## 👨‍💻 Author

**Akshith Reddy**

AI/ML Engineer & Full Stack Developer

Passionate about AI-powered SaaS applications, Machine Learning, Full Stack Development, and Product Engineering.

GitHub:

```txt
https://github.com/Akshithreddy8025
```

---

## ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🚀 Share with others

---

## 📜 License

This project is developed for educational and portfolio purposes.
