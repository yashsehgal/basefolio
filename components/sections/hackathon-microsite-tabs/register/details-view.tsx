import { FormItemWrapper, Input, Label } from "@/components/ui";
import { cn } from "@/helpers";
import { useState } from "react";

const DetailsView = () => {
  const [userLinksData, setUserLinksData] = useState({
    github: "",
    portfolio: "",
    twitter: ""
  });

  const [experienceInput, setExperienceInput] = useState<string>("");

  return <div className="details-view-container grid gap-12">
    <FormItemWrapper>
      <Label>GitHub profile</Label>
      <Input
        type="text"
        placeholder="eg. github.com/your-username"
        onChange={(e) => {
          setUserLinksData({
            ...userLinksData,
            github: e.target.value as string
          })
        }}
      />
    </FormItemWrapper>
    <FormItemWrapper>
      <Label>Portfolio / Personal website</Label>
      <Input
        type="text"
        placeholder="Link to your personal website, blog or anything..."
        onChange={(e) => {
          setUserLinksData({
            ...userLinksData,
            portfolio: e.target.value as string
          })
        }}
      />
    </FormItemWrapper>
    <FormItemWrapper>
      <Label>Twitter profile</Label>
      <Input
        type="text"
        placeholder="eg. twitter.com/@username"
        onChange={(e) => {
          setUserLinksData({
            ...userLinksData,
            twitter: e.target.value as string
          })
        }}
      />
    </FormItemWrapper>
    <FormItemWrapper>
      <Label>What is your best thing you&apos;ve built? And what issues you faced, also how you solved them?</Label>
      <textarea
        className={cn(
          "w-full min-h-[160px] rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
        )}
        placeholder="Share your experience here"
        onChange={(e) => {
          setExperienceInput(e.target.value as string)
        }}
      />
    </FormItemWrapper>
  </div>;
};

export { DetailsView };
