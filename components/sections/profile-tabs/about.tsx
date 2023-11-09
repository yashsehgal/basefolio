'use client';
import { Section } from "@/components/layouts"
import { CardContainer, FormItemWrapper, Input, Label } from "@/components/ui"
import { UserAuthenticationContext } from "@/contexts"
import { useContext } from "react"

const AboutTab: React.FunctionComponent = () => {
  const { userData, setUserData } = useContext(UserAuthenticationContext);

  return (
    <div className="about-tab-content-container">
      <CardContainer
        withSeparator
        title="Basic Information"
        subtitle="This information is useful for us to understand you better for offline/online events."
      >
        <div className="grid grid-cols-2 gap-12">
          <FormItemWrapper className="firstName-wrapper">
            <Label>First name</Label>
            <Input
              type="text"
              defaultValue={userData.fullName.firstName}
            />
          </FormItemWrapper>
          <FormItemWrapper className="lastName-wrapper">
            <Label>Last name</Label>
            <Input
              type="text"
              defaultValue={userData.fullName.lastName}
            />
          </FormItemWrapper>
        </div>

      </CardContainer>
    </div>
  )
}

export {
  AboutTab
}