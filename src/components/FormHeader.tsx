
import React from 'react';

interface FormHeaderProps {
  title: string;
  subtitle?: string;
  logoUrl?: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, logoUrl }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 mb-4">
        {logoUrl && (
          <div className="w-32 sm:w-40 flex-shrink-0">
            <img src={logoUrl} alt="Logo" className="w-full h-auto" />
          </div>
        )}
        <div className={`text-center ${logoUrl ? 'sm:text-left' : ''}`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-base sm:text-lg text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};
