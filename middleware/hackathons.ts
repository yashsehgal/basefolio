import { INITIAL_HACKATHON_DATA, STRAPI_BASE_API_URL } from "@/common";
import {
  checkIfDateLogged,
  parseDatestamp,
  sortScheduleTimelineCollection,
} from "@/helpers";

const RequestOptions = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_SHOW_HACKATHONS_APIKEY}`,
  },
};

const fetchAllHackathons = async () => {
  const response = await fetch(`${STRAPI_BASE_API_URL}/hackathons`);
  const data = await response.json();
  let allHackathons: Array<HackathonInterface> = [];

  for (let count = 0; count < data.data.length; count++) {
    const responseAttributes = data.data[count].attributes;
    allHackathons.push({
      title: responseAttributes.title,
      subtitle: responseAttributes.subtitle,
      description: responseAttributes.description,
      startDate: responseAttributes.startDate,
      endDate: responseAttributes.endDate,
      registrationStartDate: responseAttributes.registrationStartDate,
      registrationEndDate: responseAttributes.registrationEndDate,
      desktopBanner: responseAttributes.desktopBanner,
      mobileBanner: responseAttributes.mobileBanner,
      isRemote: responseAttributes.isRemote ?? false,
      twitter: responseAttributes.twitter ?? "",
      website: responseAttributes.website ?? "",
      linkedin: responseAttributes.linkedin ?? "",
      instagram: responseAttributes.instagram ?? "",
      email: responseAttributes.email ?? "",
      github: responseAttributes.github ?? "",
      discord: responseAttributes.discord ?? "",
      slug: responseAttributes.slug,
      isHackathon: responseAttributes.isHackathon,
      isFeatured: responseAttributes.isFeatured,
      location: responseAttributes.location ?? "Not listed",
    });
  }
  return allHackathons;
};

const fetchFeaturedHackathon = async () => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/hackathons?filters[isFeatured][$eq]=true`,
    RequestOptions,
  );
  const data = await response.json();
  return data;
};

const fetchHackathonList = async (amount: number = 2) => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/hackathons`,
    RequestOptions,
  );
  const data = await response.json();
  let startingExploreHackathons: Array<HackathonInterface> = [];
  if (data.data.length >= amount) {
    for (let count = 0; count < amount; count++) {
      const responseAttributes = data.data[count].attributes;
      startingExploreHackathons.push({
        title: responseAttributes.title,
        subtitle: responseAttributes.subtitle,
        description: responseAttributes.description,
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        registrationStartDate: responseAttributes.registrationStartDate,
        registrationEndDate: responseAttributes.registrationEndDate,
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? "",
        website: responseAttributes.website ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        instagram: responseAttributes.instagram ?? "",
        email: responseAttributes.email ?? "",
        github: responseAttributes.github ?? "",
        discord: responseAttributes.discord ?? "",
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? "Not listed",
      });
    }
  } else {
    data.data.map((item: any) => {
      const responseAttributes = item.attributes;
      startingExploreHackathons.push({
        title: responseAttributes.title,
        subtitle: responseAttributes.subtitle,
        description: responseAttributes.description,
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        registrationStartDate: responseAttributes.registrationStartDate,
        registrationEndDate: responseAttributes.registrationEndDate,
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? "",
        website: responseAttributes.website ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        instagram: responseAttributes.instagram ?? "",
        email: responseAttributes.email ?? "",
        github: responseAttributes.github ?? "",
        discord: responseAttributes.discord ?? "",
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? "Not listed",
      });
    });
  }

  return startingExploreHackathons;
};

const fetchRemoteHackathonList = async (amount: number = 3) => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/hackathons?filters[isRemote][$eq]=true`,
    RequestOptions,
  );
  const data = await response.json();
  let startingRemoteHackathons: Array<HackathonInterface> = [];

  if (data.data.length >= amount) {
    for (let count = 0; count < amount; count++) {
      const responseAttributes = data.data[count].attributes;
      startingRemoteHackathons.push({
        title: responseAttributes.title,
        subtitle: responseAttributes.subtitle,
        description: responseAttributes.description,
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        registrationStartDate: responseAttributes.registrationStartDate,
        registrationEndDate: responseAttributes.registrationEndDate,
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? "",
        website: responseAttributes.website ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        instagram: responseAttributes.instagram ?? "",
        email: responseAttributes.email ?? "",
        github: responseAttributes.github ?? "",
        discord: responseAttributes.discord ?? "",
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? "Not listed",
      });
    }
  } else {
    data.data.map((item: any) => {
      const responseAttributes = item.attributes;
      startingRemoteHackathons.push({
        title: responseAttributes.title,
        subtitle: responseAttributes.subtitle,
        description: responseAttributes.description,
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        registrationStartDate: responseAttributes.registrationStartDate,
        registrationEndDate: responseAttributes.registrationEndDate,
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? "",
        website: responseAttributes.website ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        instagram: responseAttributes.instagram ?? "",
        email: responseAttributes.email ?? "",
        github: responseAttributes.github ?? "",
        discord: responseAttributes.discord ?? "",
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? "Not listed",
      });
    });
  }

  return startingRemoteHackathons;
};

const fetchPastHackathons = async () => {};

const fetchUpcomingHackathons = async () => {};

const fetchHackathonData = async (slug: string) => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/hackathons?filters[slug][$eq]=${slug}`,
    RequestOptions,
  );
  const data = await response.json();

  let hackathonData: HackathonInterface = INITIAL_HACKATHON_DATA;

  if (data.data.length) {
    let responseAttributes = data.data[0].attributes;
    hackathonData = {
      title: responseAttributes.title,
      subtitle: responseAttributes.subtitle,
      description: responseAttributes.description,
      startDate: responseAttributes.startDate,
      endDate: responseAttributes.endDate,
      registrationStartDate: responseAttributes.registrationStartDate,
      registrationEndDate: responseAttributes.registrationEndDate,
      desktopBanner: responseAttributes.desktopBanner,
      mobileBanner: responseAttributes.mobileBanner,
      isRemote: responseAttributes.isRemote ?? false,
      twitter: responseAttributes.twitter ?? "",
      website: responseAttributes.website ?? "",
      linkedin: responseAttributes.linkedin ?? "",
      instagram: responseAttributes.instagram ?? "",
      email: responseAttributes.email ?? "",
      github: responseAttributes.github ?? "",
      discord: responseAttributes.discord ?? "",
      slug: responseAttributes.slug,
      isHackathon: responseAttributes.isHackathon,
      isFeatured: responseAttributes.isFeatured,
      location: responseAttributes.location ?? "Not listed",
    };
  }

  return hackathonData;
};

const fetchHackathonEvents = async (hackathonSlug: string) => {
  if (!hackathonSlug) return;

  const response = await fetch(
    `${STRAPI_BASE_API_URL}/events?filters[hackathonSlug][$eq]=${hackathonSlug}`,
    RequestOptions,
  );
  const data = await response.json();

  let events: Array<EventInterface> = [];

  if (data.data.length) {
    for (let count = 0; count < data.data.length; count++) {
      let responseAttributes = data.data[count].attributes;
      events.push({
        title: responseAttributes.title,
        description: responseAttributes.description ?? "",
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        speaker: responseAttributes.speaker ?? "",
        speakerImage: responseAttributes.speakerImage ?? "",
        speakerSocialURL: responseAttributes.speakerSocialURL ?? "",
        hackathonSlug: responseAttributes.hackathonSlug,
      });
    }
  }

  return events;
};

const fetchHackathonSchedule = async (hackathonSlug: string) => {
  if (!hackathonSlug) return [];

  const allHackathonEvents = (await fetchHackathonEvents(hackathonSlug)) ?? [];
  let timeline: Array<EventInterface> = [];
  const hackathonData: HackathonInterface =
    await fetchHackathonData(hackathonSlug);
  const scheduleType = hackathonData.isHackathon ? "Hackathon" : "Event";
  const { startDate: scheduleStartDate, endDate: scheduleEndDate } =
    hackathonData;

  const schedule: Array<ScheduleInterface> = [];

  // manually adding schedule start and end to the timeline
  const scheduleMainOutline: Array<EventInterface> = [
    {
      title: `${scheduleType} starts`,
      startDate: scheduleStartDate,
      hackathonSlug: hackathonData.slug,
    },
    {
      title: `${scheduleType} ends`,
      startDate: scheduleEndDate,
      hackathonSlug: hackathonData.slug,
    },
  ];

  timeline.push(...scheduleMainOutline);

  /**
   * adding all the hackathon events to the timeline
   * and sorting according to datetime
   */

  timeline.push(...allHackathonEvents);

  /**
   * refining all the timeline items to schedule with respective datestamps and timestamps
   */

  let allDatestamps: Array<{ date: string; month: string; year: string }> = [];

  // adding when no timestamp is logged
  if (!allDatestamps.length && !schedule.length && timeline.length) {
    schedule.push({
      datestamp: {
        date: parseDatestamp(timeline[0].startDate).date,
        month: parseDatestamp(timeline[0].startDate).month,
        year: parseDatestamp(timeline[0].startDate).year,
        mainTimestamp: timeline[0].startDate,
      },
      events: [timeline[0]],
    });
    // adding date to date log
    allDatestamps.push({
      date: parseDatestamp(timeline[0].startDate).date,
      month: parseDatestamp(timeline[0].startDate).month,
      year: parseDatestamp(timeline[0].startDate).year,
    });
  }

  // adding more timeline collections/items to schedule, if any
  if (timeline.length > 1) {
    for (let count = 1; count < timeline.length; count++) {
      const eventDatestamp = {
        date: parseDatestamp(timeline[count].startDate).date,
        month: parseDatestamp(timeline[count].startDate).month,
        year: parseDatestamp(timeline[count].startDate).year,
      };

      const existingDatestampIndex = schedule.findIndex((item) => {
        return (
          item.datestamp.date === eventDatestamp.date &&
          item.datestamp.month === eventDatestamp.month &&
          item.datestamp.year === eventDatestamp.year
        );
      });

      if (
        allDatestamps.some((datestamp) =>
          checkIfDateLogged(datestamp, {
            date: parseDatestamp(timeline[count].startDate).date,
            month: parseDatestamp(timeline[count].startDate).month,
            year: parseDatestamp(timeline[count].startDate).year,
          }),
        )
      ) {
        // if collection is already dated, then adding new item to it's own events collection

        if (existingDatestampIndex !== -1) {
          // Datestamp already exists in the schedule array
          schedule[existingDatestampIndex].events.push(timeline[count]);
        } else {
          // Datestamp does not exist in the schedule array, create a new entry
          schedule.push({
            datestamp: {
              date: eventDatestamp.date,
              month: eventDatestamp.month,
              year: eventDatestamp.year,
              mainTimestamp: timeline[count].startDate,
            },
            events: [timeline[count]],
          });
        }
      } else {
        schedule.push({
          datestamp: {
            date: parseDatestamp(timeline[count].startDate).date,
            month: parseDatestamp(timeline[count].startDate).month,
            year: parseDatestamp(timeline[count].startDate).year,
            mainTimestamp: timeline[count].startDate,
          },
          events: [timeline[count]],
        });
        // adding date to date log
        allDatestamps.push({
          date: parseDatestamp(timeline[count].startDate).date,
          month: parseDatestamp(timeline[count].startDate).month,
          year: parseDatestamp(timeline[count].startDate).year,
        });
      }
    }
  }

  return sortScheduleTimelineCollection(schedule);
};

export {
  fetchAllHackathons,
  fetchFeaturedHackathon,
  fetchPastHackathons,
  fetchUpcomingHackathons,
  fetchHackathonList,
  fetchRemoteHackathonList,
  fetchHackathonData,
  fetchHackathonEvents,
  fetchHackathonSchedule,
};
