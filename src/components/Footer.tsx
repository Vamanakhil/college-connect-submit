
import React from 'react';

interface PartnerLogo {
  src: string;
  alt: string;
}

const partnerLogos: PartnerLogo[] = [
  {
    src: "https://ozonetel.com/wp-content/uploads/2022/02/cropped-Logo-1.png",
    alt: "Ozonetel",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVopAtzxvNHk-pxyTNGqKdcQSUeRpTGEIsmPBtUUktbaV8nF49N4wgeCvmdzwqcHsVCM&usqp=CAU",
    alt: "Google for Developers",
  },
  {
    src: "https://hackday.aidays.io/assets/task-DkqHR0Kb.png",
    alt: "Hackday Logo",
  },
  {
    src: "https://www.iiit.ac.in/wp-content/uploads/2022/06/IIIT_Hyderabad_Logo-e1655116937986.jpg",
    alt: "IIIT Hyderabad",
  },
];

export const Footer: React.FC = () => {
  return (
    <div className="mt-12 pt-6 pb-8 border-t border-gray-200">
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">Our Partners</h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 px-4">
        {partnerLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              className="h-12 max-w-[140px] object-contain"
              style={{
                filter: 'grayscale(0%)',
                transition: 'transform 0.2s ease-in-out',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
