import React, { useEffect, useState } from "react";
import { DialogFooter } from "../dialog";
import { Button } from "../button";
import { CheckCircle2, Github, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/helpers";
import { motion } from "framer-motion";
import { registerUser } from "@/middleware";

const CreateAccountFlow: React.FunctionComponent<{ setView: (view: AuthFlowViewType) => void; }> = ({
  setView
}) => {
  // to switch between flows in account creation procedure
  const [flow, setFlow] = useState<CreateAccountFlowType>("name");

  // account creation input fields state
  const [createAccountData, setCreateAccountData] =
    useState<CreateAccountDataType>({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });

  return (
    <>
      {flow === "name" && (
        <CreateAccountNameInputView
          setCreateAccountData={setCreateAccountData}
          data={createAccountData}
          setFlow={setFlow}
        />
      )}
      {flow === "email" && (
        <CreateAccountEmailInputView
          setCreateAccountData={setCreateAccountData}
          data={createAccountData}
          setFlow={setFlow}
        />
      )}
      {flow === "password" && (
        <CreateAccountPasswordInputView
          setCreateAccountData={setCreateAccountData}
          data={createAccountData}
          setFlow={setFlow}
          setView={setView}
        />
      )}
      {flow === "name" && (
        <>
          {" "}
          <div className="content-seperator flex flex-row items-center justify-between gap-3 text-zinc-200 select-none">
            <div className="h-[2px] w-full bg-zinc-100"></div>
            <span>{"OR"}</span>
            <div className="h-[2px] w-full bg-zinc-100"></div>
          </div>
          <DialogFooter>
            <Button size="large" variant="secondary" stretch>
              <Github className="w-5 h-5" />
              {"Continue with GitHub"}
            </Button>
          </DialogFooter>
        </>
      )}
    </>
  );
};

const CreateAccountNameInputView: React.FunctionComponent<
  CreateAccountNameInputViewProps
> = ({ data, setCreateAccountData, setFlow }) => {
  // auto-focus to first name input
  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 items-center gap-3">
        <Input
          type="text"
          placeholder="First name"
          className="px-6 py-4 text-lg placeholder:text-zinc-400 bg-zinc-100 focus:bg-zinc-50"
          onChange={(e: any) => {
            setCreateAccountData({
              ...data,
              firstName: e.target.value as string,
            });
          }}
          value={data.firstName}
        />
        <Input
          type="text"
          placeholder="Last name"
          className="px-6 py-4 text-lg placeholder:text-zinc-400 bg-zinc-100 focus:bg-zinc-50"
          onChange={(e: any) => {
            setCreateAccountData({
              ...data,
              lastName: e.target.value as string,
            });
          }}
          value={data.lastName}
        />
      </div>
      <Input
        type="text"
        placeholder="Create a username"
        className="px-6 py-4 text-lg placeholder:text-zinc-400 bg-zinc-100 focus:bg-zinc-50"
        onChange={(e: any) => {
          setCreateAccountData({
            ...data,
            username: e.target.value as string,
          });
        }}
        value={data.username}
      />
      {data.username && (
        <Button size="large" stretch onClick={() => setFlow("email")}>
          {"Next"}
        </Button>
      )}
    </>
  );
};

const CreateAccountEmailInputView: React.FunctionComponent<
  CreateAccountEmailInputViewProps
> = ({ data, setCreateAccountData, setFlow }) => {
  // auto-focus to login email input
  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);
  return (
    <>
      <Input
        type="text"
        placeholder="Enter your email"
        className="px-6 py-4 text-lg placeholder:text-zinc-400 bg-zinc-100 focus:bg-zinc-50"
        onChange={(e: any) => {
          setCreateAccountData({
            ...data,
            email: e.target.value as string,
          });
        }}
        value={data.email}
      />
      <div className=" grid grid-cols-2 gap-3 items-center">
        <Button
          size="large"
          stretch
          variant="secondary"
          onClick={() => setFlow("name")}
        >
          {"Go back"}
        </Button>
        {data.email && (
          <Button size="large" stretch onClick={() => setFlow("password")}>
            {"Next"}
          </Button>
        )}
      </div>
    </>
  );
};

const CreateAccountPasswordInputView: React.FunctionComponent<
  CreateAccountPasswordInputViewProps
> = ({ setFlow, setCreateAccountData, data, setView }) => {

  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState<string>("");
  const [isPasswordMatching, setIsPasswordMatching] = useState<boolean>(false);

  // auto-focus to login password input
  useEffect(() => {
    document.querySelector("input")?.focus();
  }, []);

  useEffect(() => {
    if (data.password && passwordConfirmationInput) {
      setIsPasswordMatching(data.password === passwordConfirmationInput);
    }
  }, [data.password, passwordConfirmationInput]);

  const handleCreateAccount = async () => {
    const response = await registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    });

    if (response.status === "success") {
      setView("login");
    }
  }

  return (
    <>
      <Input
        type="password"
        placeholder="Create a password"
        className="px-6 py-4 text-lg placeholder:text-zinc-400 bg-zinc-100 focus:bg-zinc-50"
        onChange={(e: any) => {
          setCreateAccountData({
            ...data,
            password: e.target.value as string,
          });
        }}
      />
      <Input
        type="password"
        placeholder="Confirm your password"
        className="px-6 py-4 text-lg placeholder:text-zinc-400 bg-zinc-100 focus:bg-zinc-50"
        onChange={(e) => setPasswordConfirmationInput(e.target.value as string)}
      />
      {/* show the supportive text only when there are SOME input in both data.password & passwordConfirmationInput */}
      {(data.password && passwordConfirmationInput) && <motion.div
        className={cn("text-sm font-medium flex flex-row items-center gap-2",
          isPasswordMatching ? "text-green-500" : "text-red-500"
        )}
        initial={{
          y: 4,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
      >
        {isPasswordMatching ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        {isPasswordMatching ? 'Matched' : 'Not matching'}
      </motion.div>}
      <div className=" grid grid-cols-2 gap-3 items-center">
        <Button
          size="large"
          stretch
          variant="secondary"
          onClick={() => {
            setFlow("email");
            // reseting the confirm password input
            setPasswordConfirmationInput("");
          }}
        >
          {"Go back"}
        </Button>
        <Button size="large" stretch disabled={!isPasswordMatching} onClick={handleCreateAccount}>
          {"Create account"}
        </Button>
      </div>
    </>
  );
};

export { CreateAccountFlow };
