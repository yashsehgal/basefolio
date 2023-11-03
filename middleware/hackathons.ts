import { STRAPI_BASE_API_URL } from "@/common"
import axios from "axios"

const fetchAllHackathons = async () => {

}

const fetchFeaturedHackathon = async () => {
  const featuredHackathon
    = await axios.get(STRAPI_BASE_API_URL + "/hackathons?filters[isFeatured][$eq]=true")
      .then((res: any) => res.json())
    ;
  
  debugger;
  console.log("featured hackathon", await featuredHackathon);

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