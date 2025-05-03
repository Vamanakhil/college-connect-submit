
import { CollegeFormData } from "@/types";

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const submitFormData = async (formData: CollegeFormData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // This is a placeholder for the actual API call
    console.log("Submitting form data:", JSON.stringify(formData, null, 2));
    
    // Simulating an API call
    // In a real application, replace this with your actual API endpoint
    // const response = await fetch('https://your-noco-db-endpoint.com/api/v1/colleges', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // return { success: true, data };

    // For now, we'll simulate a successful response
    return {
      success: true,
      data: formData
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};
