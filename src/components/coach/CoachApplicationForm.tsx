
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CoachFormData } from "@/types/coach";
import { FormHeader } from "../FormHeader";
import { Button } from "@/components/ui/button";
import { submitCoachData } from "@/utils/formUtils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { SubmissionDialog } from "../form-sections/SubmissionDialog";
import { CoachIntroduction } from "./CoachIntroduction";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ProfessionalInfoSection } from "./ProfessionalInfoSection";
import { ExperienceAvailabilitySection } from "./ExperienceAvailabilitySection";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  whatsappNumber: z.string().min(10, { message: "Valid WhatsApp number is required" }),
  currentRole: z.string().min(1, { message: "Current role is required" }),
  currentOrganization: z.string().min(1, { message: "Current organization is required" }),
  yearsOfExperience: z.string().min(1, { message: "Years of experience is required" }),
  technicalStrengths: z.array(z.string()).min(1, { message: "Select at least one technical strength" }),
  otherTechnicalStrength: z.string().optional(),
  hasMentoringExperience: z.boolean(),
  willingToTravel: z.boolean(),
  travelScope: z.enum(["within-city", "out-of-city", ""]).optional(),
  comfortableWithCulturalReview: z.boolean(),
});

export const CoachApplicationForm = () => {
  const [submissionData, setSubmissionData] = useState<CoachFormData | null>(null);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  
  const form = useForm<CoachFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      currentRole: "",
      currentOrganization: "",
      yearsOfExperience: "",
      technicalStrengths: [],
      otherTechnicalStrength: "",
      hasMentoringExperience: false,
      willingToTravel: false,
      travelScope: "",
      comfortableWithCulturalReview: false,
    },
  });

  const watchWillingToTravel = form.watch("willingToTravel");
  const watchTechnicalStrengths = form.watch("technicalStrengths");
  const hasOtherSelected = watchTechnicalStrengths?.includes("Other") || false;

  const onSubmit = async (data: CoachFormData) => {
    try {
      // Only include travelScope if willing to travel
      const submissionData = {
        ...data,
        travelScope: data.willingToTravel ? data.travelScope : "",
      };

      // Set the submission data and show dialog
      setSubmissionData(submissionData);
      setShowSubmissionDialog(true);
      
      const result = await submitCoachData(submissionData);
      
      if (result.success) {
        toast.success("Form submitted successfully");
        
        // Reset the form after 5 seconds
        setTimeout(() => {
          form.reset();
          setShowSubmissionDialog(false);
        }, 5000);
      } else {
        toast.error(`Error submitting form: ${result.error}`);
      }
    } catch (error) {
      toast.error("Failed to submit form");
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <CoachIntroduction />
      
      {/* Application Form */}
      <Card className="border border-[#9b87f5]/30">
        <CardContent className="p-6 pt-6">
          <FormHeader 
            title="AI Coach Application" 
            subtitle="Apply to join our team as an AI Coach" 
            logoUrl="https://viswam.ai/_astro/Viswam-logo-orig.CyQLCZHT_2jIQLX.svg"
            centerAlign={true}
          />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <PersonalInfoSection form={form} />

            {/* Professional Information */}
            <ProfessionalInfoSection 
              form={form} 
              hasOtherSelected={hasOtherSelected} 
            />

            {/* Experience & Availability */}
            <ExperienceAvailabilitySection 
              form={form} 
              watchWillingToTravel={watchWillingToTravel} 
            />

            <Button 
              type="submit" 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              Submit Application
            </Button>
          </form>
          
          {/* Dialog to show submitted data */}
          {submissionData && (
            <SubmissionDialog
              open={showSubmissionDialog}
              onOpenChange={setShowSubmissionDialog}
              submittedData={submissionData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
