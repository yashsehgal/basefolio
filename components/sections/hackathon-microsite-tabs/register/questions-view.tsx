import { Input } from "@/components/ui";
import { cn } from "@/helpers";
import { fetchHackathonApplicationQuestions } from "@/middleware";
import { useEffect, useState } from "react"
import Markdown from 'react-markdown';

const QuestionsView = ({ hackathonSlug }: { hackathonSlug: string }) => {
  const [questions, setQuestions] = useState<Array<QuestionInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchHackathonApplicationQuestions(hackathonSlug);
      setQuestions(data);
    }
    fetchData();
  }, []);

  return (
    <div className="questions-view-container grid grid-cols-1 gap-8">
      {questions.map((question, index) => {
        return (
          <div className="question-content-container" key={index}>
            <div className="question-md-content-wrapper">
              {question.isRequired && <span className="select-none cursor-default font-medium text-xs text-red-500">{"*"}</span>}
              <Markdown className="markdown">
                {`${question.title}`}
              </Markdown>
              <div className="question-response-wrapper">
                {question.type === "textarea" && <textarea
                  className={cn(
                    "w-full min-h-[160px] rounded-xl border border-neutral-200 bg-white px-3 py-3 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
                  )}
                  placeholder="Share your response here"
                />}
                {question.type === "text" && <Input />}
                {question.type === "email" && <Input type="email" />}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export {
  QuestionsView
}