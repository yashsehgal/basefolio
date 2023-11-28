"use client";
import { FeedbackRatingScreen } from "@/components/sections/feedback-flow";
import { FeedbackReviewScreen } from "@/components/sections/feedback-flow/feedback-review";
import { Button, CardContainer } from "@/components/ui";
import { FeedbackContext, FeedbackProvider } from "@/contexts";
import { deleteCookie, getCookie } from "@/helpers";
import { submitFeedback } from "@/middleware";
import { useContext, useState } from "react";

const FeedbackView: React.FunctionComponent = () => {
  const [flow, setFlow] = useState<FeedbackViewType>("rating");

  const { feedback } = useContext(FeedbackContext);

  const handleSkipFeedback = () => {
    // remove the username and feedback cookie from browser
    deleteCookie("username");
    deleteCookie("feedback");

    // move forward to "/" BASE URL
    window.location.href = "/";
  }

  const handleSubmitFeedback = async () => {
    console.log(getCookie('username').data);

    const data = await submitFeedback(getCookie('username').data, feedback);
    if (data.status === "success") {
      window.location.href = "/";
    }
  }

  return (
    <>
      <FeedbackProvider>
        <CardContainer
          withSeparator
          title="Please provide a feedback"
          subtitle="Your feedback is important to us. We would love to see you signing up again"
        >
          {flow === "rating" && <FeedbackRatingScreen />}
          {flow === "review" && <FeedbackReviewScreen />}
          <div className="feedback-flow-control-actions-wrapper mt-6 flex flex-row items-center justify-center gap-4 max-md:flex-col-reverse">
            {flow === "rating" && <Button variant="solid" stretchOnMobile onClick={handleSkipFeedback}>
              {"Skip"}
            </Button>}
            {flow === "rating" && <Button stretchOnMobile onClick={() => setFlow("review")}>
              {"Next"}
            </Button>}
            {flow === "review" &&
              <Button variant="solid" stretchOnMobile className="border-transparent" onClick={handleSkipFeedback}>
                {"Skip"}
              </Button>}
            {flow === "review" && <Button variant="solid" stretchOnMobile onClick={() => setFlow("rating")}>
              {"Go back"}
            </Button>}
            {flow === "review" && <Button stretchOnMobile onClick={handleSubmitFeedback}>
              {"Submit feedback"}
            </Button>}
          </div>
        </CardContainer>
      </FeedbackProvider>
    </>
  )
}

export default FeedbackView;