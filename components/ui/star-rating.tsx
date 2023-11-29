'use client';
import { cn } from "@/helpers";
import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion";
import { STARS_EMOJI } from "@/common";
import { FeedbackContext } from "@/contexts";

const StarRating: React.FunctionComponent = () => {
  const [rate, setRate] = useState<Array<StarRatingStatusInterface>>([]);
  const STARS_COUNT = 6;

  const { feedback, setFeedback } = useContext(FeedbackContext);

  useEffect(() => {
    if (rate.length < STARS_COUNT) {
      setRate((current) => [...current, {
        isHovered: false,
        isSelected: current.length <= feedback.rating - 1,
        id: current.length,
        emoji: STARS_EMOJI[current.length]
      }]);
    }
  }, [rate]);


  return (
    <div className="star-rating-component-wrapper flex flex-row items-center justify-center gap-1 w-fit h-fit mx-auto select-none">
      {
        rate.length ? rate.map((star, index) => {
          return (
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{
                y: 12 + 2 * index,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                type: "bounce",
              }}
              key={index}
            >
              <Star
                className={cn("text-transparent fill-zinc-200/80 w-10 h-10 transition-all cursor-pointer",
                  "hover:fill-yellow-400",
                  star.isHovered && "fill-yellow-400",
                  star.isSelected && "fill-yellow-400",
                )}
                onClick={() => {
                  // removing all the hovered and selected state if already has any
                  let newStarRender = [...rate];
                  rate.map((_: StarRatingStatusInterface, rateIndex: number) => {
                    newStarRender[rateIndex].isHovered = false;
                    newStarRender[rateIndex].isSelected = false;
                    setFeedback({
                      ...feedback,
                      rating: index + 1
                    })
                  });
                  setRate(newStarRender);

                  // now setting the stars selected according the click star index
                  if (index >= 0) {
                    let newStarRender = [...rate];
                    rate.map((_: StarRatingStatusInterface, rateIndex: number) => {
                      if (rateIndex <= index) {
                        newStarRender[rateIndex].isSelected = true;
                      }
                    });
                    setRate(newStarRender);
                  }
                }}
                onMouseEnter={() => {
                  if (index >= 0) {
                    let newStarRender = [...rate];
                    rate.map((_: StarRatingStatusInterface, rateIndex: number) => {
                      if (rateIndex <= index) {
                        newStarRender[rateIndex].isHovered = true;
                      }
                    });
                    setRate(newStarRender);
                  }
                }}
                onMouseLeave={() => {
                  let newStarRender = [...rate];
                  rate.map((_: StarRatingStatusInterface, rateIndex: number) => {
                    newStarRender[rateIndex].isHovered = false;
                  });
                  setRate(newStarRender);
                }}
                key={index}
              />
              <span className={
                cn("text-center transition-all", star.isHovered && "scale-150")
              }>
                {star.emoji}
              </span>
            </motion.div>
          )
        }) : <></>
      }
    </div >
  )
}

export {
  StarRating
}