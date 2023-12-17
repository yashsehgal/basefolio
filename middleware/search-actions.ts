import { STRAPI_BASE_API_URL, STRAPI_REQUEST_OPTIONS } from "@/common";
import { fetchAllBuilders, fetchAllHackathons } from ".";

const fetchHackathonCities = async () => {
  const data = await fetchAllHackathons();
  let cities: Array<string> = [];

  data.map((hackathon) => {
    if (!hackathon.isRemote) {
      cities.push(hackathon.location as string);
    }
  });

  return cities;
};

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
        hackathonSlug: hackathon.slug,
      });
    }
  });

  return pastHackathons;
};

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
        hackathonSlug: hackathon.slug,
      });
    }
  });

  return upcomingHackathons;
};

const fetchBuildersByNames = async (nameInput: string) => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/users?filters[username][$contains]=${nameInput}`,
    STRAPI_REQUEST_OPTIONS,
  );
  const data = await response.json();
  let users: Array<{
    username: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    profileAvatar: string;
  }> = [];

  for (let count = 0; count < data.length; count++) { 
    const responseAttributes = data[count];
    users.push({
      username: responseAttributes.username,
      fullName: {
        firstName: responseAttributes.firstName,
        lastName: responseAttributes.lastName
      },
      profileAvatar: responseAttributes.profileAvatar ?? "",
    });
  }

  return users;
}

const fetchBuildersByLocation = async (locationInput: string) => {
  try {
    const [cityResponse, countryResponse] = await Promise.all([
      fetch(`${STRAPI_BASE_API_URL}/users?filters[city][$contains]=${locationInput}`, STRAPI_REQUEST_OPTIONS),
      fetch(`${STRAPI_BASE_API_URL}/users?filters[country][$contains]=${locationInput}`, STRAPI_REQUEST_OPTIONS)
    ]);

    const userByCities = await cityResponse.json();
    const userByCountries = await countryResponse.json();

    const uniqueUsernames = new Set<string>();
    const allUsers: Array<{
      username: string;
      fullName: {
        firstName: string;
        lastName: string;
      };
      profileAvatar: string;
      city: string;
      country: string;
    }> = [];

    const processUser = (user: any) => {
      const username = user.username;
      if (!uniqueUsernames.has(username)) {
        uniqueUsernames.add(username);
        allUsers.push({
          username: user.username,
          fullName: {
            firstName: user.firstName,
            lastName: user.lastName
          },
          profileAvatar: user.profileAvatar,
          city: user.city,
          country: user.country
        });
      }
    };

    userByCities.forEach(processUser);
    userByCountries.forEach(processUser);

    return allUsers;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error, throw it, or return an appropriate response
    return [];
  }
};

const fetchBuildersCompanies = async () => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/users`,
    STRAPI_REQUEST_OPTIONS,
  );
  const data = await response.json();
  const companies: Array<string> = [];

  if (data.length) {
    data.map((builder: any) => {
      if (builder.experience !== null && builder.experience.length > 0) {
        builder.experience.map((experience: AuthorizedUserExperienceType) => {
          if (experience.company.name) {
            companies.push(experience.company.name);
          }
        })
      }
    })
  }

  return companies;
}


export {
  // hackathons fetching methods
  fetchHackathonCities,
  fetchAllPastHackathons,
  fetchAllUpcomingHackathons,
  // user fetching methods
  fetchBuildersByNames,
  fetchBuildersByLocation,
  fetchBuildersCompanies
};
