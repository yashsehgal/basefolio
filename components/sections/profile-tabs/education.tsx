"use client";
import {
  Button,
  CardContainer,
  FormItemWrapper,
  Input,
  Label,
} from "@/components/ui";
import { UserAuthenticationContext } from "@/contexts";
import { cn, deleteCookie } from "@/helpers";
import {
  AuthorizedUserEducationOperations,
  fetchUserEducation,
} from "@/middleware";
import { Pencil, School } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { EmptyState } from "..";
import { EMPTY_STATE_CONTENT } from "@/common/copy";
import { notifier } from "@/hooks/useToast";
import { JWT_EXPIRATION_TIME } from "@/common";

const EducationTab: React.FunctionComponent = () => {
  const [education, setEducation] = useState<
    Array<AuthorizedUserEducationType>
  >([]);

  const { userData } = useContext(UserAuthenticationContext);

  const [notFound, setNotFound] = useState<boolean>(false);

  const [newEducationInput, setNewEducationInput] =
    useState<AuthorizedUserEducationType>({
      course: "",
      instituteName: "",
      description: "",
    });

  const [addNewEducation, setAddNewEducation] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await fetchUserEducation(userData.id);
      if (status === "success") {
        setEducation([...education, ...data]);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // updating the UI/client education list state
    setEducation(userData.education);
  }, [userData]);

  return (
    <div className="education-tab-content-container">
      <CardContainer
        withSeparator
        title="Educational Details"
        subtitle="Your educational details will be used to finds stats from your college/school."
        mainAction={
          !addNewEducation && (
            <Button onClick={() => setAddNewEducation(true)}>
              Add education
            </Button>
          )
        }
      >
        {addNewEducation && (
          <NewEducationInputForm
            newEducationInput={newEducationInput}
            setNewEducationInput={setNewEducationInput}
            setAddNewEducation={setAddNewEducation}
            // for modifying education list
            education={education}
            setEducation={setEducation}
          />
        )}
        {!notFound && education.length ? (
          <div>
            {education.map((educationItem, index) => {
              return (
                <EducationRowItem
                  key={index}
                  course={educationItem.course}
                  instituteName={educationItem.instituteName}
                  description={educationItem.description}
                  setEducation={setEducation}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState icon={School}>{EMPTY_STATE_CONTENT.EDUCATION}</EmptyState>
        )}
      </CardContainer>
    </div>
  );
};

const NewEducationInputForm: React.FunctionComponent<
  NewEducationInputFormProps
> = ({
  newEducationInput,
  setNewEducationInput,
  setAddNewEducation,
  education,
  setEducation,
}) => {
  const { userData, setUserData } = useContext(UserAuthenticationContext);

  const handleNewEducationUpdate = async () => {
    if (newEducationInput.course && newEducationInput.instituteName) {
      const updatedEducation: Array<AuthorizedUserEducationType> = [
        ...education,
        {
          course: newEducationInput.course,
          instituteName: newEducationInput.instituteName,
          description: newEducationInput.description,
        },
      ];

      const response = (
        await AuthorizedUserEducationOperations("update")
      ).method(updatedEducation, userData.id);

      // updating global context for user data on updating education timeline
      if ((await response).status === "success") {
        setUserData({
          ...(await response).data,
          isAuthenticated: true,
        });
        // updating education in cookies
        deleteCookie("education");
        document.cookie = `education=${JSON.stringify(
          (await response).data.education,
        )}; expires=${JWT_EXPIRATION_TIME} path=/`;
        // notifying the client-side / user
        notifier({
          title: "New Education added",
          description: `Your education from ${newEducationInput.instituteName} has been added to profile`,
        });
      }
    }

    // reseting the new education inputs
    setNewEducationInput({
      course: "",
      instituteName: "",
      description: "",
    });

    // switching the newEducationForm state to false
    setAddNewEducation(false);
  };

  return (
    <div className="new-education-form pt-4 pb-6 border-b border-b-zinc-100 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 items-start gap-4">
        <FormItemWrapper className="courseName-wrapper">
          <Label>Course Name</Label>
          <Input
            type="text"
            value={newEducationInput.course}
            onChange={(e) => {
              setNewEducationInput({
                ...newEducationInput,
                course: e.target.value as string,
              });
            }}
          />
        </FormItemWrapper>
        <FormItemWrapper className="instituteName-wrapper">
          <Label>Institute</Label>
          <Input
            type="text"
            value={newEducationInput.instituteName}
            onChange={(e) => {
              setNewEducationInput({
                ...newEducationInput,
                instituteName: e.target.value as string,
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
          value={newEducationInput.description}
          onChange={(e) => {
            setNewEducationInput({
              ...newEducationInput,
              description: e.target.value as string,
            });
          }}
        />
      </FormItemWrapper>
      <div className="flex flex-row items-center justify-end gap-4">
        <Button variant="solid" onClick={() => setAddNewEducation(false)}>
          Discard changes
        </Button>
        <Button variant="primary" onClick={handleNewEducationUpdate}>
          Save changes
        </Button>
      </div>
    </div>
  );
};

const EducationRowItem: React.FunctionComponent<EducationRowItemProps> = ({
  course,
  instituteName,
  description,
  setEducation = () => {},
}) => {
  const [editView, setEditView] = useState<boolean>(false);

  const { userData, setUserData } = useContext(UserAuthenticationContext);

  const [currentEducationInput, setCurrentEducationInput] =
    useState<AuthorizedUserEducationType>({
      course: "",
      instituteName: "",
      description: "",
    });

  useEffect(() => {
    setCurrentEducationInput((current) => ({
      ...current,
      course: course,
      instituteName: instituteName,
      description: description,
    }));
  }, []);

  const handleEducationRemoval = async () => {
    if (course && instituteName) {
      let updatedEducation = userData.education.filter((education) => {
        return (
          education.course.toLowerCase() !== course.toLowerCase() &&
          education.instituteName.toLowerCase() !== instituteName.toLowerCase()
        );
      });

      const response = (
        await AuthorizedUserEducationOperations("update")
      ).method(updatedEducation, userData.id);

      // updating global context for user data on updating education
      if ((await response).status === "success") {
        setUserData({
          ...(await response).data,
          isAuthenticated: true,
        });
        // updating education in cookies
        deleteCookie("education");
        document.cookie = `education=${JSON.stringify(
          (await response).data.education,
        )}; expires=${JWT_EXPIRATION_TIME} path=/`;
        // notifying the client-side / user
        notifier({
          title: "Education removed",
          description: `Removed ${course} from education`,
        });
      }
    }
  };

  const handleEducationDetailsUpdate = async () => {
    if (course && instituteName) {
      let updatedEducation = [
        ...userData.education.map((education) => {
          if (
            education.course === course &&
            education.instituteName === instituteName
          ) {
            return {
              course: currentEducationInput.course,
              instituteName: currentEducationInput.instituteName,
              description: currentEducationInput.description,
            };
          } else {
            return education;
          }
        }),
      ];

      const response = (
        await AuthorizedUserEducationOperations("update")
      ).method(updatedEducation, userData.id);

      // updating global context for user data on updating education
      // updating global context for user data on updating education
      if ((await response).status === "success") {
        setUserData({
          ...(await response).data,
          isAuthenticated: true,
        });
        // updating education in cookies
        deleteCookie("education");
        document.cookie = `education=${JSON.stringify(
          (await response).data.education,
        )}; expires=${JWT_EXPIRATION_TIME} path=/`;
        // notifying the client-side / user
        notifier({
          title: "Education Updated",
          description: `Updated ${currentEducationInput.course} from education`,
        });
      }
    }
  };

  return (
    <div className="education-row-card pt-4 pb-6 border-b border-b-zinc-100 grid grid-cols-1 gap-4">
      {!editView && (
        <div>
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col items-start gap-0.5">
              <h2 className="text-xl font-medium">{course}</h2>
              <p className="text-zinc-400 text-sm">
                {"from, " + instituteName}
              </p>
            </div>
            <div className="flex flex-row items-center justify-end gap-2">
              {!editView && (
                <Button
                  variant="solid"
                  size="small"
                  className="p-2"
                  onClick={() => {
                    setEditView(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="description-wrapper mt-4 w-[90%]">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      )}
      {editView && (
        <>
          <div className="grid grid-cols-2 items-start gap-4">
            <FormItemWrapper className="courseName-wrapper">
              <Label>Course Name</Label>
              <Input
                type="text"
                value={currentEducationInput.course}
                onChange={(e) => {
                  setCurrentEducationInput((current) => ({
                    ...current,
                    course: e.target.value as string,
                  }));
                }}
              />
            </FormItemWrapper>
            <FormItemWrapper className="instituteName-wrapper">
              <Label>Institute</Label>
              <Input
                type="text"
                value={currentEducationInput.instituteName}
                onChange={(e) => {
                  setCurrentEducationInput((current) => ({
                    ...current,
                    instituteName: e.target.value as string,
                  }));
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
              value={currentEducationInput.description}
              onChange={(e) => {
                setCurrentEducationInput((current) => ({
                  ...current,
                  description: e.target.value as string,
                }));
              }}
            />
          </FormItemWrapper>
          {editView && (
            <div className="flex flex-row items-center justify-between">
              <Button
                variant="destructive"
                onClick={() => {
                  handleEducationRemoval();
                  setEditView(false);
                }}
              >
                Remove education
              </Button>
              <div className="flex flex-row items-center justify-end gap-4">
                {course !== currentEducationInput.course ||
                instituteName !== currentEducationInput.instituteName ||
                description !== currentEducationInput.description ? (
                  <>
                    <Button
                      variant="solid"
                      onClick={() => {
                        setEditView(false);
                        // reseting the input changes, if done any
                        setCurrentEducationInput({
                          course,
                          instituteName,
                          description,
                        });
                      }}
                    >
                      Discard changes
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleEducationDetailsUpdate();
                        setEditView(false);
                      }}
                    >
                      Save changes
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setEditView(false);
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { EducationTab };
