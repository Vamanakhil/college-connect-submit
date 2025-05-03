
import React from 'react';
import { Input } from '@/components/ui/input';

interface InstitutionInfoProps {
  collegeName: string;
  onChangeCollegeName: (value: string) => void;
  error?: string;
}

export const InstitutionInfo: React.FC<InstitutionInfoProps> = ({ 
  collegeName, 
  onChangeCollegeName, 
  error 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-gray-900">Institution Information</h3>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4">
        <div className="space-y-1">
          <label htmlFor="collegeName" className="text-sm font-medium text-gray-700">
            Name of the Institution*
          </label>
          <Input 
            id="collegeName"
            value={collegeName}
            onChange={(e) => onChangeCollegeName(e.target.value)}
            className={`${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter institution name"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
