
import React, { useState } from 'react';
import { FormHeader } from '@/components/FormHeader';
import { FacultyFields } from '@/components/FacultyFields';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CollegeFormData, Faculty } from '@/types';
import { validateEmail, validatePhone, submitFormData } from '@/utils/formUtils';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { InstitutionInfo } from './form-sections/InstitutionInfo';
import { PrincipalInfo } from './form-sections/PrincipalInfo';
import { PocInfo } from './form-sections/PocInfo';
import { TpoInfo } from './form-sections/TpoInfo';
import { SubmissionDialog } from './form-sections/SubmissionDialog';

export const CollegeForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJsonDialog, setShowJsonDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  
  const [formData, setFormData] = useState<CollegeFormData>({
    collegeName: '',
    principalName: '',
    principalEmail: '',
    principalPhone: '',
    pocName: '',
    pocEmail: '',
    pocPhone: '',
    tpoName: '',
    tpoEmail: '',
    tpoPhone: '',
    faculty: []
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [facultyErrors, setFacultyErrors] = useState<Record<string, Record<string, string>>>({});

  const handleInputChange = (field: keyof CollegeFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const validateField = (field: string, value: string) => {
    const errors = { ...formErrors };

    switch (field) {
      case 'collegeName':
      case 'principalName':
      case 'pocName':
      case 'tpoName':
        if (!value.trim()) {
          errors[field] = 'This field is required';
        } else {
          delete errors[field];
        }
        break;
      
      case 'principalEmail':
      case 'pocEmail':
      case 'tpoEmail':
        if (!value.trim()) {
          errors[field] = 'Email is required';
        } else if (!validateEmail(value)) {
          errors[field] = 'Please enter a valid email';
        } else {
          delete errors[field];
        }
        break;

      case 'principalPhone':
      case 'pocPhone':
      case 'tpoPhone':
        if (!value.trim()) {
          errors[field] = 'Phone number is required';
        } else if (!validatePhone(value)) {
          errors[field] = 'Please enter a valid 10-digit phone number';
        } else {
          delete errors[field];
        }
        break;
    }

    setFormErrors(errors);
  };

  const validateForm = (): boolean => {
    // Validate all base fields first
    const baseFields: (keyof CollegeFormData)[] = [
      'collegeName', 'principalName', 'principalEmail', 'principalPhone',
      'pocName', 'pocEmail', 'pocPhone', 'tpoName', 'tpoEmail', 'tpoPhone'
    ];
    
    let isValid = true;
    const newFormErrors = { ...formErrors };

    baseFields.forEach(field => {
      const value = formData[field] as string;
      if (!value.trim()) {
        newFormErrors[field] = 'This field is required';
        isValid = false;
      } else if ((field.includes('Email')) && !validateEmail(value)) {
        newFormErrors[field] = 'Please enter a valid email';
        isValid = false;
      } else if ((field.includes('Phone')) && !validatePhone(value)) {
        newFormErrors[field] = 'Please enter a valid 10-digit phone number';
        isValid = false;
      }
    });

    setFormErrors(newFormErrors);

    // Validate faculty
    if (formData.faculty.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one faculty member",
        variant: "destructive"
      });
      isValid = false;
    } else {
      const newFacultyErrors = { ...facultyErrors };
      
      formData.faculty.forEach(faculty => {
        if (!faculty.name.trim() || !faculty.email.trim() || !faculty.phone.trim()) {
          if (!newFacultyErrors[faculty.id]) {
            newFacultyErrors[faculty.id] = {};
          }
          
          if (!faculty.name.trim()) {
            newFacultyErrors[faculty.id].name = 'Name is required';
          }
          
          if (!faculty.email.trim()) {
            newFacultyErrors[faculty.id].email = 'Email is required';
          } else if (!validateEmail(faculty.email)) {
            newFacultyErrors[faculty.id].email = 'Please enter a valid email';
          }
          
          if (!faculty.phone.trim()) {
            newFacultyErrors[faculty.id].phone = 'Phone number is required';
          } else if (!validatePhone(faculty.phone)) {
            newFacultyErrors[faculty.id].phone = 'Please enter a valid 10-digit phone number';
          }
          
          isValid = false;
        }
      });
      
      setFacultyErrors(newFacultyErrors);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast({
        title: "Validation Error",
        description: "Please complete all required fields correctly",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitFormData(formData);
      
      if (result.success) {
        setSubmittedData(result.data);
        setShowJsonDialog(true);
        toast({
          title: "Success",
          description: "Institution details submitted successfully",
        });
      } else {
        toast({
          title: "Submission Error",
          description: result.error || "An error occurred during submission",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFaculty = () => {
    const newId = crypto.randomUUID();
    setFormData({
      ...formData,
      faculty: [...formData.faculty, { id: newId, name: '', email: '', phone: '' }]
    });
  };

  return (
    <>
      <Card className="bg-white shadow-lg border-blue-100">
        <CardContent className="pt-6">
          <FormHeader 
            title="Summer of AI Internship" 
            subtitle="Institution Sign-up form for SOAI Initiative"
            logoUrl="https://viswam.ai/_astro/Viswam-logo-orig.CyQLCZHT_2jIQLX.svg"
          />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <InstitutionInfo 
              collegeName={formData.collegeName}
              onChangeCollegeName={(value) => handleInputChange('collegeName', value)}
              error={formErrors.collegeName}
            />

            <Separator />

            <div className="space-y-6">
              <PrincipalInfo 
                principalName={formData.principalName}
                principalEmail={formData.principalEmail}
                principalPhone={formData.principalPhone}
                onChangePrincipalName={(value) => handleInputChange('principalName', value)}
                onChangePrincipalEmail={(value) => handleInputChange('principalEmail', value)}
                onChangePrincipalPhone={(value) => handleInputChange('principalPhone', value)}
                errors={{
                  principalName: formErrors.principalName,
                  principalEmail: formErrors.principalEmail,
                  principalPhone: formErrors.principalPhone,
                }}
              />
            </div>

            <Separator />

            <PocInfo 
              pocName={formData.pocName}
              pocEmail={formData.pocEmail}
              pocPhone={formData.pocPhone}
              onChangePocName={(value) => handleInputChange('pocName', value)}
              onChangePocEmail={(value) => handleInputChange('pocEmail', value)}
              onChangePocPhone={(value) => handleInputChange('pocPhone', value)}
              errors={{
                pocName: formErrors.pocName,
                pocEmail: formErrors.pocEmail,
                pocPhone: formErrors.pocPhone,
              }}
            />

            <Separator />

            <TpoInfo 
              tpoName={formData.tpoName}
              tpoEmail={formData.tpoEmail}
              tpoPhone={formData.tpoPhone}
              onChangeTpoName={(value) => handleInputChange('tpoName', value)}
              onChangeTpoEmail={(value) => handleInputChange('tpoEmail', value)}
              onChangeTpoPhone={(value) => handleInputChange('tpoPhone', value)}
              errors={{
                tpoName: formErrors.tpoName,
                tpoEmail: formErrors.tpoEmail,
                tpoPhone: formErrors.tpoPhone,
              }}
            />

            <Separator />

            <FacultyFields 
              faculty={formData.faculty} 
              setFaculty={(faculty: Faculty[]) => setFormData({ ...formData, faculty })}
              errors={facultyErrors}
              setErrors={setFacultyErrors}
            />

            {formData.faculty.length > 0 && (
              <div className="flex justify-center mb-6">
                <Button 
                  type="button" 
                  onClick={addFaculty}
                  variant="outline" 
                  className="flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 w-full sm:w-auto"
                >
                  <Plus size={16} className="mr-1" /> Add Another Faculty Member
                </Button>
              </div>
            )}

            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-lg w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Institution Details'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <SubmissionDialog 
        open={showJsonDialog}
        onOpenChange={setShowJsonDialog}
        submittedData={submittedData}
      />
    </>
  );
};
