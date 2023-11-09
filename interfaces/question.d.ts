declare interface QuestionInterface {
  title: string;
  type: "email" | "text" | "textarea";
  hackathonSlug: string;
  isRequired: boolean;
}
