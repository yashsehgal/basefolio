import { STRAPI_BASE_API_URL } from "@/common";

const ACCOUNT_DELETION_REQUEST_OPTIONS = {
  method: "DELETE",
  redirect: "follow",
};

var HEADERS = new Headers();
HEADERS.append("Content-Type", "application/json");

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

const deleteUserAccount = async (
  id: number,
): Promise<{ status: "error" | "success"; data: any }> => {
  if (id === null || id === undefined)
    return {
      status: "error",
      data: {},
    };

  const response = await fetch(
    `${STRAPI_BASE_API_URL}/users/${id}`,
    ACCOUNT_DELETION_REQUEST_OPTIONS as any,
  );

  const data = await response.json();

  if (data.username) {
    return {
      status: "success",
      data: data,
    };
  }

  return {
    status: "error",
    data: {},
  };
};

const fetchUserEducation = async (
  id: number,
): Promise<{
  status: "error" | "success";
  data: Array<AuthorizedUserEducationType>;
}> => {
  if (id === null || id === undefined) {
    return {
      status: "error",
      data: [],
    };
  }

  const response = await fetch(`${STRAPI_BASE_API_URL}/users/${id}`);
  const data = await response.json();

  if (data.username) {
    return {
      status: "success",
      data: data.education ?? [],
    };
  }

  return {
    status: "error",
    data: [],
  };
};

const AuthorizedUserEducationOperations = async (method: APIMethodType) => {
  switch (method) {
    case "update":
      return {
        status: "success",
        method: async (
          data: Array<AuthorizedUserEducationType>,
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
                education: data,
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

            console.log(
              "UPDATED RESPONSE FROM MIDDLEWARE",
              updatedDataResponse,
            );
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

const submitFeedback = async (
  username: string,
  feedback: FeedbackInterface,
): Promise<{
  status: "error" | "success";
}> => {
  if (!username) return { status: "error" };

  const REQUEST_OPTIONS = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      data: {
        username: username,
        response: [feedback],
      },
    }),
    redirect: "follow",
  };

  const response = await fetch(
    `${STRAPI_BASE_API_URL}/feedbacks`,
    REQUEST_OPTIONS as any,
  );
  const data = await response.json();

  if (data.data.attributes) {
    return {
      status: "success",
    };
  }

  return {
    status: "error",
  };
};

const fetchUserExperience = async (
  id: number,
): Promise<{
  status: "error" | "success";
  data: Array<AuthorizedUserExperienceType>;
}> => {
  if (id === null || id === undefined) {
    return {
      status: "error",
      data: [],
    };
  }

  const response = await fetch(`${STRAPI_BASE_API_URL}/users/${id}`);
  const data = await response.json();

  if (data.username) {
    return {
      status: "success",
      data: data.experience ?? [],
    };
  }

  return {
    status: "error",
    data: [],
  };
};

export {
  // social links related methods
  AuthorizedUserSocialLinksOperations,
  // delete user account methods
  deleteUserAccount,
  // education related methods
  fetchUserEducation,
  AuthorizedUserEducationOperations,
  // feedback related methods
  submitFeedback,
  // experience related methods
  fetchUserExperience,
};
