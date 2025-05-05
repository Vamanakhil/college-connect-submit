
export interface CoachFormData {
  fullName: string;
  email: string;
  whatsappNumber: string;
  currentRole: string;
  currentOrganization: string;
  yearsOfExperience: string;
  technicalStrengths: string[];
  hasMentoringExperience: boolean;
  willingToTravel: boolean;
  travelScope?: "within-city" | "out-of-city" | "";
  comfortableWithCulturalReview: boolean;
}

export const technicalStrengthOptions = [
  "Python",
  "Scikit-learn",
  "PyTorch",
  "HuggingFace",
  "FastAPI",
  "GitLab CI/CD",
  "Federated Learning (Flower)",
  "Data Visualisation",
  "Other"
];
