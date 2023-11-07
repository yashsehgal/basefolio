import { ChangeEvent, useContext, useEffect, useState } from "react"
import { Input } from "@/components/ui";
import { motion } from "framer-motion"
import { cn } from "@/helpers";
import { DialogFooter } from "../dialog";
import { Button } from "../button";
import { Github } from 'lucide-react';
import { authorizeUser } from "@/middleware";
import { UserAuthenticationContext } from "@/contexts";

const LoginFlow: React.FunctionComponent = () => {
  // to switch between flows in login procedure
  const [flow, setFlow] = useState<LoginFlowType>("email");
  // to store the email input
  const [emailInput, setEmailInput] = useState<string>("");
  // to store the password input
  const [passwordInput, setPasswordInput] = useState<string>("");

  return (
    <>
      {flow === "email"
        && <LoginEmailInputView
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          setFlow={setFlow}
        />}
      {flow === "password"
        && <LoginPasswordInputView
          setFlow={setFlow}
          setPasswordInput={setPasswordInput}
          passwordInput={passwordInput}
          emailInput={emailInput}
        />}
      {flow === "email" && <> <div className="content-seperator flex flex-row items-center justify-between gap-3 text-neutral-200 select-none">
        <div className="h-[2px] w-full bg-neutral-100"></div>
        <span>{"OR"}</span>
        <div className="h-[2px] w-full bg-neutral-100"></div>
      </div>
        <DialogFooter>
          <Button size="large" variant="secondary" stretch>
            <Github className="w-5 h-5" />
            {"Continue with GitHub"}
          </Button>
        </DialogFooter></>}
    </>
  )
}

const LoginEmailInputView: React.FunctionComponent<LoginEmailInputViewProps> = ({
  emailInput,
  setEmailInput,
  setFlow
}) => {
  // auto-focus to login email input
  useEffect(() => {
    document.querySelector('input')?.focus();
  }, []);

  // method to make changes in email string storage
  const manageEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target?.value as string);
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Enter your email or username"
        className="px-6 py-4 text-lg placeholder:text-neutral-400 bg-neutral-100 focus:bg-neutral-50"
        onChange={manageEmailInputChange}
        onKeyDown={(e) => {
          if (emailInput && e.key === "Enter") setFlow("password");
        }}
        value={emailInput}
      />
      {emailInput && <Button
        stretch
        size="large"
        onClick={() => setFlow("password")}
      >
        {"Continue"}
      </Button>}
    </>
  )
}

const LoginPasswordInputView: React.FunctionComponent<LoginPasswordInputViewProps> = ({
  setFlow,
  passwordInput,
  setPasswordInput,
  emailInput
}) => {
  // auto-focus to login password input
  useEffect(() => {
    document.querySelector('input')?.focus();
  }, []);

  // method to make changes in password string storage
  const managePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target?.value as string);
  }

  const { userData, setUserData } = useContext(UserAuthenticationContext);

  return (
    <>
      <Input
        type="password"
        placeholder="Enter your password"
        className="px-6 py-4 text-lg placeholder:text-neutral-400 bg-neutral-100 focus:bg-neutral-50"
        onChange={managePasswordInputChange}
      />
      <div className=" grid grid-cols-2 gap-3 items-center">
        <Button
          stretch
          size="large"
          variant="secondary"
          onClick={() => {
            setFlow("email");
            // also, reseting the password input
            setPasswordInput("");
          }}
        >
          {"Go back"}
        </Button>
        {passwordInput && <Button
          stretch
          size="large"
          onClick={async () => {
            if (emailInput && passwordInput) {
              const { status, data } = await authorizeUser(emailInput, passwordInput);
              if (status === "success") {
                setUserData({
                  ...data
                });
              }
            }
          }}
        >
          {"Login"}
        </Button>}
      </div>
    </>
  )
}

export default LoginFlow;