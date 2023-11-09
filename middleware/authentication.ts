import { JWT_EXPIRATION_TIME, STRAPI_BASE_API_URL } from "@/common";

let HEADERS = new Headers();
HEADERS.append("Content-Type", "application/json");

const REQUEST_OPTIONS = {
  method: "POST",
  headers: HEADERS,
  redirect: "follow",
};

const authorizeUser = async (
  username: string,
  password: string,
): Promise<{
  status: "error" | "success";
  data: AuthorizedUserType;
}> => {
  if (!username || !password)
    return {
      status: "error",
      data: {} as any,
    };

  const BODY = JSON.stringify({
    identifier: username,
    password: password,
  });

  const response = await fetch(`${STRAPI_BASE_API_URL}/auth/local`, {
    ...REQUEST_OPTIONS,
    body: BODY,
  } as any);

  const data = await response.json();

  if (data.jwt) {
    document.cookie = `jwt=${data.jwt}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `username=${username}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `password=${password}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `profileAvatar=${data.user.profileAvatar}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `email=${data.user.email}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `firstName=${data.user.firstName}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `lastName=${data.user.lastName}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `bio=${encodeURIComponent(data.user.bio)}; expires=${JWT_EXPIRATION_TIME} path=/`;

    return {
      status: "success",
      data: {
        username: data.user.username,
        password: password,
        email: data.user.email,
        profileAvatar: data.user.profileAvatar,
        fullName: {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        },
        bio: data.user.bio,
        isAuthenticated: true,
      },
    };
  }

  return {
    status: "error",
    data: {} as any,
  };
};

export { authorizeUser };
