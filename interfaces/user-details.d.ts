declare interface CollegeInterface {
  name: string;
}

declare interface EducationRowItemProps extends AuthorizedUserEducationType {
  setEducation: (educationList: Array<AuthorizedUserEducationType>) => void;
}

declare interface NewEducationInputFormProps {
  newEducationInput: AuthorizedUserEducationType;
  setNewEducationInput: (data: AuthorizedUserEducationType) => void;
  setAddNewEducation: (state: boolean) => void;
  education: Array<AuthorizedUserEducationType>;
  setEducation: (data: Array<AuthorizedUserEducationType>) => void;
}

declare interface ExperienceRowItemsProps extends AuthorizedUserExperienceType {
  setExperience: (experienceList: Array<AuthorizedUserExperienceType>) => void;
}

declare interface NewExperienceInputFormProps {
  newExperienceInput: AuthorizedUserExperienceType;
  setNewExperienceInput: (data: AuthorizedUserExperienceType) => void;
  setAddNewExperience: (state: boolean) => void;
  experience: Array<AuthorizedUserExperienceType>;
  setExperience: (data: Array<AuthorizedUserExperienceType>) => void;
}
