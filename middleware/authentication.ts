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
    document.cookie = `id=${data.user.id}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `username=${username}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `password=${password}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `profileAvatar=${data.user.profileAvatar}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `email=${data.user.email}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `firstName=${data.user.firstName}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `lastName=${data.user.lastName}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `bio=${encodeURIComponent(
      data.user.bio,
    )}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `education=${JSON.stringify(
      data.user.education,
    )}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `experience=${JSON.stringify(
      data.user.experience,
    )}; expires=${JWT_EXPIRATION_TIME} path=/`;
    document.cookie = `socialLinks=${JSON.stringify(
      data.user.socialLinks,
    )}; expires=${JWT_EXPIRATION_TIME} path=/`;

    return {
      status: "success",
      data: {
        id: data.user.id,
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
        socialLinks: data.user.socialLinks ?? [],
        education: data.user.education ?? [],
        experience: data.user.experience ?? [],
      },
    };
  }

  return {
    status: "error",
    data: {} as any,
  };
};

const registerUser = async ({
  username,
  password,
  email,
  firstName,
  lastName = "",
}: CreateAccountDataType): Promise<{
  status: "error" | "success";
  data: AuthorizedUserType | {};
}> => {
  // check if all the mandatory data items are provided
  if (!username || !password || !email || !firstName) {
    return {
      status: "error",
      data: {},
    };
  }

  const userAccountDetails = JSON.stringify({
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName,
    blocked: false,
    confirmed: true,
    provider: "local",
    role: 1,
  });

  const CREATE_ACCOUNT_REQUEST_OPTIONS = {
    body: userAccountDetails,
    ...REQUEST_OPTIONS,
  };

  // POST method request for creating new user to account DB
  const response = await fetch(
    `${STRAPI_BASE_API_URL}/users`,
    CREATE_ACCOUNT_REQUEST_OPTIONS as any,
  );
  const data = await response.json();

  if (data.username) {
    // received data as response; account created
    return {
      status: "success",
      data,
    };
  }

  return {
    status: "error",
    data: {},
  };
};

export { authorizeUser, registerUser };
