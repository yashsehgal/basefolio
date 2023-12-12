"use client";
import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "."
import { Section, ViewContainer } from "../layouts"
import { cn } from "@/helpers"

const CommandKSearch: React.FunctionComponent = () => {
  return (
    <Section className="command-k-search-container pb-0">
      <ViewContainer className="relative">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="secondary" stretch className="p-2 shadow-sm hover:shadow-sm select-none">
              <CommandKSearchButtonContent />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/20 inset-0 fixed" />
            <Dialog.Content asChild>
              <div className={cn("rounded-lg bg-white p-12 w-[80%]")}
                style={{
                  position: "fixed",
                  top: "38%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: "25px",
                  animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >

              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </ViewContainer>
    </Section >
  )
}

const CommandKSearchButtonContent: React.FunctionComponent = () => {
  return (
    <div className="border border-neutral-200/60 rounded-lg pt-2 pb-2 pr-2 pl-4 w-full text-left flex flex-row items-center justify-between gap-6">
      <span className="text-neutral-400 truncate">{"Search for hackathons, builders, projects or anything..."}</span>
      <div className="flex flex-row items-center gap-2 justify-end">
        <kbd className="py-2 px-4 rounded-lg text-lg bg-neutral-100 border border-neutral-200">{"⌘"}</kbd>
        <kbd className="py-2 px-4 rounded-lg text-lg bg-neutral-100 border border-neutral-200">{"k"}</kbd>
      </div>
    </div>
  )
}

export {
  CommandKSearch
}