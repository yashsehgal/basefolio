"use client";
import {
  Button,
  CardContainer,
  FormItemWrapper,
  Input,
  Label,
  MarkdownEditor,
} from "@/components/ui";
import { UserAuthenticationContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";

const AboutTab: React.FunctionComponent = () => {
  const { userData, setUserData } = useContext(UserAuthenticationContext);

  const [userDataInput, setUserDataInput] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    bio: "",
  });

  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    setUserDataInput({
      fullName: {
        firstName: userData.fullName.firstName,
        lastName: userData.fullName.lastName,
      },
      bio: userData.bio,
    });
  }, [userData]);

  useEffect(() => {
    // adding relative condition, if the data changes -- the changed button state will be updated
    setHasChanges(
      userData.fullName.firstName === userDataInput.fullName.firstName &&
        userData.fullName.lastName === userDataInput.fullName.lastName,
    );
  }, [userData, userDataInput]);

  return (
    <div className="about-tab-content-container grid gap-8">
      <CardContainer
        withSeparator
        title="Basic Information"
        subtitle="This information is useful for us to understand you better for offline/online events."
      >
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-6">
          <FormItemWrapper className="firstName-wrapper">
            <Label>First name</Label>
            <Input
              type="text"
              value={userDataInput.fullName.firstName}
              onChange={(e) =>
                setUserDataInput({
                  ...userDataInput,
                  fullName: {
                    ...userDataInput.fullName,
                    firstName: e.target.value as string,
                  },
                })
              }
            />
          </FormItemWrapper>
          <FormItemWrapper className="lastName-wrapper">
            <Label>Last name</Label>
            <Input
              type="text"
              value={userDataInput.fullName.lastName}
              onChange={(e) =>
                setUserDataInput({
                  ...userDataInput,
                  fullName: {
                    ...userDataInput.fullName,
                    lastName: e.target.value as string,
                  },
                })
              }
            />
          </FormItemWrapper>
        </div>
        <div className="mt-8 flex flex-row items-center justify-end">
          <Button disabled={hasChanges}>Save changes</Button>
        </div>
      </CardContainer>
      <CardContainer
        withSeparator
        title="About You"
        subtitle="This bio will be visible to your profile"
      >
        <MarkdownEditor
          value={userDataInput.bio}
          onChange={(changes) =>
            setUserDataInput({
              ...userDataInput,
              bio: changes as string,
            })
          }
        />
      </CardContainer>
    </div>
  );
};

export { AboutTab };
