import { STRAPI_BASE_API_URL } from "@/common"

const RequestOptions = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_SHOW_HACKATHONS_APIKEY}`
  }
}

const fetchAllHackathons = async () => {

}

const fetchFeaturedHackathon = async () => {
  const response = await fetch(`${STRAPI_BASE_API_URL}/hackathons?filters[isFeatured][$eq]=true`, RequestOptions);
  const data = await response.json();
  return data;
}

const fetchHackathonList = async (base: number = 0, amount: number = 2) => {
  const response = await fetch(`${STRAPI_BASE_API_URL}/hackathons`, RequestOptions);
  const data = await response.json();
  const startingExploreHackathons: Array<HackathonInterface> = [];
  if (data.data.length >= amount) {
    for (let count = 0; count < amount; count++) {
      const responseAttributes = data.data[count].attributes;
      startingExploreHackathons.push({
        title: responseAttributes.title,
        subtitle: responseAttributes.subtitle,
        description: responseAttributes.description,
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? '',
        website: responseAttributes.website ?? '',
        linkedin: responseAttributes.linkedin ?? '',
        instagram: responseAttributes.instagram ?? '',
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? 'Not listed'
      })
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
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? '',
        website: responseAttributes.website ?? '',
        linkedin: responseAttributes.linkedin ?? '',
        instagram: responseAttributes.instagram ?? '',
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? 'Not listed'
      })
    })
  }

  return startingExploreHackathons;
}

const fetchRemoteHackathonList = async (amount: number = 3) => {
  const response = await fetch(`${STRAPI_BASE_API_URL}/hackathons?filters[isRemote][$eq]=true`, RequestOptions);
  const data = await response.json();
  const startingRemoteHackathons: Array<HackathonInterface> = [];

  if (data.data.length >= amount) {
    for (let count = 0; count < amount; count++) {
      const responseAttributes = data.data[count].attributes;
      startingRemoteHackathons.push({
        title: responseAttributes.title,
        subtitle: responseAttributes.subtitle,
        description: responseAttributes.description,
        startDate: responseAttributes.startDate,
        endDate: responseAttributes.endDate,
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? '',
        website: responseAttributes.website ?? '',
        linkedin: responseAttributes.linkedin ?? '',
        instagram: responseAttributes.instagram ?? '',
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? 'Not listed'
      })
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
        desktopBanner: responseAttributes.desktopBanner,
        mobileBanner: responseAttributes.mobileBanner,
        isRemote: responseAttributes.isRemote ?? false,
        twitter: responseAttributes.twitter ?? '',
        website: responseAttributes.website ?? '',
        linkedin: responseAttributes.linkedin ?? '',
        instagram: responseAttributes.instagram ?? '',
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
        isFeatured: responseAttributes.isFeatured,
        location: responseAttributes.location ?? 'Not listed'
      })
    })
  }

  return startingRemoteHackathons;
}

const fetchPastHackathons = async () => {

}

const fetchUpcomingHackathons = async () => {

}

export {
  fetchAllHackathons,
  fetchFeaturedHackathon,
  fetchPastHackathons,
  fetchUpcomingHackathons,
  fetchHackathonList,
  fetchRemoteHackathonList
}