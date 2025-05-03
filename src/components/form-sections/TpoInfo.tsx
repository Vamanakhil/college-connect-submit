
import React from 'react';
import { Input } from '@/components/ui/input';

interface TpoInfoProps {
  tpoName: string;
  tpoEmail: string;
  tpoPhone: string;
  onChangeTpoName: (value: string) => void;
  onChangeTpoEmail: (value: string) => void;
  onChangeTpoPhone: (value: string) => void;
  errors: {
    tpoName?: string;
    tpoEmail?: string;
    tpoPhone?: string;
  };
}

export const TpoInfo: React.FC<TpoInfoProps> = ({
  tpoName,
  tpoEmail,
  tpoPhone,
  onChangeTpoName,
  onChangeTpoEmail,
  onChangeTpoPhone,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-gray-900">Training and Placement Officer</h3>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label htmlFor="tpoName" className="text-sm font-medium text-gray-700">
            Name*
          </label>
          <Input 
            id="tpoName"
            value={tpoName}
            onChange={(e) => onChangeTpoName(e.target.value)}
            className={`${errors.tpoName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter TPO name"
          />
          {errors.tpoName && (
            <p className="text-sm text-red-500">{errors.tpoName}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="tpoEmail" className="text-sm font-medium text-gray-700">
            Email*
          </label>
          <Input 
            id="tpoEmail"
            type="email"
            value={tpoEmail}
            onChange={(e) => onChangeTpoEmail(e.target.value)}
            className={`${errors.tpoEmail ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter TPO email"
          />
          {errors.tpoEmail && (
            <p className="text-sm text-red-500">{errors.tpoEmail}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="tpoPhone" className="text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <Input 
            id="tpoPhone"
            type="tel"
            value={tpoPhone}
            onChange={(e) => onChangeTpoPhone(e.target.value)}
            className={`${errors.tpoPhone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="10-digit number"
            maxLength={10}
          />
          {errors.tpoPhone && (
            <p className="text-sm text-red-500">{errors.tpoPhone}</p>
          )}
        </div>
      </div>
    </div>
  );
};
