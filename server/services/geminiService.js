const {
  GoogleGenerativeAI
} = require('@google/generative-ai')

// ===============================
// ENV CHECK
// ===============================

if (!process.env.GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in environment variables')
}

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
)

// ===============================
// MASTER SKILL DATABASE
// ===============================

const SKILL_DATABASE = {
  programmingLanguages: [
    'C',
    'C++',
    'C#',
    'Java',
    'Python',
    'JavaScript',
    'TypeScript',
    'Go',
    'Rust',
    'PHP',
    'Ruby',
    'Kotlin',
    'Swift',
    'Dart',
    'R',
    'Scala',
    'MATLAB',
    'Perl',
    'Shell Scripting',
    'Bash'
  ],

  frontend: [
    'HTML',
    'CSS',
    'Sass',
    'Tailwind CSS',
    'Bootstrap',
    'JavaScript',
    'TypeScript',
    'React',
    'React.js',
    'Next.js',
    'Vue.js',
    'Angular',
    'Redux',
    'Framer Motion',
    'Responsive Design'
  ],

  backend: [
    'Node.js',
    'Express.js',
    'FastAPI',
    'Django',
    'Flask',
    'Spring Boot',
    'REST API',
    'GraphQL',
    'Authentication',
    'JWT',
    'OAuth',
    'Microservices',
    'WebSockets'
  ],

  databases: [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Firebase',
    'Firestore',
    'Redis',
    'SQLite',
    'Oracle',
    'DynamoDB',
    'Supabase'
  ],

  cloudDevOps: [
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'GitHub Actions',
    'Vercel',
    'Render',
    'Netlify',
    'Linux',
    'Nginx',
    'Cloud Deployment'
  ],

  aiMl: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'LLMs',
    'Generative AI',
    'Prompt Engineering',
    'LangChain',
    'Hugging Face',
    'OpenAI',
    'Gemini AI',
    'TensorFlow',
    'PyTorch',
    'Keras',
    'Scikit-learn',
    'OpenCV',
    'Model Training',
    'Model Evaluation',
    'Fine Tuning'
  ],

  dataScience: [
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Seaborn',
    'Plotly',
    'Power BI',
    'Tableau',
    'Excel',
    'Data Cleaning',
    'Data Preprocessing',
    'Feature Engineering',
    'EDA',
    'Statistics',
    'Probability',
    'SQL'
  ],

  softwareEngineering: [
    'Data Structures',
    'Algorithms',
    'OOP',
    'System Design',
    'Design Patterns',
    'Agile',
    'SDLC',
    'Testing',
    'Unit Testing',
    'Debugging',
    'API Integration'
  ],

  cybersecurity: [
    'Cybersecurity',
    'Network Security',
    'Encryption',
    'Secure Authentication',
    'OWASP',
    'Penetration Testing',
    'Vulnerability Assessment'
  ],

  toolsPlatforms: [
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'VS Code',
    'Postman',
    'Jira',
    'Figma',
    'Canva',
    'npm',
    'Yarn',
    'Webpack'
  ],

  softSkills: [
    'Communication',
    'Leadership',
    'Teamwork',
    'Problem Solving',
    'Critical Thinking',
    'Collaboration',
    'Adaptability',
    'Time Management',
    'Presentation'
  ]
}

// ===============================
// HELPERS
// ===============================

const normalize = (text = '') => {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const includesSkill = (text, skill) => {
  const cleanText = normalize(text)
  const cleanSkill = normalize(skill)

  if (!cleanText || !cleanSkill) return false

  return cleanText.includes(cleanSkill)
}

const getAllSkills = () => {
  return Object.values(SKILL_DATABASE).flat()
}

const unique = (items = []) => {
  return [...new Set(items.filter(Boolean))]
}

const clamp = (num, min = 0, max = 100) => {
  return Math.max(min, Math.min(max, Math.round(num)))
}

const getDetectedSkills = (resumeText) => {
  const allSkills = getAllSkills()

  return unique(
    allSkills.filter((skill) => includesSkill(resumeText, skill))
  )
}

const getJobSkills = (jobDescription, role) => {
  const allSkills = getAllSkills()
  const source = `${jobDescription || ''} ${role || ''}`

  return unique(
    allSkills.filter((skill) => includesSkill(source, skill))
  )
}

const getProjectUsageScore = (resumeText, skill) => {
  const cleanResume = normalize(resumeText)
  const cleanSkill = normalize(skill)

  const projectWords = [
    'project',
    'built',
    'developed',
    'created',
    'implemented',
    'designed',
    'deployed',
    'integrated',
    'trained',
    'analyzed',
    'optimized'
  ]

  const skillIndex = cleanResume.indexOf(cleanSkill)

  if (skillIndex === -1) return 0

  const nearbyText = cleanResume.slice(
    Math.max(0, skillIndex - 250),
    skillIndex + 250
  )

  const usedInProject = projectWords.some((word) =>
    nearbyText.includes(word)
  )

  return usedInProject ? 30 : 10
}

const getDepthScore = (resumeText, skill) => {
  const cleanResume = normalize(resumeText)
  const cleanSkill = normalize(skill)

  const depthWords = [
    'accuracy',
    'performance',
    'optimized',
    'deployed',
    'trained',
    'evaluated',
    'api',
    'database',
    'authentication',
    'dashboard',
    'model',
    'pipeline',
    'users',
    'real-time',
    'production'
  ]

  const skillIndex = cleanResume.indexOf(cleanSkill)

  if (skillIndex === -1) return 0

  const nearbyText = cleanResume.slice(
    Math.max(0, skillIndex - 300),
    skillIndex + 300
  )

  const depthCount = depthWords.filter((word) =>
    nearbyText.includes(word)
  ).length

  if (depthCount >= 3) return 20
  if (depthCount >= 1) return 10

  return 5
}

const calculateSkillScores = (
  resumeText,
  jobDescription,
  role
) => {
  const detectedSkills = getDetectedSkills(resumeText)
  const jobSkills = getJobSkills(jobDescription, role)

  return detectedSkills.map((skill) => {
    let score = 0

    if (includesSkill(resumeText, skill)) {
      score += 30
    }

    score += getProjectUsageScore(resumeText, skill)
    score += getDepthScore(resumeText, skill)

    if (jobSkills.includes(skill)) {
      score += 20
    }

    return {
      name: skill,
      score: clamp(score)
    }
  })
}

const calculateCategoryScores = (
  resumeText,
  jobDescription,
  role
) => {
  const jobSkills = getJobSkills(jobDescription, role)

  return Object.entries(SKILL_DATABASE).map(([category, skills]) => {
    const detected = skills.filter((skill) =>
      includesSkill(resumeText, skill)
    )

    const relevant = skills.filter((skill) =>
      jobSkills.includes(skill)
    )

    const matchedRelevant = relevant.filter((skill) =>
      detected.includes(skill)
    )

    const score = relevant.length > 0
      ? (matchedRelevant.length / relevant.length) * 100
      : (detected.length / skills.length) * 100

    const labelMap = {
      programmingLanguages: 'Programming Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Databases',
      cloudDevOps: 'Cloud / DevOps',
      aiMl: 'AI / ML',
      dataScience: 'Data Science',
      softwareEngineering: 'Software Engineering',
      cybersecurity: 'Cybersecurity',
      toolsPlatforms: 'Tools & Platforms',
      softSkills: 'Soft Skills'
    }

    return {
      category: labelMap[category] || category,
      score: clamp(score)
    }
  })
}

const hasQuantifiedAchievements = (resumeText) => {
  const cleanResume = normalize(resumeText)

  const patterns = [
    /\d+%/,
    /\d+\+/,
    /\d+x/,
    /\d+ users/,
    /\d+ projects/,
    /\d+ accuracy/,
    /\d+ seconds/,
    /\d+ ms/
  ]

  return patterns.some((pattern) => pattern.test(cleanResume))
}

const calculateScores = (
  resumeText,
  jobDescription,
  role
) => {
  const detectedSkills = getDetectedSkills(resumeText)
  const jobSkills = getJobSkills(jobDescription, role)

  const matchedSkills = jobSkills.filter((skill) =>
    detectedSkills.includes(skill)
  )

  const missingSkills = jobSkills.filter((skill) =>
    !detectedSkills.includes(skill)
  )

  const extraSkills = detectedSkills.filter((skill) =>
    !jobSkills.includes(skill)
  )

  const skillKeywordMatch = jobSkills.length
    ? (matchedSkills.length / jobSkills.length) * 100
    : 60

  const roleJobDescriptionMatch = includesSkill(resumeText, role)
    ? 85
    : skillKeywordMatch

  const projectRelevance = detectedSkills.length >= 8
    ? 80
    : detectedSkills.length >= 4
      ? 65
      : 45

  const formattingReadability = resumeText.length > 700 ? 80 : 60

  const quantifiedAchievements = hasQuantifiedAchievements(resumeText)
    ? 85
    : 45

  const atsScore = clamp(
    (skillKeywordMatch * 0.35) +
    (roleJobDescriptionMatch * 0.25) +
    (projectRelevance * 0.20) +
    (formattingReadability * 0.10) +
    (quantifiedAchievements * 0.10)
  )

  const requiredTechnicalSkills = skillKeywordMatch
  const roleSpecificFundamentals = roleJobDescriptionMatch
  const projectQuality = projectRelevance

  const deploymentCloudTools = detectedSkills.some((skill) =>
    [
      'AWS',
      'Azure',
      'Google Cloud',
      'Docker',
      'Kubernetes',
      'Vercel',
      'Render',
      'Cloud Deployment'
    ].includes(skill)
  ) ? 85 : 45

  const communicationLeadership = detectedSkills.some((skill) =>
    [
      'Communication',
      'Leadership',
      'Teamwork',
      'Collaboration'
    ].includes(skill)
  ) ? 80 : 50

  const companyMatch = clamp(
    (requiredTechnicalSkills * 0.40) +
    (roleSpecificFundamentals * 0.20) +
    (projectQuality * 0.20) +
    (deploymentCloudTools * 0.10) +
    (communicationLeadership * 0.10)
  )

  const combinedScore = clamp(
    (atsScore * 0.55) +
    (companyMatch * 0.45)
  )

  let hiringProbability = 'Low'

  if (combinedScore >= 85) {
    hiringProbability = 'Very High'
  } else if (combinedScore >= 70) {
    hiringProbability = 'High'
  } else if (combinedScore >= 50) {
    hiringProbability = 'Medium'
  }

  const overallLevel =
    combinedScore >= 85
      ? 'Advanced'
      : combinedScore >= 65
        ? 'Intermediate'
        : 'Beginner'

  return {
    atsScore,
    companyMatch,
    combinedScore,
    hiringProbability,
    overallLevel,
    projectStrength: clamp(projectRelevance + 20),
    matchedSkills,
    missingSkills,
    extraSkills,
    detectedSkills
  }
}

// ===============================
// SAFE JSON PARSER
// ===============================

const safeJsonParse = (text) => {
  try {
    if (!text) {
      throw new Error('Empty Gemini response')
    }

    let cleanResponse = String(text)
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim()

    // Remove control characters that can break JSON parsing
    cleanResponse = cleanResponse.replace(/[\u0000-\u001F]+/g, ' ')

    const firstBrace = cleanResponse.indexOf('{')
    const lastBrace = cleanResponse.lastIndexOf('}')

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      console.error('Raw Gemini Response:', cleanResponse)
      throw new Error('Gemini did not return a valid JSON object')
    }

    const jsonText = cleanResponse.slice(firstBrace, lastBrace + 1)

    return JSON.parse(jsonText)
  } catch (error) {
    console.error('JSON Parse Error:', error.message)
    console.error('Original Gemini Text:', text)
    throw error
  }
}

// ===============================
// FALLBACK RESPONSE BUILDER
// ===============================

const buildFallbackAnalysis = (
  resumeText,
  company,
  role,
  jobDescription
) => {
  const calculated = calculateScores(
    resumeText,
    jobDescription,
    role
  )

  const skills = calculateSkillScores(
    resumeText,
    jobDescription,
    role
  )

  const skillCategories = calculateCategoryScores(
    resumeText,
    jobDescription,
    role
  )

  return {
    ...calculated,
    skills,
    skillCategories,

    summary:
      'Resume analysis completed with fallback feedback because AI response could not be processed.',

    scoreExplanation:
      'Scores were calculated using skill keyword match, role/job description alignment, project relevance, formatting/readability, and quantified achievements.',

    atsReason:
      'ATS score was calculated from keyword match, job description relevance, project relevance, formatting, and measurable achievements.',

    companyMatchReason:
      'Company match was calculated from required technical skills, role fundamentals, project quality, deployment/tools, and communication indicators.',

    suggestions: [
      'Add missing skills from the job description where you have real experience.',
      'Mention tools and frameworks clearly under each project.',
      'Add measurable achievements such as accuracy, users, performance, or deployment results.',
      'Rewrite project bullets using action verbs and impact-focused outcomes.',
      'Align the resume summary with the selected role and job description.'
    ],

    strengths: [
      'Good technical foundation.',
      'Relevant project experience.',
      'Resume contains multiple useful technical skills.'
    ],

    weaknesses: [
      'Needs more role-specific keywords.',
      'Missing some required job description skills.',
      'Needs more quantified achievements.'
    ],

    improvementPriority: [
      {
        area: 'Job description alignment',
        priority: 'High',
        action:
          'Add missing required skills only if you can support them with projects, coursework, or experience.'
      },
      {
        area: 'Measurable impact',
        priority: 'Medium',
        action:
          'Add numbers such as accuracy, users, performance improvement, or deployment results.'
      }
    ]
  }
}

// ===============================
// MAIN ANALYSIS FUNCTION
// ===============================

exports.analyzeResume = async (
  resumeText,
  company,
  role,
  jobDescription
) => {
  try {
    const calculated = calculateScores(
      resumeText,
      jobDescription,
      role
    )

    const skills = calculateSkillScores(
      resumeText,
      jobDescription,
      role
    )

    const skillCategories = calculateCategoryScores(
      resumeText,
      jobDescription,
      role
    )

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1500,
        responseMimeType: 'application/json'
      }
    })

    const prompt = `
You are an expert ATS resume reviewer and technical recruiter.

Analyze the resume against the selected company, role, and job description.

IMPORTANT:
- Return a valid JSON object only.
- Do not wrap the JSON in markdown.
- Do not use triple backticks.
- Do not add comments.
- Do not add text before or after the JSON.
- All string values must use double quotes.
- Arrays must contain only strings or valid objects.
- Do not invent fake experience.
- Suggestions must be specific and useful.
- Summary must explain the resume quality based on the given scores and skill gaps.
- Use the calculated scores as the final score values.
- Do not change the numeric scores.
- If data is missing, return an empty array or a short fallback string.

Company:
${company || 'Not specified'}

Role:
${role || 'Not specified'}

Job Description:
${jobDescription || 'Not provided'}

Resume:
${String(resumeText || 'No resume text provided').slice(0, 5000)}

Calculated Data:
${JSON.stringify(calculated, null, 2)}

Skill Scores:
${JSON.stringify(skills.slice(0, 20), null, 2)}

Return this exact JSON structure:

{
  "aiSummary": "",
  "scoreExplanation": "",
  "atsReason": "",
  "companyMatchReason": "",
  "aiSuggestions": [],
  "strengths": [],
  "weaknesses": [],
  "improvementPriority": [
    {
      "area": "",
      "priority": "",
      "action": ""
    }
  ]
}
`

    const result = await model.generateContent(prompt)

    const response = result.response.text()

    console.log('Raw Gemini Response:', response)

    const ai = safeJsonParse(response)

    return {
      ...calculated,
      skills,
      skillCategories,

      summary:
        ai.aiSummary ||
        'Resume analysis completed successfully.',

      scoreExplanation:
        ai.scoreExplanation ||
        'Scores were calculated using resume skills, job description alignment, project relevance, formatting, and measurable achievements.',

      atsReason:
        ai.atsReason ||
        'ATS score is based on keyword match, role alignment, projects, formatting, and quantified achievements.',

      companyMatchReason:
        ai.companyMatchReason ||
        'Company match is based on technical skill fit, role fundamentals, project quality, tools, and communication indicators.',

      suggestions:
        Array.isArray(ai.aiSuggestions)
          ? ai.aiSuggestions
          : [],

      strengths:
        Array.isArray(ai.strengths)
          ? ai.strengths
          : [],

      weaknesses:
        Array.isArray(ai.weaknesses)
          ? ai.weaknesses
          : [],

      improvementPriority:
        Array.isArray(ai.improvementPriority)
          ? ai.improvementPriority
          : []
    }
  } catch (error) {
    console.error('Gemini Error Message:', error.message)
    console.error('Gemini Error Stack:', error.stack)

    if (error.status || error.statusText) {
      console.error('Gemini Error Status:', error.status)
      console.error('Gemini Error Status Text:', error.statusText)
    }

    try {
      console.error('Full Gemini Error:', JSON.stringify(error, null, 2))
    } catch (jsonError) {
      console.error('Could not stringify Gemini error')
    }

    return buildFallbackAnalysis(
      resumeText,
      company,
      role,
      jobDescription
    )
  }
}

// ===============================
// FEEDBACK GENERATOR
// ===============================

exports.generateResumeFeedback = async ({
  resumeText = '',
  company = '',
  role = '',
  jobDescription = '',
  scores = {}
}) => {
  const analysis = await exports.analyzeResume(
    resumeText,
    company,
    role,
    jobDescription
  )

  return {
    summary: analysis.summary,
    scoreExplanation: analysis.scoreExplanation,
    atsReason: analysis.atsReason,
    companyMatchReason: analysis.companyMatchReason,
    suggestions: analysis.suggestions,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    improvementPriority: analysis.improvementPriority
  }
}