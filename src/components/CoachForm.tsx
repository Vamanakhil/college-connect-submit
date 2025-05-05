
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CoachFormData, technicalStrengthOptions } from "@/types/coach";
import { FormHeader } from "./FormHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitCoachData } from "@/utils/formUtils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { SubmissionDialog } from "./form-sections/SubmissionDialog";

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

export const CoachForm = () => {
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
    <Card className="border border-[#9b87f5]/30">
      <CardContent className="p-6 pt-6">
        <FormHeader 
          title="AI Coach Application" 
          subtitle="Apply to join our team as an AI Coach" 
          logoUrl="https://viswam.ai/_astro/Viswam-logo-orig.CyQLCZHT_2jIQLX.svg"
          centerAlign={true}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#7E69AB]">Personal Information</h2>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your WhatsApp number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#7E69AB]">Professional Information</h2>

              <FormField
                control={form.control}
                name="currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your current role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your current organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your years of experience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technicalStrengths"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel>Key Technical Strengths (select all that apply)</FormLabel>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {technicalStrengthOptions.map((strength) => (
                        <FormField
                          key={strength}
                          control={form.control}
                          name="technicalStrengths"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={strength}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(strength)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, strength])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== strength
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {strength}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {hasOtherSelected && (
                <FormField
                  control={form.control}
                  name="otherTechnicalStrength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify other technical strengths</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your other technical strengths" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Experience & Availability */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#7E69AB]">Experience & Availability</h2>

              <FormField
                control={form.control}
                name="hasMentoringExperience"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-[#9b87f5]/30">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Previous mentoring or teaching experience?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="willingToTravel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-[#9b87f5]/30">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Are you willing to travel on Saturday / weekend(s) to mentor students?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {watchWillingToTravel && (
                <FormField
                  control={form.control}
                  name="travelScope"
                  render={({ field }) => (
                    <FormItem className="ml-7 space-y-3">
                      <FormLabel>Are you willing to travel within city or out of city?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="within-city" />
                            </FormControl>
                            <FormLabel className="font-normal">Within city</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="out-of-city" />
                            </FormControl>
                            <FormLabel className="font-normal">Out of city</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="comfortableWithCulturalReview"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-[#9b87f5]/30">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Are you comfortable reviewing data for cultural appropriateness (Telugu heritage, dialect nuances)?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              Submit Application
            </Button>
          </form>
        </Form>
        
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
  );
};
