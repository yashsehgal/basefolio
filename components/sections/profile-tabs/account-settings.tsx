'use client';
import { DELETE_ACCOUNT_DESCRIPTION } from "@/common/copy"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, CardContainer } from "@/components/ui"
import { UserAuthenticationContext } from "@/contexts"
import { deleteCookie } from "@/helpers"
import { deleteUserAccount } from "@/middleware"
import { useContext } from "react"

const AccountSettingsTab: React.FunctionComponent = () => {

  const { userData, setUserData } = useContext(UserAuthenticationContext);

  const handleLogOut = () => {
    // removing JWT and user detail cookies
    [
      "id",
      "jwt",
      "firstName",
      "lastName",
      "username",
      "profileAvatar",
      "email",
      "password",
      "bio",
      "education",
      "socialLinks",
      "experience",
    ].map((key: string) => {
      deleteCookie(key);
    });

    // routing to base route
    window.location.href = "/";
    // reseting the global user context after logging
    // out and clearing user cookies
  };

  const handleAccountDeletion = async () => {
    // run fetch request for account deletion
    const response = await deleteUserAccount(userData.id);
    if (response.status === "success") {
      handleLogOut();
    } else {
      console.log("ACCOUNT DELETION FAILED!");
    }
  }

  return (
    <div className="account-settings-tab-content-container">
      <CardContainer
        withSeparator
        title="Danger Zone"
        subtitle="Here are actions that are destructive for your account"
      >
        <div className="delete-account-layer flex flex-row items-center justify-between">
          <div className="w-2/3">
            <h2 className="text-xl font-medium">
              Delete Account
            </h2>
            <p className="text-zinc-400 text-sm">{DELETE_ACCOUNT_DESCRIPTION}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                {"Delete Account"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="alert-dialog-content-footer flex flex-row items-center justify-end gap-3 mt-2">
                <AlertDialogCancel />
                <AlertDialogAction asChild>
                  <Button variant="destructive" onClick={handleAccountDeletion}>
                    Yes, delete my account
                  </Button>
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContainer>
    </div>
  )
}

export {
  AccountSettingsTab
}