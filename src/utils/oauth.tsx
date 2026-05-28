const getUrlOauthGoogle = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URL } = import.meta.env;
  const uri = "https://accounts.google.com/o/oauth2/v2/auth";
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URL,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    prompt: "consent",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${uri}?${queryString}`;
};

const urlOauthGoogle = getUrlOauthGoogle();
export default urlOauthGoogle;
