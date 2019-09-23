import fetch from "cross-fetch";

export const getProject = async title => {
  let project = {};
  project.title = title;
  try {
    let branches = await getFullBranches(title);
    // let mappedBranches = branches.map(branch =>{
    //     return getCommitsOnBranch(branch.url)
    // })
    // let commits = await getCommitsOnBranch()
    project.branches = branches;
    return project;
  } catch (e) {
    throw e;
  }
};

/**
 *
 * @param {string} title: Title of the project.
 * @returns branches array with full list of commits on each branch
 */
const getFullBranches = async title => {
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

      let branches = await response.json();

      let commits = await getCommitsOnBranch(
        username,
        reponame,
        branches[0].commit.sha
      );
      console.log(commits);

      return await branches;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  } else {
    throw new Error("badly formed name");
  }
};

const getCommitsOnBranch = async (username, reponame, sha) => {
  let url = "";
  if (username && reponame && sha) {
    url =
      "https://api.github.com/repos/" +
      username +
      "/" +
      reponame +
      "/commits?per_page=100&sha=" +
      sha;
    try {
      let response = await fetch(url, { method: "GET" });
      if (response.status >= 400) {
        throw new Error(response.message);
      }
      let commits = await response.json();

      //remap the response to remove useless data.
      let commitsCopy = commits.map(obj => {
        let parents = obj.parents.map(parent => {
          return { ...parent };
        });
        return {
          sha: obj.sha,
          message: obj.commit.message,
          parents: parents
        };
      });
      //mutate response.

      return await commitsCopy;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
