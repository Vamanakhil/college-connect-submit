// pages/api/register.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST requests allowed" });
    }
  
    const data = req.body;
  
    try {
      const response = await fetch("https://<your-nocodb-domain>/nc/AI_REGISTRATION/CollegeRegistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xc-token": process.env.NOCODB_API_TOKEN, // Use environment variable
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json({ success: false, message: result.message || "Error saving data" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Registration submitted successfully!",
        uid: result?.Id || result?.id || null, // Adjust based on NocoDB response
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }