import { STRAPI_BASE_API_URL, STRAPI_REQUEST_OPTIONS } from "@/common"

const fetchAllBuilders = async () => {
  const response = await fetch(`${STRAPI_BASE_API_URL}/builders`, STRAPI_REQUEST_OPTIONS);
  const data = await response.json();
  
  let allBuilders: Array<BuilderInterface> = [];

  console.log("data from strapi", data);

  if (data.data.length) {
    for (let count = 0; count < data.data.length; count++) {
      let responseAttributes = data.data[count].attributes;
      allBuilders.push({
        username: responseAttributes.username,
        fullName: {
          firstName: responseAttributes.firstName,
          lastName: responseAttributes.lastName ?? ""
        },
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
        hackathonParticipations: responseAttributes.hackathonParticipations ?? [],
        projects: responseAttributes.projects ?? [],
      })
    }
  }

  return allBuilders;
}

const fetchBuildersForHackathon = async (hackathonSlug: string) => {
  const allBuilders = await fetchAllBuilders();

  let buildersForHackathon: Array<BuilderInterface & {
    participationType?: "solo" | "team";
  }> = [];

  allBuilders.map((builder, builderIndex) => {
    console.log("builders data", builder);
    builder.hackathonParticipations?.map((hackathon, index) => {
      if (hackathon.hackathonSlug === hackathonSlug) {
        console.log("hackathon data", hackathon);
        
        buildersForHackathon.push({
          ...builder,
          participationType: hackathon.participationType || "solo"
        });
      }
    })
  });
  
  return buildersForHackathon;
}

export {
  fetchAllBuilders,
  fetchBuildersForHackathon
}