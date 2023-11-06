import { Section } from "@/components/layouts";
import { CardContainer, SpeakerBadge } from "@/components/ui";
import { cn, parseTimestampToHHMM } from "@/helpers";
import { fetchHackathonSchedule } from "@/middleware";
import { useEffect, useState } from "react";

const Schedule = (hackathonData: HackathonInterface) => {
  const [schedule, setSchedule] = useState<Array<ScheduleInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchHackathonSchedule(hackathonData.slug);
      setSchedule(data);
    }
    fetchData();
  }, [hackathonData.slug]);

  return (
    <Section className="schedule-content-container border rounded-2xl px-8">
      {schedule.map((timelineItem, index) => {
        return (
          <div className="timeline-item" key={index}>
            <div className="timeline-item-datestamp-content-wrapper">
              <h3 className="timeline-collection-datestamp font-semibold text-lg">
                {timelineItem.datestamp.date} {timelineItem.datestamp.month}
                {timelineItem.datestamp.month && ", "}
                {timelineItem.datestamp.year}
              </h3>
              <CardContainer
                className={cn("timeline-collection-event-list-container my-4")}
              >
                {timelineItem.events.map((timelineEvent, timelineIndex) => {
                  return (
                    <div
                      className={cn(
                        "timeline-collection-event-item w-full flex flex-row items-start gap-2",
                      )}
                      key={timelineIndex}
                    >
                      <div
                        className={cn(
                          "timeline-collection-event-item__time-content-wrapper",
                          "font-semibold text-lg w-[140px]",
                        )}
                      >
                        {`${parseTimestampToHHMM(timelineEvent.startDate)}`}{" "}
                        {`${timelineEvent.endDate?.length
                            ? `- ${parseTimestampToHHMM(timelineEvent.endDate)}`
                            : ""
                          }`}
                      </div>
                      <div
                        className={cn(
                          "timeline-collection-event-item__title-description-content-wrapper",
                        )}
                      >
                        <h2 className="event-title w-full font-semibold text-lg">
                          {timelineEvent.title}
                        </h2>
                        {timelineEvent.description && (
                          <p
                            className={cn(
                              "event-description",
                              "w-[36ch] text-zinc-500 text-sm mt-2",
                            )}
                          >
                            {timelineEvent.description}
                          </p>
                        )}
                        {timelineEvent.speaker && (
                          <div className="speaker-mentions-wrapper mt-4">
                            <SpeakerBadge
                              speakerProfileImage={timelineEvent.speakerImage}
                              speakerURL={timelineEvent.speakerSocialURL}
                            >
                              {timelineEvent.speaker}
                            </SpeakerBadge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContainer>
            </div>
          </div>
        );
      })}
    </Section>
  );
};

export { Schedule };
