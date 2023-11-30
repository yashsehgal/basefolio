import { STRAPI_BASE_API_URL, STRAPI_REQUEST_OPTIONS } from "@/common";

const fetchAllBuilders = async () => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/builders`,
    STRAPI_REQUEST_OPTIONS,
  );
  const data = await response.json();

  let allBuilders: Array<BuilderInterface> = [];

  if (data.data.length) {
    for (let count = 0; count < data.data.length; count++) {
      let responseAttributes = data.data[count].attributes;
      allBuilders.push({
        username: responseAttributes.username,
        fullName: {
          firstName: responseAttributes.firstName,
          lastName: responseAttributes.lastName ?? "",
        },
        location: responseAttributes.location,
        bio: responseAttributes.bio ?? "",
        isVerified: responseAttributes.isVerified ?? false,
        profileImageURL: responseAttributes.profileImageURL ?? "",
        twitter: responseAttributes.twitter ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        website: responseAttributes.website ?? "",
        github: responseAttributes.github ?? "",
        hashnode: responseAttributes.hashnode ?? "",
        instagram: responseAttributes.instagram ?? "",
        hackathonWon: responseAttributes.hackathonWon ?? [],
        hackathonParticipations:
          responseAttributes.hackathonParticipations ?? [],
        projects: responseAttributes.projects ?? [],
        isFeatured: responseAttributes.isFeatured ?? false,
      });
    }
  }

  return allBuilders;
};

const fetchBuildersForHackathon = async (hackathonSlug: string) => {
  const allBuilders = await fetchAllBuilders();

  let buildersForHackathon: Array<
    BuilderInterface & {
      participationType?: "solo" | "team";
    }
  > = [];

  allBuilders.map((builder) => {
    builder.hackathonParticipations?.map((hackathon) => {
      if (hackathon.hackathonSlug === hackathonSlug) {
        buildersForHackathon.push({
          ...builder,
          participationType: hackathon.participationType || "solo",
        });
      }
    });
  });

  return buildersForHackathon;
};

const fetchFeaturedBuilders = async (amount: number = 3) => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/builders?filters[isFeatured][$eq]=true`,
    STRAPI_REQUEST_OPTIONS,
  );
  const data = await response.json();

  let featuredBuilders: Array<BuilderInterface> = [];

  if (data.data.length >= amount) {
    // Map only till "amount"
    for (let count = 0; count < amount; count++) {
      const responseAttributes = data.data[count].attributes;
      featuredBuilders.push({
        username: responseAttributes.username,
        fullName: {
          firstName: responseAttributes.firstName,
          lastName: responseAttributes.lastName ?? "",
        },
        location: responseAttributes.location,
        bio: responseAttributes.bio ?? "",
        isVerified: responseAttributes.isVerified ?? false,
        profileImageURL: responseAttributes.profileImageURL ?? "",
        twitter: responseAttributes.twitter ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        website: responseAttributes.website ?? "",
        github: responseAttributes.github ?? "",
        hashnode: responseAttributes.hashnode ?? "",
        instagram: responseAttributes.instagram ?? "",
        hackathonWon: responseAttributes.hackathonWon ?? [],
        hackathonParticipations:
          responseAttributes.hackathonParticipations ?? [],
        projects: responseAttributes.projects ?? [],
        isFeatured: responseAttributes.isFeatured ?? false,
      });
    }
  } else {
    // Map all of the builders
    data.data.map((item: any) => {
      const responseAttributes = item.attributes;
      featuredBuilders.push({
        username: responseAttributes.username,
        fullName: {
          firstName: responseAttributes.firstName,
          lastName: responseAttributes.lastName ?? "",
        },
        location: responseAttributes.location,
        bio: responseAttributes.bio ?? "",
        isVerified: responseAttributes.isVerified ?? false,
        profileImageURL: responseAttributes.profileImageURL ?? "",
        twitter: responseAttributes.twitter ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        website: responseAttributes.website ?? "",
        github: responseAttributes.github ?? "",
        hashnode: responseAttributes.hashnode ?? "",
        instagram: responseAttributes.instagram ?? "",
        hackathonWon: responseAttributes.hackathonWon ?? [],
        hackathonParticipations:
          responseAttributes.hackathonParticipations ?? [],
        projects: responseAttributes.projects ?? [],
        isFeatured: responseAttributes.isFeatured ?? false,
      });
    });
  }

  return featuredBuilders;
};

/**
 *
 * @param order
 * from-most (ascending)
 * from-least (descending)
 */
const fetchWinningBuilders = async (
  order: "from-most" | "from-least" = "from-most",
) => {
  const data = await fetchAllBuilders();
  const leaderboard: Array<BuilderInterface> = data.sort(
    (a: BuilderInterface, b: BuilderInterface) =>
      a.hackathonWon.length - b.hackathonWon.length,
  );

  if (order === "from-most") {
    return leaderboard.reverse();
  } else {
    return leaderboard;
  }
};

const fetchMostProjects = async (
  order: "from-most" | "from-least" = "from-most"
) => {
  const data = await fetchAllBuilders();
  const leaderboard: Array<BuilderInterface> = data.sort(
    (a: BuilderInterface, b: BuilderInterface) =>
      a.projects.length - b.projects.length
  )

  if (order === "from-most") {
    return leaderboard.reverse();
  } else {
    return leaderboard;
  }
}


export {
  fetchAllBuilders,
  fetchBuildersForHackathon,
  fetchFeaturedBuilders,
  fetchWinningBuilders,
  fetchMostProjects
};
