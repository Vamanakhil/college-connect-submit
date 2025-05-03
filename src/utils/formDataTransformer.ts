
import { CollegeFormData, Faculty } from "@/types";

export const transformFormDataToApiFormat = (formData: CollegeFormData) => {
  // Transform faculty members
  const facultyPersons = formData.faculty.map((faculty: Faculty, index: number) => ({
    "Role": "Faculty",
    "Name": faculty.name,
    "Email Address": faculty.email,
    "Phone": faculty.phone,
    "Department": ""
  }));

  // Create the API format
  return [
    {
      "Institution Name": formData.collegeName,
      "Persons": [
        {
          "Role": "Principal",
          "Name": formData.principalName,
          "Email Address": formData.principalEmail,
          "Phone": formData.principalPhone
        },
        {
          "Role": "Point of Contact",
          "Name": formData.pocName,
          "Email Address": formData.pocEmail,
          "Phone": formData.pocPhone
        },
        {
          "Role": "Training and Placement Officer",
          "Name": formData.tpoName,
          "Email Address": formData.tpoEmail,
          "Phone": formData.tpoPhone
        },
        ...facultyPersons
      ]
    }
  ];
};
