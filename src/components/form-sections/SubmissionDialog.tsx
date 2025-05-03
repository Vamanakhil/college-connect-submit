
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface SubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submittedData: any;
}

export const SubmissionDialog: React.FC<SubmissionDialogProps> = ({
  open,
  onOpenChange,
  submittedData
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submitted Institution Details</DialogTitle>
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
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
