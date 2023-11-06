import { Section } from "@/components/layouts";
import { CardContainer, SpeakerBadge } from "@/components/ui";
import { cn, createHackathonEventOnGoogleCalendar, parseTimestampToHHMM } from "@/helpers";
import { fetchHackathonSchedule } from "@/middleware";
import { useEffect, useState } from "react";
import { CalendarPlus as AddToCalendarIcon } from 'lucide-react';
import Link from "next/link";

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
    <Section className="schedule-content-container border rounded-2xl px-8 max-md:p-0 max-md:border-none">
      {schedule.map((timelineItem, index) => {
        return (
          <div className="timeline-item" key={index}>
            <div className="timeline-item-datestamp-content-wrapper">
              <h3 className="timeline-collection-datestamp font-semibold text-lg max-md:text-base">
                {timelineItem.datestamp.date} {timelineItem.datestamp.month}
                {timelineItem.datestamp.month && ", "}
                {timelineItem.datestamp.year}
              </h3>
              <CardContainer
                className={cn("timeline-collection-event-list-container my-4 grid w-full gap-8")}
              >
                {timelineItem.events.map((timelineEvent, timelineIndex) => {
                  return (
                    <div
                      className={cn(
                        "flex flex-row items-start justify-between gap-6"
                      )}
                      key={timelineIndex}
                    >
                      <div className={cn(
                        "timeline-collection-event-item w-full flex flex-row items-start gap-2",
                        "max-md:flex-col"
                      )}>
                        <div
                          className={cn(
                            "timeline-collection-event-item__time-content-wrapper",
                            "font-semibold text-lg w-[140px]",
                            "max-md:text-sm max-md:text-zinc-500"
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
                          <h2 className="event-title w-full font-semibold text-base">
                            {timelineEvent.title}
                          </h2>
                          {timelineEvent.description && (
                            <p
                              className={cn(
                                "event-description",
                                "w-[40ch] text-zinc-500 text-sm mt-2",
                                "max-md:text-xs"
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
                      <div className="event-actions-container max-md:hidden">
                        <Link
                          href={createHackathonEventOnGoogleCalendar(timelineEvent)}
                          target="_blank"
                        >
                          <AddToCalendarIcon className="w-5 h-5" />
                        </Link>
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
