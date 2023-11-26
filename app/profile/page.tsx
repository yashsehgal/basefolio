"use client";
import { ProfileViewLayout } from "@/components/layouts";
import { AboutTab, SocialLinksTab } from "@/components/sections";
import { AccountSettingsTab } from "@/components/sections/profile-tabs";
import { useState } from "react";

const ProfileView: React.FunctionComponent = () => {
  // selected tab storage state
  const [selectedTab, setSelectedTab] = useState<ProfileViewTabsType>("about");
  return (
    <>
      <ProfileViewLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      >
        {selectedTab === "about" && <AboutTab />}
        {selectedTab === "links" && <SocialLinksTab />}
        {selectedTab === "account-settings" && <AccountSettingsTab />}
      </ProfileViewLayout>
    </>
  );
};

export default ProfileView;
