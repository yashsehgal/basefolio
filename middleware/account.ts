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
          data: AuthorizedUserType;
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

            let updatedDataResponse = await response.json();

            // converting firstName, lastName to fullName { firstName, lastName } to match the general user type
            updatedDataResponse = {
              ...updatedDataResponse,
              fullName: {
                firstName: updatedDataResponse.firstName,
                lastName: updatedDataResponse.lastName,
              },
            };

            return {
              status: "success",
              data: updatedDataResponse,
            };
          } catch (error) {
            return {
              status: "error",
              data: {} as any,
            };
          }
        },
      };
    default:
      return {
        status: "error",
        method: async (): Promise<{
          status: "success" | "error";
          data: AuthorizedUserType;
        }> => {
          return {
            status: "error",
            data: {} as any,
          };
        },
      };
  }
};

export { AuthorizedUserSocialLinksOperations };
