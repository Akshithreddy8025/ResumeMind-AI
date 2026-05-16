const skillDatabase = require("../data/skills");

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[^\w\s.+#/-]/g, " ")
    .replace(/\s+/g, " ");
};

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const extractSkills = (text = "") => {
  const normalizedText = normalizeText(text);
  const detectedSkills = [];

  Object.entries(skillDatabase).forEach(([category, skills]) => {
    skills.forEach((skill) => {
      const normalizedSkill = skill.toLowerCase();

      const pattern = new RegExp(
        `(^|\\s|[^a-zA-Z0-9])${escapeRegex(normalizedSkill)}($|\\s|[^a-zA-Z0-9])`,
        "i"
      );

      if (pattern.test(normalizedText)) {
        detectedSkills.push({
          name: skill,
          category
        });
      }
    });
  });

  const uniqueSkills = Array.from(
    new Map(
      detectedSkills.map((skill) => [
        skill.name.toLowerCase(),
        skill
      ])
    ).values()
  );

  return uniqueSkills;
};

module.exports = {
  extractSkills
};