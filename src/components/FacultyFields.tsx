
import React from 'react';
import { Faculty } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateEmail, validatePhone } from '@/utils/formUtils';
import { Plus, Trash } from 'lucide-react';

interface FacultyFieldsProps {
  faculty: Faculty[];
  setFaculty: React.Dispatch<React.SetStateAction<Faculty[]>>;
  errors: Record<string, Record<string, string>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>;
}

export const FacultyFields: React.FC<FacultyFieldsProps> = ({ 
  faculty, 
  setFaculty, 
  errors, 
  setErrors 
}) => {
  const addFaculty = () => {
    const newId = crypto.randomUUID();
    setFaculty([...faculty, { id: newId, name: '', email: '', phone: '' }]);
  };

  const removeFaculty = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
    
    // Remove errors for this faculty member
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  const updateFaculty = (id: string, field: keyof Faculty, value: string) => {
    setFaculty(faculty.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));

    // Validate field
    validateFacultyField(id, field, value);
  };

  const validateFacultyField = (id: string, field: keyof Faculty, value: string) => {
    const newErrors = { ...errors };
    
    if (!newErrors[id]) {
      newErrors[id] = {};
    }

    if (field === 'name' && !value.trim()) {
      newErrors[id].name = 'Name is required';
    } else if (field === 'name') {
      delete newErrors[id].name;
    }

    if (field === 'email') {
      if (!value.trim()) {
        newErrors[id].email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors[id].email = 'Please enter a valid email';
      } else {
        delete newErrors[id].email;
      }
    }

    if (field === 'phone') {
      if (!value.trim()) {
        newErrors[id].phone = 'Phone number is required';
      } else if (!validatePhone(value)) {
        newErrors[id].phone = 'Please enter a valid 10-digit phone number';
      } else {
        delete newErrors[id].phone;
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Faculty Members</h3>
        <Button 
          type="button" 
          onClick={addFaculty}
          variant="outline" 
          className="flex items-center text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          <Plus size={16} className="mr-1" /> Add Faculty
        </Button>
      </div>
      
      {faculty.map((f, index) => (
        <div key={f.id} className="p-4 border rounded-md bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Faculty Member {index + 1}</h4>
            {faculty.length > 1 && (
              <Button 
                type="button" 
                onClick={() => removeFaculty(f.id)}
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash size={16} className="mr-1" /> Remove
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor={`faculty-${f.id}-name`} className="text-sm font-medium text-gray-700">
                Name*
              </label>
              <Input
                id={`faculty-${f.id}-name`}
                value={f.name}
                onChange={(e) => updateFaculty(f.id, 'name', e.target.value)}
                className={`${errors[f.id]?.name ? 'border-red-500' : ''}`}
                placeholder="Faculty Name"
              />
              {errors[f.id]?.name && (
                <p className="text-sm text-red-500">{errors[f.id].name}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor={`faculty-${f.id}-email`} className="text-sm font-medium text-gray-700">
                Email*
              </label>
              <Input
                id={`faculty-${f.id}-email`}
                type="email"
                value={f.email}
                onChange={(e) => updateFaculty(f.id, 'email', e.target.value)}
                className={`${errors[f.id]?.email ? 'border-red-500' : ''}`}
                placeholder="faculty@college.edu"
              />
              {errors[f.id]?.email && (
                <p className="text-sm text-red-500">{errors[f.id].email}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor={`faculty-${f.id}-phone`} className="text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <Input
                id={`faculty-${f.id}-phone`}
                type="tel"
                value={f.phone}
                onChange={(e) => updateFaculty(f.id, 'phone', e.target.value)}
                className={`${errors[f.id]?.phone ? 'border-red-500' : ''}`}
                placeholder="10-digit number"
                maxLength={10}
              />
              {errors[f.id]?.phone && (
                <p className="text-sm text-red-500">{errors[f.id].phone}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {faculty.length === 0 && (
        <div className="text-center p-6 border border-dashed rounded-md">
          <p className="text-gray-500 mb-4">No faculty members added yet</p>
          <Button 
            type="button" 
            onClick={addFaculty}
            variant="outline" 
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <Plus size={16} className="mr-1" /> Add First Faculty Member
          </Button>
        </div>
      )}
    </div>
  );
};
