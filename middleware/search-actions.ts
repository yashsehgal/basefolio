import { fetchAllHackathons } from "."

const fetchHackathonCities = async () => {
  const data = await fetchAllHackathons();
  let cities: Array<string> = [];

  data.map((hackathon) => {
    if (!hackathon.isRemote) {
      cities.push(hackathon.location as string);
    }
  });

  return cities;
}

const fetchAllPastHackathons = async () => {
  const data = await fetchAllHackathons();
  let pastHackathons: Array<{
    title: string;
    hackathonSlug: string;
  }> = [];

  data.map((hackathon) => {
    const endDateObject = new Date(hackathon.endDate);
    const todayDateObject = new Date();

    if (todayDateObject.getTime() > endDateObject.getTime()) {
      pastHackathons.push({
        title: hackathon.title,
        hackathonSlug: hackathon.slug
      });
    }
  });

  return pastHackathons;
}

const fetchAllUpcomingHackathons = async () => {
  const data = await fetchAllHackathons();
  let upcomingHackathons: Array<{
    title: string;
    hackathonSlug: string;
  }> = [];

  data.map((hackathon) => {
    const startDateObject = new Date(hackathon.startDate);
    const todayDateObject = new Date();

    if (todayDateObject.getTime() < startDateObject.getTime()) {
      upcomingHackathons.push({
        title: hackathon.title,
        hackathonSlug: hackathon.slug
      });
    }
  });

  return upcomingHackathons;
}

export {
  fetchHackathonCities,
  fetchAllPastHackathons,
  fetchAllUpcomingHackathons
}