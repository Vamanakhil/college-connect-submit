
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CoachFormData } from "@/types/coach";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExperienceAvailabilitySectionProps {
  form: UseFormReturn<CoachFormData>;
  watchWillingToTravel: boolean;
}

export const ExperienceAvailabilitySection: React.FC<ExperienceAvailabilitySectionProps> = ({ 
  form, 
  watchWillingToTravel 
}) => {
  return (
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
  );
};
