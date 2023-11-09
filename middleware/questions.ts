import { STRAPI_BASE_API_URL } from "@/common"

const fetchHackathonApplicationQuestions = async (hackathonSlug: string) => {
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/questions?filters[hackathonSlug][$eq]=${hackathonSlug}`);
  const data = await response.json();

  let questionsData: Array<QuestionInterface> = [];

  if (data.data.length) {
    for (let count = 0; count < data.data.length; count++) {
      let responseAttributes = data.data[count].attributes;
      questionsData.push({
        title: responseAttributes.title,
        type: responseAttributes.type ?? "textarea",
        hackathonSlug: responseAttributes.hackathonSlug,
        isRequired: responseAttributes.isRequired ?? false
      });
    }
  }

  return questionsData;
}

export {
  fetchHackathonApplicationQuestions
}