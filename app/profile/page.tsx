'use client';
import { ProfileViewLayout } from "@/components/layouts";
import { AboutTab } from "@/components/sections";
import { useState } from "react";

const ProfileView: React.FunctionComponent = () => {
  // selected tab storage state
  const [selectedTab, setSelectedTab] = useState<ProfileViewTabsType>("about");
  return (
    <>
      <ProfileViewLayout selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
        {selectedTab === "about" && <AboutTab />}
      </ProfileViewLayout>
    </>
  )
}

export default ProfileView;