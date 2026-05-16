const categoryLabels = {
  programmingLanguages: "Programming Languages",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  aiMl: "AI / ML",
  dataScience: "Data Science",
  cloudDevOps: "Cloud / DevOps",
  softwareEngineering: "Software Engineering",
  mobileDevelopment: "Mobile Development",
  cybersecurity: "Cybersecurity",
  toolsPlatforms: "Tools & Platforms",
  softSkills: "Soft Skills"
};

const normalizeSkillName = (skill = "") => {
  return skill
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .replace(/apis\b/g, "api")
    .replace(/js\b/g, "javascript")
    .trim();
};

const calculateScores = ({
  resumeText = "",
  jobDescription = "",
  resumeSkills = [],
  jdSkills = [],
  company = "",
  role = ""
}) => {
  const resumeSkillNames = resumeSkills.map((skill) =>
    normalizeSkillName(skill.name)
  );

  const jdSkillNames = jdSkills.map((skill) =>
    normalizeSkillName(skill.name)
  );

  const matchedSkills = jdSkills.filter((skill) =>
    resumeSkillNames.includes(normalizeSkillName(skill.name))
  );

  const missingSkills = jdSkills.filter(
    (skill) => !resumeSkillNames.includes(normalizeSkillName(skill.name))
  );

  const extraSkills = resumeSkills.filter(
    (skill) => !jdSkillNames.includes(normalizeSkillName(skill.name))
  );

  const skillMatchScore =
    jdSkills.length > 0
      ? Math.round((matchedSkills.length / jdSkills.length) * 100)
      : Math.min(100, resumeSkills.length * 8);

  const projectKeywords = [
    "project",
    "projects",
    "built",
    "developed",
    "created",
    "implemented",
    "deployed",
    "github",
    "api",
    "dashboard",
    "model",
    "application",
    "system",
    "website",
    "platform",
    "app",
    "trained",
    "evaluated",
    "integrated"
  ];

  const achievementKeywords = [
    "%",
    "improved",
    "increased",
    "reduced",
    "optimized",
    "accuracy",
    "users",
    "time",
    "performance",
    "score",
    "faster",
    "efficient",
    "reduced",
    "automated"
  ];

  const formattingKeywords = [
    "education",
    "skills",
    "projects",
    "experience",
    "certifications",
    "summary",
    "achievements"
  ];

  const lowerResume = resumeText.toLowerCase();

  const projectScore = Math.min(
    100,
    projectKeywords.filter((word) => lowerResume.includes(word)).length * 10
  );

  const achievementScore = Math.min(
    100,
    achievementKeywords.filter((word) => lowerResume.includes(word)).length * 12
  );

  const formattingScore = Math.min(
    100,
    formattingKeywords.filter((word) => lowerResume.includes(word)).length * 15
  );

  const roleWords = role
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const roleMatchScore =
    roleWords.length > 0
      ? Math.round(
          (roleWords.filter((word) => lowerResume.includes(word)).length /
            roleWords.length) *
            100
        )
      : skillMatchScore;

  const atsScore = Math.round(
    skillMatchScore * 0.35 +
      roleMatchScore * 0.25 +
      projectScore * 0.2 +
      formattingScore * 0.1 +
      achievementScore * 0.1
  );

  const companyMatch = Math.round(
    skillMatchScore * 0.4 +
      roleMatchScore * 0.2 +
      projectScore * 0.2 +
      Math.min(100, extraSkills.length * 8) * 0.1 +
      formattingScore * 0.1
  );

  const projectStrength = projectScore;

  const missingSkillsPenalty = Math.min(
    40,
    missingSkills.length * 5
  );

  const combinedScore = Math.max(
    0,
    Math.round(
      atsScore * 0.4 +
        companyMatch * 0.35 +
        projectStrength * 0.15 -
        missingSkillsPenalty * 0.1
    )
  );

  let hiringProbability = "Low";

  if (combinedScore >= 85) {
    hiringProbability = "Very High";
  } else if (combinedScore >= 70) {
    hiringProbability = "High";
  } else if (combinedScore >= 50) {
    hiringProbability = "Medium";
  }

  const categoryMap = {};

  resumeSkills.forEach((skill) => {
    if (!categoryMap[skill.category]) {
      categoryMap[skill.category] = {
        category: categoryLabels[skill.category] || skill.category,
        count: 0
      };
    }

    categoryMap[skill.category].count += 1;
  });

  const skillCategories = Object.values(categoryMap).map((item) => ({
    category: item.category,
    score: Math.min(100, item.count * 15)
  }));

  const skills = resumeSkills.map((skill) => {
    const skillName = normalizeSkillName(skill.name);
    const isMatched = jdSkillNames.includes(skillName);

    let score = 30;

    if (lowerResume.includes(skill.name.toLowerCase())) {
      score += 20;
    }

    if (
      lowerResume.includes("project") ||
      lowerResume.includes("built") ||
      lowerResume.includes("developed") ||
      lowerResume.includes("implemented") ||
      lowerResume.includes("trained") ||
      lowerResume.includes("deployed")
    ) {
      score += 20;
    }

    if (isMatched) {
      score += 30;
    }

    return {
      name: skill.name,
      score: Math.min(100, score)
    };
  });

  return {
    atsScore,
    companyMatch,
    projectStrength,
    missingSkillsPenalty,
    combinedScore,
    hiringProbability,
    matchedSkills,
    missingSkills,
    extraSkills,
    skills,
    skillCategories
  };
};

module.exports = {
  calculateScores
};