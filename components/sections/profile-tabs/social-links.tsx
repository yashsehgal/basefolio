"use client";
import { Button, CardContainer, Input } from "@/components/ui";
import { UserAuthenticationContext } from "@/contexts";
import { useContext, useEffect, useState } from "react";
import { Check, Trash } from "lucide-react";
import { AuthorizedUserSocialLinksOperations } from "@/middleware";
import { JWT_EXPIRATION_TIME } from "@/common";
import { deleteCookie } from "@/helpers";
import { useToast } from "@/hooks/useToast";
import { link } from "fs";

const SocialLinksTab: React.FunctionComponent = () => {
  const { userData, setUserData } = useContext(UserAuthenticationContext);

  // for toggling notifier state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // notifier instance
  const { notifier } = useToast();

  const [socialLinks, setSocialLinks] = useState<
    Array<AuthorizedUserSocialLinksType>
  >([]);

  // adding the current social links to the client social links list
  useEffect(() => {
    if (userData.socialLinks && userData.socialLinks.length) {
      setSocialLinks([...userData.socialLinks]);
      // also updating local cookies with userData
      deleteCookie("socialLinks");
      document.cookie = `socialLinks=${JSON.stringify(
        userData.socialLinks,
      )}; expires=${JWT_EXPIRATION_TIME} path=/`;
    }
  }, [userData]);

  const [newSocialLinkInput, setNewSocialLinkInput] = useState<{
    title: string;
    link: string;
  }>({
    title: "",
    link: "",
  });

  const handleNewSocialLinkUpdate = async () => {
    if (newSocialLinkInput.title && newSocialLinkInput.link) {
      const updatedSocialLinks: Array<AuthorizedUserSocialLinksType> = [
        ...socialLinks,
        {
          title: newSocialLinkInput.title,
          link: newSocialLinkInput.link,
        },
      ];

      const response = (
        await AuthorizedUserSocialLinksOperations("update")
      ).method(updatedSocialLinks, userData.id);

      // updating global context for user data on updating social links
      if ((await response).status === "success") {
        setUserData({
          ...(await response).data,
          isAuthenticated: true,
        });
        // notifying the client-side / user
        notifier({
          title: "New social link added",
          description: `Added ${newSocialLinkInput.title} to social links`,
        });
      }
    }

    // reseting the new social link inputs
    setNewSocialLinkInput({
      title: "",
      link: "",
    });
  };

  // checking context update globally
  useEffect(() => {
    // updating cookie data for socialLinks and removing the old socialLinks cookie
    deleteCookie("socialLinks");
    document.cookie = `socialLinks=${JSON.stringify(
      userData.socialLinks,
    )}; expires=${JWT_EXPIRATION_TIME} path=/`;
  }, [userData]);

  return (
    <>
      <div className="social-links-tab-content-container">
        <CardContainer
          withSeparator
          title="Social Links"
          subtitle="These links will be displayed on your profile"
        >
          <div className="social-links-header flex flex-row gap-4">
            <div className="social-links-title-col-wrapper w-1/3 cursor-default select-none uppercase text-zinc-400 text-sm font-semibold">
              {"Website Name"}
            </div>
            <div className="social-links-title-col-wrapper w-2/3 cursor-default select-none uppercase text-zinc-400 text-sm font-semibold">
              {"URL"}
            </div>
          </div>
          <div className="social-links-input-content-container mt-4 grid grid-cols-1 gap-4">
            {/* Mapping the existing social links */}
            {socialLinks.map((socialLink, index) => {
              return (
                <LinkRowContainer
                  key={index}
                  allSocialLinks={socialLinks}
                  setAllSocialLinks={setSocialLinks}
                  data={socialLink}
                />
              );
            })}
            <div className="social-link-wrapper flex flex-row gap-4">
              <Input
                type="text"
                placeholder="Name"
                className="w-1/3"
                value={newSocialLinkInput.title}
                onChange={(e) => {
                  setNewSocialLinkInput({
                    ...newSocialLinkInput,
                    title: e.target.value as string,
                  });
                }}
              />
              <div className="w-2/3 flex flex-row items-center gap-4">
                <Input
                  type="text"
                  placeholder="Enter the website link"
                  value={newSocialLinkInput.link}
                  onChange={(e) => {
                    setNewSocialLinkInput({
                      ...newSocialLinkInput,
                      link: e.target.value as string,
                    });
                  }}
                />
                <Button
                  className="p-3"
                  disabled={
                    !newSocialLinkInput.title || !newSocialLinkInput.link
                  }
                  onClick={handleNewSocialLinkUpdate}
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
      {/* All notifiers */}
      {/* <Notifier
        title={`Added ${newSocialLinkInput.title} to links`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
    </>
  );
};

const LinkRowContainer: React.FunctionComponent<LinkRowContainerProps> = ({
  allSocialLinks,
  setAllSocialLinks,
  data,
}) => {
  const [linkInput, setLinkInput] = useState<AuthorizedUserSocialLinksType>({
    title: "",
    link: "",
  });

  // notifier instance
  const { notifier } = useToast();

  const { userData, setUserData } = useContext(UserAuthenticationContext);

  // Storing the data prop into native state storage
  useEffect(() => {
    setLinkInput({
      ...linkInput,
      title: data.title,
      link: data.link,
    });
  }, []);

  const handleSocialLinkDeletion = async () => {
    if (data.title && allSocialLinks.length) {
      // removing the link from socialLinks array if present
      let updatedSocialLinks = allSocialLinks.filter((link) => {
        return link.title.toLowerCase() !== data.title.toLowerCase();
      });

      const response = (
        await AuthorizedUserSocialLinksOperations("update")
      ).method(updatedSocialLinks, userData.id);

      // updating global context for user data on updating social links
      if ((await response).status === "success") {
        setUserData({
          ...(await response).data,
          isAuthenticated: true,
        });
        // notifying the client-side / user
        notifier({
          title: "Link removed",
          description: `Removed ${data.title} from social links`,
        });
      }
    }
  };

  return (
    <div className="social-link-wrapper flex flex-row gap-4">
      <Input
        type="text"
        placeholder="Name"
        className="w-1/3"
        value={linkInput.title}
        onChange={(e) => {
          setLinkInput({
            ...linkInput,
            title: e.target.value as string,
          });
        }}
      />
      <div className="w-2/3 flex flex-row items-center gap-4">
        <Input
          type="text"
          placeholder="Enter the website link"
          value={linkInput.link}
          onChange={(e) => {
            setLinkInput({
              ...linkInput,
              link: e.target.value as string,
            });
          }}
        />
        <div className="flex flex-row items-center justify-end gap-2">
          <Button
            variant="destructive"
            className="p-3"
            onClick={handleSocialLinkDeletion}
          >
            <Trash className="w-4 h-4" />
          </Button>
          {(data.link !== linkInput.link || data.title !== linkInput.title) && (
            <Button className="p-3">
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { SocialLinksTab };
