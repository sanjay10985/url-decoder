import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/decode", (req, res) => {
  const { input } = req.body;

  try {
    const parsedUrl = new URL(input);
    const params = parsedUrl.searchParams;

    const result = {
      endpoint: parsedUrl.origin + parsedUrl.pathname,
      params: {},
    };

    for (const [key, value] of params.entries()) {
      try {
        result.params[key] = JSON.parse(value);
      } catch {
        result.params[key] = value;
      }
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Invalid URL or query string" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
