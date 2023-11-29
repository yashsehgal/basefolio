"use client";
import { Section } from "@/components/layouts";
import { StarRating } from "@/components/ui";
import { motion } from "framer-motion";

const FeedbackRatingScreen: React.FunctionComponent = () => {
  return (
    <motion.div
      initial={{
        x: -24,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
    >
      <Section className="feedback-rating-screen">
        <h1 className="leading-snug text-xl font-semibold text-center">
          {"We would love if you rate your experience using basefolio 😄"}
        </h1>
        <div className="star-rating-component-wrapper mt-8 h-12 grid">
          <StarRating />
        </div>
      </Section>
    </motion.div>
  );
};

export { FeedbackRatingScreen };
