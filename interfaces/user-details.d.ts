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
