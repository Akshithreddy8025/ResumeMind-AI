const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ===============================
// SAFE JSON PARSER
// ===============================

const safeJsonParse = (text) => {
  try {
    if (!text) {
      throw new Error("Empty Gemini response");
    }

    let cleanResponse = String(text)
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    cleanResponse = cleanResponse.replace(/[\u0000-\u001F]+/g, " ");

    const firstBrace = cleanResponse.indexOf("{");
    const lastBrace = cleanResponse.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      console.error("Raw Gemini Response:", cleanResponse);
      throw new Error("Gemini did not return a valid JSON object");
    }

    const jsonText = cleanResponse.slice(firstBrace, lastBrace + 1);

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Optimized Resume JSON Parse Error:", error.message);
    console.error("Original Gemini Text:", text);
    throw error;
  }
};

// ===============================
// HELPERS
// ===============================

const safeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
};

const limitArray = (value, limit) => {
  return safeArray(value).slice(0, limit);
};

const cleanText = (value, fallback = "") => {
  if (!value) return fallback;
  return String(value).trim();
};

// ===============================
// FALLBACK OPTIMIZED RESUME
// ===============================

const buildFallbackOptimizedResume = ({
  targetRole = "",
  targetCompany = "",
  userAnswers = {},
  analysis = {}
}) => {
  const selectedSkills = limitArray(userAnswers.selectedSkills, 24);
  const projects = limitArray(userAnswers.projects, 3);
  const certifications = limitArray(userAnswers.certifications, 3);
  const achievements = limitArray(userAnswers.achievements, 3);

  return {
    resumeTitle: targetRole
      ? `${targetRole} Resume`
      : "ATS Optimized Resume",

    professionalSummary:
      `Aspiring ${targetRole || "technology professional"} with hands-on project experience, confirmed technical skills, and a strong focus on building ATS-friendly, role-aligned solutions.`,

    skills: {
      programmingLanguages: selectedSkills,
      frontend: [],
      backend: [],
      databases: [],
      aiMl: [],
      cloudDevOps: [],
      tools: [],
      softSkills: []
    },

    projects: projects.map((project) => ({
      name: cleanText(project.name, "Technical Project"),
      techStack: limitArray(project.techStack, 8),
      bullets: limitArray([
        project.problemSolved
          ? `Built a solution to address ${project.problemSolved} using relevant technologies.`
          : "Developed a practical project using clean, maintainable, and role-relevant implementation.",
        project.features
          ? `Implemented key features including ${project.features} to improve usability and functionality.`
          : "Implemented core features with structured logic, reusable components, and clear project flow.",
        project.impact
          ? `Delivered measurable impact by ${project.impact}.`
          : "Strengthened practical understanding of software development, debugging, and project deployment."
      ], 3)
    })),

    experience: limitArray(userAnswers.experience, 2).map((item) => ({
      company: cleanText(item.company),
      role: cleanText(item.role),
      duration: cleanText(item.duration),
      bullets: limitArray(item.bullets, 3)
    })),

    education: userAnswers.education
      ? [
          {
            college: cleanText(userAnswers.education.college),
            degree: cleanText(userAnswers.education.degree),
            branch: cleanText(userAnswers.education.branch),
            cgpa: cleanText(userAnswers.education.cgpa),
            graduationYear: cleanText(userAnswers.education.graduationYear),
            coursework: limitArray(userAnswers.education.coursework, 6)
          }
        ]
      : [],

    certifications,
    achievements,

    recommendedToLearn: limitArray(analysis.missingSkills, 12),

    templateRecommendation:
      "Use a clean one-page ATS-friendly template with standard headings, simple fonts, bullet points, and no tables, icons, images, or graphics.",

    atsImprovementReason:
      `This resume improves ATS and recruiter readability by focusing on confirmed skills, relevant projects, concise bullets, and alignment with ${targetCompany || "the target company"} ${targetRole || "role"} requirements.`,

    resumeRulesApplied: [
      "One-page resume format for fresher or entry-level profile",
      "ATS-friendly one-column structure",
      "No fake skills or unconfirmed experience",
      "Only relevant and confirmed skills included",
      "Missing skills moved to recommendedToLearn",
      "Projects limited to strongest 2-3 entries",
      "Bullets written with action verbs and role relevance"
    ]
  };
};

// ===============================
// MAIN GENERATOR
// ===============================

exports.generateOptimizedResume = async ({
  oldResumeText = "",
  analysis = {},
  userAnswers = {},
  targetRole = "",
  targetCompany = "",
  jobDescription = ""
}) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2200,
        responseMimeType: "application/json"
      }
    });

    const prompt = `
You are an expert ATS resume writer, technical recruiter, and company hiring-screening specialist.

Your task is to create a company-ready optimized resume for the user based on:
- Old resume text
- Resume analysis
- User confirmed answers
- Target company
- Target role
- Job description

Return ONLY valid JSON.
Do not include markdown.
Do not include triple backticks.
Do not include explanation outside JSON.

==================================================
STRICT COMPANY RESUME CREATION RULES
==================================================

1. Create an ATS-friendly resume suitable for real company applications.
2. Use a clean one-column resume structure.
3. Do not use tables, images, icons, graphics, text boxes, columns, charts, or progress bars.
4. Use standard resume section names only.
5. Keep the resume concise, recruiter-friendly, and readable.
6. Do not add fake skills, fake experience, fake internships, fake certifications, fake achievements, or fake metrics.
7. Only include skills confirmed by the user or clearly present in the old resume.
8. If the job description requires a skill but the user did not confirm it, do NOT add it to resume skills.
9. Put unconfirmed missing skills only inside recommendedToLearn.
10. Tailor the resume to the selected company, selected role, and job description.
11. Use keywords from the job description only when they match the user's real skills, projects, coursework, or experience.
12. Avoid generic claims like "hardworking", "quick learner", or "passionate" unless supported by project evidence.
13. Use strong action verbs such as Built, Developed, Designed, Implemented, Integrated, Automated, Optimized, Deployed, Analyzed, Created.
14. Each project bullet should follow:
    Action Verb + What was built + Technology used + Result or purpose.
15. Use measurable impact only if the user provided numbers or clear impact.
16. If numbers are not provided, write realistic impact-focused bullets without inventing false metrics.
17. The final resume must be suitable for both ATS systems and human recruiters.

==================================================
MANDATORY ONE-PAGE RULE
==================================================

For students, freshers, internships, entry-level candidates, and candidates with 0-2 years of experience:
- Generate a strict one-page resume.
- Do not create long content.
- Do not make the resume crowded.
- Do not shrink text below readable size.
- If content is too long, remove low-priority content instead.

For one-page resume, prioritize:
1. Name and contact details
2. Professional summary
3. Technical skills relevant to the target role
4. Strongest 2-3 projects
5. Education
6. Certifications only if relevant
7. Achievements only if relevant

==================================================
CONTENT LIMITS FOR ONE-PAGE RESUME
==================================================

- Professional summary: maximum 2-3 lines.
- Skills: maximum 18-24 highly relevant skills total.
- Projects: maximum 2-3 strongest projects.
- Project bullets: maximum 2-3 bullets per project.
- Bullet length: maximum 18-22 words.
- Experience: maximum 1-2 entries if available.
- Experience bullets: maximum 2-3 bullets per entry.
- Certifications: maximum 2-3 most relevant certifications.
- Achievements: maximum 2-3 most relevant achievements.
- Coursework: maximum 4-6 relevant subjects.
- Avoid repeated skills across sections.

==================================================
SECTION ORDER RULES
==================================================

For fresher/student resume, use this order:
1. Professional Summary
2. Technical Skills
3. Projects
4. Education
5. Certifications
6. Achievements

For experienced resume, use this order:
1. Professional Summary
2. Technical Skills
3. Experience
4. Projects
5. Education
6. Certifications
7. Achievements

If experience is empty, keep experience as an empty array.

==================================================
SKILL HONESTY RULE
==================================================

The resume must never pretend that the user knows a missing skill.

Example:
If job requires TensorFlow, PyTorch, Docker, NLP, or Computer Vision,
but the user did not confirm these skills,
then do not add them to skills.
Instead add them to recommendedToLearn.

==================================================
TARGET COMPANY AND ROLE ALIGNMENT
==================================================

Target Company:
${targetCompany || "Not specified"}

Target Role:
${targetRole || "Not specified"}

Job Description:
${String(jobDescription || "Not provided").slice(0, 3000)}

Old Resume Text:
${String(oldResumeText || "No old resume text provided").slice(0, 5000)}

Previous Resume Analysis:
${JSON.stringify(analysis || {}, null, 2).slice(0, 5000)}

User Confirmed Answers:
${JSON.stringify(userAnswers || {}, null, 2).slice(0, 5000)}

==================================================
RETURN EXACT JSON STRUCTURE
==================================================

{
  "resumeTitle": "",
  "professionalSummary": "",
  "skills": {
    "programmingLanguages": [],
    "frontend": [],
    "backend": [],
    "databases": [],
    "aiMl": [],
    "cloudDevOps": [],
    "tools": [],
    "softSkills": []
  },
  "projects": [
    {
      "name": "",
      "techStack": [],
      "bullets": []
    }
  ],
  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "bullets": []
    }
  ],
  "education": [
    {
      "college": "",
      "degree": "",
      "branch": "",
      "cgpa": "",
      "graduationYear": "",
      "coursework": []
    }
  ],
  "certifications": [],
  "achievements": [],
  "recommendedToLearn": [],
  "templateRecommendation": "",
  "atsImprovementReason": "",
  "resumeRulesApplied": []
}

Important:
- Arrays can be empty if information is not available.
- Do not return null values.
- Do not invent personal contact details.
- Do not include placeholder name, email, phone, LinkedIn, or GitHub.
- Keep all resume content concise enough for one page.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    console.log("Raw Optimized Resume Response:", response);

    const parsedResume = safeJsonParse(response);

    return {
      resumeTitle: cleanText(parsedResume.resumeTitle, targetRole || "ATS Optimized Resume"),
      professionalSummary: cleanText(parsedResume.professionalSummary),
      skills: {
        programmingLanguages: limitArray(parsedResume.skills?.programmingLanguages, 8),
        frontend: limitArray(parsedResume.skills?.frontend, 6),
        backend: limitArray(parsedResume.skills?.backend, 6),
        databases: limitArray(parsedResume.skills?.databases, 5),
        aiMl: limitArray(parsedResume.skills?.aiMl, 8),
        cloudDevOps: limitArray(parsedResume.skills?.cloudDevOps, 5),
        tools: limitArray(parsedResume.skills?.tools, 6),
        softSkills: limitArray(parsedResume.skills?.softSkills, 5)
      },
      projects: limitArray(parsedResume.projects, 3).map((project) => ({
        name: cleanText(project.name, "Project"),
        techStack: limitArray(project.techStack, 8),
        bullets: limitArray(project.bullets, 3)
      })),
      experience: limitArray(parsedResume.experience, 2).map((item) => ({
        company: cleanText(item.company),
        role: cleanText(item.role),
        duration: cleanText(item.duration),
        bullets: limitArray(item.bullets, 3)
      })),
      education: limitArray(parsedResume.education, 1).map((edu) => ({
        college: cleanText(edu.college),
        degree: cleanText(edu.degree),
        branch: cleanText(edu.branch),
        cgpa: cleanText(edu.cgpa),
        graduationYear: cleanText(edu.graduationYear),
        coursework: limitArray(edu.coursework, 6)
      })),
      certifications: limitArray(parsedResume.certifications, 3),
      achievements: limitArray(parsedResume.achievements, 3),
      recommendedToLearn: limitArray(parsedResume.recommendedToLearn, 12),
      templateRecommendation: cleanText(
        parsedResume.templateRecommendation,
        "Use a clean one-page ATS-friendly resume template."
      ),
      atsImprovementReason: cleanText(
        parsedResume.atsImprovementReason,
        "This resume improves ATS readability by using confirmed skills, relevant keywords, and concise project bullets."
      ),
      resumeRulesApplied: limitArray(
        parsedResume.resumeRulesApplied,
        10
      )
    };
  } catch (error) {
    console.error("Optimized Resume Gemini Error:", error.message);

    return buildFallbackOptimizedResume({
      targetRole,
      targetCompany,
      userAnswers,
      analysis
    });
  }
};