import { INITIAL_USER_AUTHORIZATION } from "@/common";
import { createContext, useState } from "react";

export const UserAuthenticationContext = createContext<{
  userData: AuthorizedUserType;
  setUserData: (value: AuthorizedUserType) => void;
}>({
  userData: INITIAL_USER_AUTHORIZATION,
  setUserData: () => { },
});

const UserAuthenticationProvider: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children }) => {
  const [userData, setUserData] = useState<AuthorizedUserType>(
    INITIAL_USER_AUTHORIZATION,
  );

  return (
    <UserAuthenticationContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserAuthenticationContext.Provider>
  );
};

export { UserAuthenticationProvider };
