
import { CoachFormData } from "@/types/coach";

export const transformCoachDataToApiFormat = (formData: CoachFormData) => {
  return {
    fullName: formData.fullName,
    email: formData.email,
    whatsappNumber: formData.whatsappNumber,
    currentRole: formData.currentRole,
    currentOrganization: formData.currentOrganization,
    yearsOfExperience: formData.yearsOfExperience,
    technicalStrengths: formData.technicalStrengths,
    hasMentoringExperience: formData.hasMentoringExperience,
    willingToTravel: formData.willingToTravel,
    travelScope: formData.willingToTravel ? formData.travelScope : "",
    comfortableWithCulturalReview: formData.comfortableWithCulturalReview,
  };
};

export const submitCoachData = async (formData: CoachFormData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // Transform data to the required API format
    const apiData = transformCoachDataToApiFormat(formData);
    
    // This is a placeholder for the actual API call
    console.log("Submitting coach application data:", JSON.stringify(apiData, null, 2));
    
    // Simulating an API call
    // In a real application, replace this with your actual API endpoint
    // const response = await fetch('https://your-api-endpoint.com/api/v1/coach-applications', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(apiData),
    // });
    
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // return { success: true, data };

    // For now, we'll simulate a successful response
    return {
      success: true,
      data: apiData
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};
