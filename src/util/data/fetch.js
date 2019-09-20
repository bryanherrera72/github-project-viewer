import fetch from "cross-fetch";

export const getProject = async title => {
  const [username, reponame] = title.split("/");
  if (username && reponame) {
    try {
      let response = await fetch(
        "https://api.github.com/repos/" +
          username +
          "/" +
          reponame +
          "/branches",
        {
          method: "GET"
        }
      );
      if (response.status >= 400) {
        throw new Error(response.message);
      }
      return await response.json();
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  } else {
    throw new Error("badly formed name");
  }
};
