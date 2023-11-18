import { STRAPI_BASE_API_URL } from "@/common";

const AuthorizedUserSocialLinksOperations = async (method: APIMethodType) => {
  switch (method) {
    case "update":
      return {
        status: "success",
        method: async (
          data: Array<AuthorizedUserSocialLinksType>,
          id: number,
        ): Promise<{
          status: "success" | "error";
          data: any;
        }> => {
          try {
            const response = await fetch(`${STRAPI_BASE_API_URL}/users/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                socialLinks: data,
              }),
            });

            const updatedDataResponse: AuthorizedUserType =
              await response.json();
            return {
              status: "success",
              data: updatedDataResponse.socialLinks,
            };
          } catch (error) {
            return {
              status: "error",
              data: {},
            };
          }
        },
      };
    default:
      return {
        status: "error",
        method: async (): Promise<{
          status: "success" | "error";
          data: any;
        }> => {
          return {
            status: "error",
            data: {},
          };
        },
      };
  }
};

export { AuthorizedUserSocialLinksOperations };
