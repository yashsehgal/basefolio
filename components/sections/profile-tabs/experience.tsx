import {
  Button,
  CardContainer,
  FormItemWrapper,
  Input,
  Label,
} from "@/components/ui";
import { UserAuthenticationContext } from "@/contexts";
import { fetchUserExperience } from "@/middleware";
import { useContext, useEffect, useState } from "react";
import { EmptyState } from "..";
import { EMPTY_STATE_CONTENT } from "@/common/copy";
import { Briefcase } from "lucide-react";
import { cn } from "@/helpers";

const ExperienceTab: React.FunctionComponent = () => {
  const [experience, setExperience] = useState<
    Array<AuthorizedUserExperienceType>
  >([]);
  const { userData } = useContext(UserAuthenticationContext);

  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await fetchUserExperience(userData.id);
      if (status === "success") {
        setExperience(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="experience-tab-content-container">
      <CardContainer
        withSeparator
        title="Work experience"
        subtitle="Your work experience will be used to finds stats from your company/organization."
        mainAction={<Button>{"Add work experience"}</Button>}
      >
        {!notFound && experience.length ? (
          <div>
            {experience.map((experienceItem, index) => {
              return (
                <ExperienceRowItem
                  title={experienceItem.title}
                  description={experienceItem.description}
                  company={experienceItem.company}
                  setExperience={setExperience}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState icon={Briefcase}>
            {EMPTY_STATE_CONTENT.EXPERIENCE}
          </EmptyState>
        )}
      </CardContainer>
    </div>
  );
};

const NewExperienceInputForm: React.FunctionComponent<
  NewExperienceInputFormProps
> = ({
  setAddNewExperience,
  experience,
  setNewExperienceInput,
  newExperienceInput,
}) => {
  return (
    <div className="new-experience-form pt-4 pb-6 border-b border-b-zinc-100 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 items-start gap-4">
        <FormItemWrapper className="courseName-wrapper">
          <Label>Course Name</Label>
          <Input
            type="text"
            value={newExperienceInput.title}
            onChange={(e) => {
              setNewExperienceInput({
                ...newExperienceInput,
                title: e.target.value as string,
              });
            }}
          />
        </FormItemWrapper>
        <FormItemWrapper className="instituteName-wrapper">
          <Label>Institute</Label>
          <Input
            type="text"
            value={newExperienceInput.company.name}
            onChange={(e) => {
              setNewExperienceInput({
                ...newExperienceInput,
                company: {
                  ...newExperienceInput.company,
                  name: e.target.value as string,
                },
              });
            }}
          />
        </FormItemWrapper>
      </div>
      <FormItemWrapper className="description-wrapper">
        <Label>Description</Label>
        <textarea
          className={cn(
            "w-full min-h-[160px] rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 transition-all",
          )}
          value={newExperienceInput.description}
          onChange={(e) => {
            setNewExperienceInput({
              ...newExperienceInput,
              description: e.target.value as string,
            });
          }}
        />
      </FormItemWrapper>
      <div className="flex flex-row items-center justify-end gap-4">
        <Button variant="solid" onClick={() => setAddNewExperience(false)}>
          Discard changes
        </Button>
        <Button variant="primary">Save changes</Button>
      </div>
    </div>
  );
};

const ExperienceRowItem: React.FunctionComponent<ExperienceRowItemsProps> = ({
  company,
  title,
  description,
}) => {
  const [editView, setEditView] = useState<boolean>(false);

  const { userData, setUserData } = useContext(UserAuthenticationContext);

  const [currentExperienceInput, setCurrentExperienceInput] =
    useState<AuthorizedUserExperienceType>({
      title: "",
      company: {
        name: "",
        website: "",
      },
      description: "",
    });

  return <div className="experience-row-card"></div>;
};

export { ExperienceTab };
