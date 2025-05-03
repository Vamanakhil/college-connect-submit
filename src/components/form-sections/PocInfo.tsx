
import React from 'react';
import { Input } from '@/components/ui/input';

interface PocInfoProps {
  pocName: string;
  pocEmail: string;
  pocPhone: string;
  onChangePocName: (value: string) => void;
  onChangePocEmail: (value: string) => void;
  onChangePocPhone: (value: string) => void;
  errors: {
    pocName?: string;
    pocEmail?: string;
    pocPhone?: string;
  };
}

export const PocInfo: React.FC<PocInfoProps> = ({
  pocName,
  pocEmail,
  pocPhone,
  onChangePocName,
  onChangePocEmail,
  onChangePocPhone,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-gray-900">Point of Contact for SOAI Initiative</h3>
      
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label htmlFor="pocName" className="text-sm font-medium text-gray-700">
            Name*
          </label>
          <Input 
            id="pocName"
            value={pocName}
            onChange={(e) => onChangePocName(e.target.value)}
            className={`${errors.pocName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter POC name"
          />
          {errors.pocName && (
            <p className="text-sm text-red-500">{errors.pocName}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="pocEmail" className="text-sm font-medium text-gray-700">
            Email*
          </label>
          <Input 
            id="pocEmail"
            type="email"
            value={pocEmail}
            onChange={(e) => onChangePocEmail(e.target.value)}
            className={`${errors.pocEmail ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter POC email"
          />
          {errors.pocEmail && (
            <p className="text-sm text-red-500">{errors.pocEmail}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="pocPhone" className="text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <Input 
            id="pocPhone"
            type="tel"
            value={pocPhone}
            onChange={(e) => onChangePocPhone(e.target.value)}
            className={`${errors.pocPhone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="10-digit number"
            maxLength={10}
          />
          {errors.pocPhone && (
            <p className="text-sm text-red-500">{errors.pocPhone}</p>
          )}
        </div>
      </div>
    </div>
  );
};
