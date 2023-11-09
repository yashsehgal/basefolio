"use client";
import { useState } from "react";
import { UI } from "..";
import { cn } from "@/helpers";
import LoginFlow from "./login";
import { CreateAccountFlow } from "./create-account";

const AuthView: React.FunctionComponent<{ initialView: AuthFlowViewType }> = ({ initialView = "login" }) => {
  const [view, setView] = useState<AuthFlowViewType>(initialView);
  return (
    <UI.DialogContent>
      <UI.DialogHeader className="mb-3">
        <UI.DialogTitle className="text-4xl font-semibold">
          {view === "login" ? "Login" : "Create Account"}
        </UI.DialogTitle>
        <UI.DialogDescription className="text-zinc-400 text-base">
          {view === "login" ? (
            <>Don&apos;t have an account?</>
          ) : (
            <>Already have an account?</>
          )}{" "}
          <button
            className="text-zinc-800"
            onClick={() => {
              if (view === "login") setView("create-account");
              else setView("login");
            }}
          >
            {view === "login" ? "Create here" : "Login"}
          </button>
        </UI.DialogDescription>
      </UI.DialogHeader>
      <div
        className={cn("authview-dialog-content-body grid grid-cols-1 gap-4")}
      >
        {view === "login" ? <LoginFlow /> : <CreateAccountFlow />}
      </div>
    </UI.DialogContent>
  );
};

export { AuthView };
