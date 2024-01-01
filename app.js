const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
const upload = multer({ dest: "uploads/" });

const MODEL_NAME = "gemini-pro-vision";
const API_KEY = "AIzaSyAhuq2aDi3L5yxi_nigK0FwFxS6bbrMTG8"; // Replace with your API Key

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

app.use(express.static("public")); // Serve static files in the 'public' directory

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      // Add other safety settings as needed
    ];

    const parts = [
      {
        text: "Identify the place where this photo was taken and give a brief description of the city\n",
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: Buffer.from(fs.readFileSync(req.file.path)).toString("base64"),
        },
      },
      { text: "\nWhat are the main concepts of this building?" },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    res.send(response.text());
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
