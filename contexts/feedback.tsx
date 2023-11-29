import { INITIAL_FEEDBACK } from "@/common";
import { createContext, useEffect, useState } from "react";

export const FeedbackContext = createContext<{
  feedback: FeedbackInterface;
  setFeedback: (feedback: FeedbackInterface) => void;
}>({
  feedback: INITIAL_FEEDBACK,
  setFeedback: () => {},
});

const FeedbackProvider: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackInterface>(INITIAL_FEEDBACK);

  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export { FeedbackProvider };
