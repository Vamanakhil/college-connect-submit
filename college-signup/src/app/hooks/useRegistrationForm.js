import { useState } from "react";

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    principalName: "",
    principalEmail: "",
    principalPhone: "",
    pocName: "",
    pocEmail: "",
    pocPhone: "",
    tpoName: "",
    tpoEmail: "",
    tpoPhone: "",
    faculty: [],
  });

  const [message, setMessage] = useState(null);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setMessage(result);
      if (result.success) {
        setFormData({
          collegeName: "",
          principalName: "",
          principalEmail: "",
          principalPhone: "",
          pocName: "",
          pocEmail: "",
          pocPhone: "",
          tpoName: "",
          tpoEmail: "",
          tpoPhone: "",
          faculty: [],
        });
      }
    } catch (error) {
      setMessage({ success: false, message: "Failed to submit form." });
    }
  };

  return {
    formData,
    updateFormData,
    handleSubmit,
    message,
  };
};