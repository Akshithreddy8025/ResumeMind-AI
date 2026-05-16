const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;
const fs = require("fs");

require("dotenv").config();

const { extractSkills } = require("./utils/skillExtractor");
const { calculateScores } = require("./utils/scoreCalculator");

const {
  generateResumeFeedback
} = require("./services/geminiService");

const {
  generateOptimizedResume
} = require("./services/resumeBuilderService");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://resume-mind-ai-plum.vercel.app",
      "https://resumemind-ai.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===============================
// MULTER CONFIG
// ===============================

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
  }
});

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeMind AI Backend Running 🚀"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend health check passed"
  });
});

// ===============================
// ANALYZE RESUME ROUTE
// ===============================

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file missing"
      });
    }

    const company = req.body.company || "";
    const role = req.body.role || "";
    const jobDescription = req.body.jobDescription || "";

    const pdfBuffer = fs.readFileSync(req.file.path);
    const parsed = await pdfParse(pdfBuffer);

    const resumeText = parsed.text || "";
    const limitedResumeText = resumeText.slice(0, 7000);

    const resumeSkills = extractSkills(limitedResumeText);
    const jdSkills = extractSkills(jobDescription);

    const scores = calculateScores({
      resumeText: limitedResumeText,
      jobDescription,
      resumeSkills,
      jdSkills,
      company,
      role
    });

    const feedback = await generateResumeFeedback({
      resumeText: limitedResumeText,
      company,
      role,
      jobDescription,
      scores
    });

    fs.unlinkSync(req.file.path);

    const analysis = {
      ...scores,
      ...feedback,
      resumeText: limitedResumeText,
      detectedSkills: resumeSkills,
      matchedSkills: scores.matchedSkills.map((skill) => skill.name),
      missingSkills: scores.missingSkills.map((skill) => skill.name),
      extraSkills: scores.extraSkills.map((skill) => skill.name)
    };

    return res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.log("Analyze Error:", error);

    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.log("File Delete Error:", err);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Resume analysis failed"
    });
  }
});

// ===============================
// GENERATE OPTIMIZED RESUME ROUTE
// ===============================

app.post("/api/resume/generate-optimized", async (req, res) => {
  try {
    const {
      oldResumeText,
      analysis,
      userAnswers,
      targetRole,
      targetCompany,
      jobDescription
    } = req.body;

    if (!userAnswers) {
      return res.status(400).json({
        success: false,
        message: "User answers are required."
      });
    }

    const optimizedResume = await generateOptimizedResume({
      oldResumeText,
      analysis,
      userAnswers,
      targetRole,
      targetCompany,
      jobDescription
    });

    return res.status(200).json({
      success: true,
      data: optimizedResume
    });
  } catch (error) {
    console.error("Generate optimized resume route error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate optimized resume."
    });
  }
});

// ===============================
// SERVER START
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});