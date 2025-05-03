
export interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CollegeFormData {
  collegeName: string;
  principalName: string;
  principalEmail: string;
  principalPhone: string;
  pocName: string;
  pocEmail: string;
  pocPhone: string;
  tpoName: string;
  tpoEmail: string;
  tpoPhone: string;
  faculty: Faculty[];
}
