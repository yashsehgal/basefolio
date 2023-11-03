import { STRAPI_BASE_API_URL } from "@/common"

const RequestOptions = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_SHOW_HACKATHONS_APIKEY}`
  }
}

const fetchAllHackathons = async () => {

}

const fetchFeaturedHackathon = async () => {
  const featuredHackathon
    = await fetch(`${STRAPI_BASE_API_URL}/hackathons?filters[isFeatured][$eq]=true`, RequestOptions)
      .then((res) => res.json())
      .then((res) => res)
      .catch(err => {
        return {
          message: "Not able to fetch featured hackathon",
          error: err,
          data: [],
          source: "fetchFeaturedHackathon"
        }
      });
  
  return featuredHackathon.data;
}

const fetchPastHackathons = async () => {

}

const fetchUpcomingHackathons = async () => {

}

export {
  fetchAllHackathons,
  fetchFeaturedHackathon,
  fetchPastHackathons,
  fetchUpcomingHackathons
}