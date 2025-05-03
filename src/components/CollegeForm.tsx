
import React, { useState } from 'react';
import { FormHeader } from '@/components/FormHeader';
import { FacultyFields } from '@/components/FacultyFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CollegeFormData, Faculty } from '@/types';
import { validateEmail, validatePhone, submitFormData } from '@/utils/formUtils';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export const CollegeForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJsonDialog, setShowJsonDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<CollegeFormData | null>(null);
  
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
        setSubmittedData(formData);
        setShowJsonDialog(true);
        toast({
          title: "Success",
          description: "College details submitted successfully",
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

  return (
    <>
      <Card className="bg-white shadow-lg border-blue-100">
        <CardContent className="pt-6">
          <FormHeader 
            title="  Summer of AI Internship" 
            subtitle="College Sign-up form for SOAI Intiative "
            logoUrl="https://viswam.ai/_astro/Viswam-logo-orig.CyQLCZHT_2jIQLX.svg"
          />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-gray-900">College Information</h3>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                <div className="space-y-1">
                  <label htmlFor="collegeName" className="text-sm font-medium text-gray-700">
                    Name of the College*
                  </label>
                  <Input 
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange('collegeName', e.target.value)}
                    className={`${formErrors.collegeName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter college name"
                  />
                  {formErrors.collegeName && (
                    <p className="text-sm text-red-500">{formErrors.collegeName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4">
                <div className="space-y-1">
                  <label htmlFor="principalName" className="text-sm font-medium text-gray-700">
                    Name of the Principal*
                  </label>
                  <Input 
                    id="principalName"
                    value={formData.principalName}
                    onChange={(e) => handleInputChange('principalName', e.target.value)}
                    className={`${formErrors.principalName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter principal's name"
                  />
                  {formErrors.principalName && (
                    <p className="text-sm text-red-500">{formErrors.principalName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="principalEmail" className="text-sm font-medium text-gray-700">
                    Principal's Email*
                  </label>
                  <Input 
                    id="principalEmail"
                    type="email"
                    value={formData.principalEmail}
                    onChange={(e) => handleInputChange('principalEmail', e.target.value)}
                    className={`${formErrors.principalEmail ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter principal's email"
                  />
                  {formErrors.principalEmail && (
                    <p className="text-sm text-red-500">{formErrors.principalEmail}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="principalPhone" className="text-sm font-medium text-gray-700">
                    Principal's Phone Number*
                  </label>
                  <Input 
                    id="principalPhone"
                    type="tel"
                    value={formData.principalPhone}
                    onChange={(e) => handleInputChange('principalPhone', e.target.value)}
                    className={`${formErrors.principalPhone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="10-digit number"
                    maxLength={10}
                  />
                  {formErrors.principalPhone && (
                    <p className="text-sm text-red-500">{formErrors.principalPhone}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-gray-900">Point of Contact for SOAI Initiative</h3>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="pocName" className="text-sm font-medium text-gray-700">
                    Name*
                  </label>
                  <Input 
                    id="pocName"
                    value={formData.pocName}
                    onChange={(e) => handleInputChange('pocName', e.target.value)}
                    className={`${formErrors.pocName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter POC name"
                  />
                  {formErrors.pocName && (
                    <p className="text-sm text-red-500">{formErrors.pocName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="pocEmail" className="text-sm font-medium text-gray-700">
                    Email*
                  </label>
                  <Input 
                    id="pocEmail"
                    type="email"
                    value={formData.pocEmail}
                    onChange={(e) => handleInputChange('pocEmail', e.target.value)}
                    className={`${formErrors.pocEmail ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter POC email"
                  />
                  {formErrors.pocEmail && (
                    <p className="text-sm text-red-500">{formErrors.pocEmail}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="pocPhone" className="text-sm font-medium text-gray-700">
                    Phone Number*
                  </label>
                  <Input 
                    id="pocPhone"
                    type="tel"
                    value={formData.pocPhone}
                    onChange={(e) => handleInputChange('pocPhone', e.target.value)}
                    className={`${formErrors.pocPhone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="10-digit number"
                    maxLength={10}
                  />
                  {formErrors.pocPhone && (
                    <p className="text-sm text-red-500">{formErrors.pocPhone}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-gray-900">Training and Placement Officer</h3>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="tpoName" className="text-sm font-medium text-gray-700">
                    Name*
                  </label>
                  <Input 
                    id="tpoName"
                    value={formData.tpoName}
                    onChange={(e) => handleInputChange('tpoName', e.target.value)}
                    className={`${formErrors.tpoName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter TPO name"
                  />
                  {formErrors.tpoName && (
                    <p className="text-sm text-red-500">{formErrors.tpoName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="tpoEmail" className="text-sm font-medium text-gray-700">
                    Email*
                  </label>
                  <Input 
                    id="tpoEmail"
                    type="email"
                    value={formData.tpoEmail}
                    onChange={(e) => handleInputChange('tpoEmail', e.target.value)}
                    className={`${formErrors.tpoEmail ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter TPO email"
                  />
                  {formErrors.tpoEmail && (
                    <p className="text-sm text-red-500">{formErrors.tpoEmail}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="tpoPhone" className="text-sm font-medium text-gray-700">
                    Phone Number*
                  </label>
                  <Input 
                    id="tpoPhone"
                    type="tel"
                    value={formData.tpoPhone}
                    onChange={(e) => handleInputChange('tpoPhone', e.target.value)}
                    className={`${formErrors.tpoPhone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="10-digit number"
                    maxLength={10}
                  />
                  {formErrors.tpoPhone && (
                    <p className="text-sm text-red-500">{formErrors.tpoPhone}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <FacultyFields 
              faculty={formData.faculty} 
              setFaculty={(faculty: Faculty[]) => setFormData({ ...formData, faculty })}
              errors={facultyErrors}
              setErrors={setFacultyErrors}
            />

            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-lg w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit College Details'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showJsonDialog} onOpenChange={setShowJsonDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submitted College Details</DialogTitle>
            <DialogDescription>
              The following JSON data has been submitted:
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
          
          <DialogFooter>
            <Button
              onClick={() => setShowJsonDialog(false)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
