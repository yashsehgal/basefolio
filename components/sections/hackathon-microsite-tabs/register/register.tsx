'use client';
import { NOT_AUTHORIZED_CONTENT } from "@/common/copy";
import { Section } from "@/components/layouts";
import { AuthView, Button, UI } from "@/components/ui";
import { UserAuthenticationContext } from "@/contexts"
import { cn } from "@/helpers";
import { useContext, useState } from "react"
import { QuestionsView } from "./questions-view";

const Register = (hackathonData: HackathonInterface) => {
  const { userData } = useContext(UserAuthenticationContext);
  return (
    <div className="register-content-container">
      {!userData.isAuthenticated && <div className="register-notLoggedIn-reminder-container">
        <NotLoggedInWhileRegister />
      </div>}
      {userData.isAuthenticated && <div className="registration-flow-container">
        <RegistrationFlow {...hackathonData} />
      </div>}
    </div>
  )
}

const RegistrationFlow = (hackathonData: HackathonInterface) => {
  const [view, setView] = useState<"details" | "questions">("questions");
  return (
    <Section className="border rounded-2xl px-8 max-md:p-0 max-md:border-none grid gap-6">
      {view === "questions" && <QuestionsView hackathonSlug={hackathonData.slug} />}
    </Section>
  )
}

const NotLoggedInWhileRegister = () => {
  return (
    <Section className="w-fit mx-auto">
      <header>
        <h2 className="text-4xl font-semibold text-center">{NOT_AUTHORIZED_CONTENT.title}</h2>
        <p className="text-zinc-500 mt-2 text-center">{NOT_AUTHORIZED_CONTENT.subtitle.applying}</p>
      </header>
      <div
        className={cn(
          "mt-6 grid grid-cols-1 w-full gap-2",
        )}
      >
        <UI.Dialog>
          <UI.DialogTrigger asChild>
            <Button variant="secondary">Login</Button>
          </UI.DialogTrigger>
          <UI.DialogOverlay>
            <AuthView initialView="login" />
          </UI.DialogOverlay>
        </UI.Dialog>
        <div className="separator flex flex-row items-center gap-2 cursor-default select-none">
          <div className="w-full h-[1px] bg-zinc-200" />
          <span className="text-zinc-400/80 text-xs">{"OR"}</span>
          <div className="w-full h-[1px] bg-zinc-200" />
        </div>
        <UI.Dialog>
          <UI.DialogTrigger asChild>
            <Button>Create account</Button>
          </UI.DialogTrigger>
          <UI.DialogOverlay>
            <AuthView initialView="create-account" />
          </UI.DialogOverlay>
        </UI.Dialog>
      </div>
    </Section>
  )
}

export {
  Register
}