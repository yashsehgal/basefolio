import { Section } from "@/components/layouts";
import { Checkbox } from "@/components/ui";
import { FeedbackContext } from "@/contexts";
import { cn } from "@/helpers";
import { motion } from "framer-motion";
import { useContext } from "react";

const FeedbackReviewData: Array<string> = [
  "Having another basefolio account, so deleting this one?",
  "Did not find hackathons or what you were looking for?",
  "Found it difficult to apply for hackathons?",
];

const FeedbackReviewScreen: React.FunctionComponent = () => {
  const { feedback, setFeedback } = useContext(FeedbackContext);

  const handleReview = (id: number) => {
    const updatedFeedback = { ...feedback };

    // Check if the clicked item is already in the feedback array
    const index = updatedFeedback.review.findIndex((item) => item.id === id);

    if (index === -1) {
      updatedFeedback.review.push({ id, value: FeedbackReviewData[id] });
    } else {
      updatedFeedback.review.splice(index, 1);
    }

    setFeedback(updatedFeedback);
  };

  return (
    <motion.div
      initial={{
        x: 24,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
    >
      <Section className="feedback-rating-screen">
        <h1 className="leading-snug text-xl font-semibold text-center">
          {"Why are we seeing you go away? 🥹"}
        </h1>
        <div className="feedback-review-select-wrapper mt-8 grid grid-cols-1 mx-auto w-fit gap-4">
          {FeedbackReviewData.map((review, index) => {
            return (
              <div className={cn("")} key={index}>
                <div className="flex flex-row items-center gap-2 p-3 border rounded-xl w-[460px] select-none">
                  <Checkbox
                    id={review.replace(" ", "-")}
                    onClick={() => handleReview(index)}
                  />
                  <label
                    htmlFor={review.replace(" ", "-")}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {review}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </motion.div>
  );
};

export { FeedbackReviewScreen };
