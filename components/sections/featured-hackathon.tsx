'use client';
import { cn } from "@/helpers"
import { CardContainer } from "../ui/card"
import { Section } from "../layouts"

const FeaturedHackathonSection: React.FunctionComponent = () => {
  return (
    <Section className={cn("featured-hackathon")}>
      <CardContainer>
        <div className="feature-hackathon-content-container flex flex-row items-start justify-between gap-4">
        </div>
      </CardContainer>
    </Section>
  )
}

export {
  FeaturedHackathonSection
}