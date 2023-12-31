"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Input } from "..";
import { Section, ViewContainer } from "../../layouts";
import { cn } from "@/helpers";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { UserAuthenticationContext } from "@/contexts";
import {
  HackathonCityActionView,
  PastHackathonsActionView,
  UpcomingHackathonsActionView,
  UserSearchByCompanyActionView,
  UserSearchByLocationActionView,
  UserSearchByUsernameActionView,
} from "./command-k-search-actions";

declare type CategoryOptionType = "hackathons" | "projects" | "builders";

const SearchCategoryOptions: Array<{
  category: string;
}> = [
    { category: "hackathons" },
    { category: "builders" },
    { category: "projects" },
  ];

const SubCategoryOptions: {
  hackathons: Array<{ category: string }>;
  builders: Array<{ category: string }>;
  projects: Array<{ category: string }>;
} = {
  hackathons: [
    { category: "city" },
    { category: "past" },
    { category: "upcoming" },
    { category: "domain" },
  ],
  builders: [
    { category: "name" },
    { category: "location" },
    { category: "company" },
    { category: "college" },
  ],
  projects: [
    { category: "hackathon" },
    { category: "builder name" },
    { category: "tech" },
  ],
};

const CommandKSearch: React.FunctionComponent = () => {
  /**
   * storing state of main category option
   * > options:
   *  - hackathons
   *  - projects
   *  - builders
   */
  const [selectedOption, setSelectedOption] =
    useState<CategoryOptionType>("hackathons");
  /**
   * storing state of sub-option of the selected category
   * > hackathons:
   *  - city
   *  - past
   *  - upcoming
   *  - domain
   * > builders:
   *  - name
   *  - location
   *  - company
   *  - college
   * > projects
   *  - hackathons
   *  - builder name
   *  - tech
   */
  const [selectedSubOption, setSelectedSubOption] = useState<string>("");

  return (
    <Section className="command-k-search-container pb-0">
      <ViewContainer className="relative">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              variant="secondary"
              stretch
              className="p-2 shadow-sm hover:shadow-sm select-none"
            >
              <CommandKSearchButtonContent />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/20 inset-0 fixed" />
            <Dialog.Content asChild>
              <div
                className={cn(
                  "rounded-2xl bg-white p-3 w-[80%] min-h-[400px] grid grid-cols-1 gap-3 overflow-hidden",
                )}
                style={{
                  position: "fixed",
                  top: "38%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* <div className="bg-overlay bg-gradient-to-br from-white to-white/40 w-[800px] h-[900px] fixed -z-10 right-0 top-0" /> */}
                <div className="search-input-wrapper">
                  <Input
                    className="p-6"
                    placeholder="Search for hackathons, builders, projects or anything..."
                  />
                </div>
                <div className="command-search-content-wrapper grid grid-cols-3 gap-3">
                  <div className="search-categories-wrapper">
                    <SearchCatogoriesContent
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      setSelectedSubOption={setSelectedSubOption}
                    />
                  </div>
                  <div className="search-subCategories-wrapper">
                    <SearchSubCategoriesContent
                      selectedParent={selectedOption}
                      setSelectedSubOption={setSelectedSubOption}
                      selectedSubOption={selectedSubOption}
                    />
                  </div>
                  <div className="search-subCategory-action-wrapper">
                    <SearchSubCategoryActionContent
                      selectedSubCategory={selectedSubOption}
                      selectedMainCategory={selectedOption}
                    />
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </ViewContainer>
    </Section>
  );
};

const CommandKSearchButtonContent: React.FunctionComponent = () => {
  return (
    <div className="border border-neutral-200/60 rounded-lg pt-2 pb-2 pr-2 pl-4 w-full text-left flex flex-row items-center justify-between gap-6">
      <span className="text-neutral-400 truncate">
        {"Search for hackathons, builders, projects or anything..."}
      </span>
      <div className="flex flex-row items-center gap-2 justify-end">
        <kbd className="py-2 px-4 rounded-lg text-lg bg-neutral-100 border border-neutral-200">
          {"⌘"}
        </kbd>
        <kbd className="py-2 px-4 rounded-lg text-lg bg-neutral-100 border border-neutral-200">
          {"k"}
        </kbd>
      </div>
    </div>
  );
};

const SearchSubCategoryActionContent: React.FunctionComponent<{
  selectedSubCategory: string;
  selectedMainCategory: CategoryOptionType;
}> = ({ selectedSubCategory, selectedMainCategory }) => {
  return (
    <div className="search-category-content-container h-full border border-neutral-200 rounded-xl p-3 grid grid-cols-1 gap-3 bg-neutral-100">
      {/* renders for hackathon sub-options */}
      {selectedMainCategory === "hackathons" &&
        selectedSubCategory === "city" && <HackathonCityActionView />}
      {selectedMainCategory === "hackathons" &&
        selectedSubCategory === "past" && <PastHackathonsActionView />}
      {selectedMainCategory === "hackathons" &&
        selectedSubCategory === "upcoming" && <UpcomingHackathonsActionView />}
      {/* renders for projects sub-options */}
      {/* renders for builders sub-options */}
      {selectedMainCategory === "builders" &&
        selectedSubCategory === "name" && <UserSearchByUsernameActionView />}
      {selectedMainCategory === "builders" &&
        selectedSubCategory === "location" && <UserSearchByLocationActionView />}
      {selectedMainCategory === "builders" &&
        selectedSubCategory === "company" && <UserSearchByCompanyActionView />}
    </div>
  );
};

const SearchSubCategoriesContent: React.FunctionComponent<{
  selectedParent: CategoryOptionType;
  setSelectedSubOption: (option: string) => void;
  selectedSubOption: string;
}> = ({ selectedParent, setSelectedSubOption, selectedSubOption }) => {
  return (
    <div className="search-category-content-container border border-neutral-200 rounded-xl p-3 grid grid-cols-1 gap-3 bg-neutral-100">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {"Search via"}
      </div>
      {SubCategoryOptions[selectedParent].map((subOption, index) => {
        return (
          <motion.div
            initial={{
              opacity: 0,
              top: 24 * index * 2,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              top: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
            }}
            className="w-full"
            key={index}
          >
            <Button
              variant={"solid"}
              size="large"
              className={cn(
                "justify-between p-6 bg-white focus:shadow-2xl focus:scale-105 focus:outline-none",
                selectedSubOption === subOption.category
                  ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
                  : "focus:bg-neutral-800 focus:text-white hover:white",
              )}
              stretch
              onClick={() => setSelectedSubOption(subOption.category)}
            >
              {subOption.category}
              <ChevronRight />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

const SearchCatogoriesContent: React.FunctionComponent<{
  selectedOption: CategoryOptionType;
  setSelectedOption: (option: CategoryOptionType) => void;
  setSelectedSubOption: (option: string) => void;
}> = ({ selectedOption, setSelectedOption, setSelectedSubOption }) => {
  return (
    <div className="search-category-content-container border border-neutral-200 rounded-xl p-3 grid grid-cols-1 gap-3 bg-neutral-100">
      <div className="sub-category-headline cursor-default select-none text-base font-medium ml-1">
        {"Search for"}
      </div>
      {SearchCategoryOptions.map((option, index) => {
        return (
          <motion.div
            initial={{
              opacity: 0,
              top: 24 * index * 2,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              top: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
            }}
            className="w-full"
            key={index}
          >
            <Button
              variant={"solid"}
              size="large"
              className={cn(
                "justify-between p-6 bg-white focus:shadow-2xl focus:scale-105 focus:outline-none",
                selectedOption === option.category
                  ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
                  : "focus:bg-neutral-800 focus:text-white hover:bg-white",
              )}
              stretch
              onClick={() => {
                setSelectedOption(option.category as any);
                setSelectedSubOption("");
              }}
            >
              {option.category}
              <ChevronRight />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export { CommandKSearch };
