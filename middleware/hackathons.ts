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

const fetchHackathonList = async (amount: number = 2) => {
  const response = await fetch(`${STRAPI_BASE_API_URL}/hackathons`, RequestOptions);
  const data = await response.json();
  if (data.data.length <= amount) {
    return data;
  } else {
    return data.data.slice(0, 3);
  }
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
  fetchHackathonList
}