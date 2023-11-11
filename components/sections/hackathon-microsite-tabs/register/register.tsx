"use client";
import { NOT_AUTHORIZED_CONTENT } from "@/common/copy";
import { Section } from "@/components/layouts";
import { AuthView, Button, Progress, UI } from "@/components/ui";
import { UserAuthenticationContext } from "@/contexts";
import { cn } from "@/helpers";
import { useContext, useState } from "react";
import { QuestionsView } from "./questions-view";
import { DetailsView } from "./details-view";

const Register = (hackathonData: HackathonInterface) => {
  const { userData } = useContext(UserAuthenticationContext);
  return (
    <div className="register-content-container">
      {!userData.isAuthenticated && (
        <div className="register-notLoggedIn-reminder-container">
          <NotLoggedInWhileRegister />
        </div>
      )}
      {userData.isAuthenticated && (
        <div className="registration-flow-container">
          <RegistrationFlow {...hackathonData} />
        </div>
      )}
    </div>
  );
};

const RegistrationFlow = (hackathonData: HackathonInterface) => {
  const [view, setView] = useState<"details" | "questions">("details");
  return (
    <Section className="border rounded-2xl px-8 max-md:p-0 max-md:border-none grid gap-6">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-2xl font-semibold">
          {view === "details" ? "Basic Details" : "Questions from organizers"}
        </h3>
        <Button
          variant="secondary"
          onClick={() => {
            view === "details" ? setView("questions") : setView("details");
          }}
        >
          {view === "details" ? "Next step" : "Previous step"}
        </Button>
      </div>
      <Progress value={view === "details" ? 0 : 50} className="mb-4" />
      {view === "details" && <DetailsView />}
      {view === "questions" && (
        <QuestionsView hackathonSlug={hackathonData.slug} />
      )}
      <div className={cn("", view === "details" ? "flex flex-row justify-end" : "grid grid-cols-2 items-center gap-4")}>
        <Button
          variant="secondary"
          onClick={() => {
            view === "details" ? setView("questions") : setView("details");
          }}
          stretch={view === "questions"}
        >
          {view === "details" ? "Next step" : "Previous step"}
        </Button>
        {view === "questions" && <Button stretch>
          Submit application
        </Button>}
      </div>
    </Section>
  );
};

const NotLoggedInWhileRegister = () => {
  return (
    <Section className="w-fit mx-auto">
      <header>
        <h2 className="text-4xl font-semibold text-center">
          {NOT_AUTHORIZED_CONTENT.title}
        </h2>
        <p className="text-zinc-500 mt-2 text-center">
          {NOT_AUTHORIZED_CONTENT.subtitle.applying}
        </p>
      </header>
      <div className={cn("mt-6 grid grid-cols-1 w-full gap-2")}>
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
  );
};

export { Register };
