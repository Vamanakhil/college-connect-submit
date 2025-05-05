
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CoachFormData, technicalStrengthOptions } from "@/types/coach";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ProfessionalInfoSectionProps {
  form: UseFormReturn<CoachFormData>;
  hasOtherSelected: boolean;
}

export const ProfessionalInfoSection: React.FC<ProfessionalInfoSectionProps> = ({ 
  form, 
  hasOtherSelected 
}) => {
  return (
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
  );
};
