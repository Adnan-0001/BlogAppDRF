export const getRefreshToken = () => {
  try {
    const tokens = localStorage.getItem("authTokens");
    const { refresh } = JSON.parse(tokens);
    return refresh;
  } catch (error) {
    console.log(error);
  }
};
