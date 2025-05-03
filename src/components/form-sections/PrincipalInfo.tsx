
import React from 'react';
import { Input } from '@/components/ui/input';

interface PrincipalInfoProps {
  principalName: string;
  principalEmail: string;
  principalPhone: string;
  onChangePrincipalName: (value: string) => void;
  onChangePrincipalEmail: (value: string) => void;
  onChangePrincipalPhone: (value: string) => void;
  errors: {
    principalName?: string;
    principalEmail?: string;
    principalPhone?: string;
  };
}

export const PrincipalInfo: React.FC<PrincipalInfoProps> = ({
  principalName,
  principalEmail,
  principalPhone,
  onChangePrincipalName,
  onChangePrincipalEmail,
  onChangePrincipalPhone,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4">
      <div className="space-y-1">
        <label htmlFor="principalName" className="text-sm font-medium text-gray-700">
          Name of the Principal*
        </label>
        <Input
          id="principalName"
          value={principalName}
          onChange={(e) => onChangePrincipalName(e.target.value)}
          className={`${errors.principalName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter principal's name"
        />
        {errors.principalName && (
          <p className="text-sm text-red-500">{errors.principalName}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="principalEmail" className="text-sm font-medium text-gray-700">
          Principal's Email*
        </label>
        <Input
          id="principalEmail"
          type="email"
          value={principalEmail}
          onChange={(e) => onChangePrincipalEmail(e.target.value)}
          className={`${errors.principalEmail ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter principal's email"
        />
        {errors.principalEmail && (
          <p className="text-sm text-red-500">{errors.principalEmail}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="principalPhone" className="text-sm font-medium text-gray-700">
          Principal's Phone Number*
        </label>
        <Input
          id="principalPhone"
          type="tel"
          value={principalPhone}
          onChange={(e) => onChangePrincipalPhone(e.target.value)}
          className={`${errors.principalPhone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="10-digit number"
          maxLength={10}
        />
        {errors.principalPhone && (
          <p className="text-sm text-red-500">{errors.principalPhone}</p>
        )}
      </div>
    </div>
  );
};
