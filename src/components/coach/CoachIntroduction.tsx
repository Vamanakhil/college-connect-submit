
import React from "react";
import { FormHeader } from "../FormHeader";
import { Card, CardContent } from "@/components/ui/card";

export const CoachIntroduction = () => {
  return (
    <Card className="border border-[#9b87f5]/30">
      <CardContent className="p-6 pt-6">
        <FormHeader 
          title="Call for AI Coaches" 
          subtitle="Join Viswam.AI's Summer of AI Program" 
          logoUrl="https://viswam.ai/_astro/Viswam-logo-orig.CyQLCZHT_2jIQLX.svg"
        />
        
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            <span className="font-medium text-[#7E69AB]">Summer of AI</span> is Viswam.AI's flagship one-month program designed to upskill engineering students in end-to-end AI practice—from data wrangling to deploying a voluntary computed Telugu language model. Your guidance will help them apply classroom theory to real-world use-cases and, in the process, grow Telugu's presence in the digital AI ecosystem.
          </p>
          
          <h3 className="text-xl font-semibold text-[#7E69AB] mt-6 mb-3">AI Coaches will:</h3>
          <ul className="space-y-3 list-none pl-0">
            <li className="flex items-start">
              <span className="text-[#9b87f5] mr-2 mt-1">•</span>
              <span>
                <span className="font-medium">Deliver crisp mini-lectures</span> that break down AIML concepts into clear, relatable stories—helping newcomers bridge theory and practice in just 90 minutes
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#9b87f5] mr-2 mt-1">•</span>
              <span>
                <span className="font-medium">Guide & unblock student teams</span> during daily labs and weekly code-sprints, using proven mentoring best-practices
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#9b87f5] mr-2 mt-1">•</span>
              <span>
                <span className="font-medium">Model professional workflows</span> (GitLab MRs, code reviews, ethical-AI checks) and give constructive feedback that sharpens both technical skill and cultural-corpus quality
              </span>
            </li>
          </ul>
          
          <div className="bg-[#9b87f5]/10 p-4 rounded-lg border border-[#9b87f5]/20 mt-6 mb-2 italic">
            <p className="text-gray-700">
              "Whether you're an AIML wizard, a computer-networks guru, a hackathon trail-blazer, or a Git/GitLab powerhouse—if you're passionate about guiding the next wave of talent, we'd love to have you apply as an AI Coach."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
