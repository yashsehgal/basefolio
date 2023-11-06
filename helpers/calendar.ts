import { EVENT_CALENDAR_INVITE_DESCRIPTION_DEFAULT } from "@/common/copy";
import { convertToRFC5545Timestamp } from ".";

const createHackathonEventOnGoogleCalendar = (eventData: EventInterface) => {
  const calendarPermalinkData = {
    title: eventData.title ?? "Event from schedule",
    timeslot: `${convertToRFC5545Timestamp(eventData.startDate)}/${
      eventData.endDate
        ? convertToRFC5545Timestamp(eventData.endDate)
        : convertToRFC5545Timestamp(eventData.startDate)
    }`,
    description: eventData.description
      ? `${eventData.description}\n\n${
          eventData.speaker && `Speaker(s) / Host: ${eventData.speaker}`
        }\n${
          eventData.speakerSocialURL &&
          `Meet the speaker/host before their session: ${eventData.speakerSocialURL}`
        }`
      : EVENT_CALENDAR_INVITE_DESCRIPTION_DEFAULT,
  };

  return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${
    calendarPermalinkData.title
  }&dates=${calendarPermalinkData.timeslot}&details=${encodeURIComponent(
    calendarPermalinkData.description,
  )}`;
};

export { createHackathonEventOnGoogleCalendar };
