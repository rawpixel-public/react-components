import React from "react";

const fetchTopics = async (widget, page = 1, baseUrl, basePath) => {
  const queryParams = {
    ...(typeof widget === "number" && { widget }),
    page,
    pagesize: 100
  };
  const queryString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join("&");

  const response = await fetch(`${baseUrl}${basePath}/topics?${queryString}`, {
    method: "GET",
    credentials: "include",
    mode: "cors"
  });
  return response.json();
};

export default (
  widget,
  baseUrl = "https://dev-labs.rawpixel.com",
  basePath = "/api/v1"
) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [topics, setTopics] = React.useState([]);

  React.useEffect(() => {
    async function loadTopics() {
      setLoading(true);
      let page = 1;
      let loadedTopics = [];
      let allTopicsLoaded = false;

      try {
        while (!allTopicsLoaded) {
          const { results, total } = await fetchTopics(
            widget,
            page,
            baseUrl,
            basePath
          );
          loadedTopics = loadedTopics.concat(results);
          allTopicsLoaded = loadedTopics.length === total;
          page++;
        }

        setTopics(loadedTopics);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }

    loadTopics().finally();
  }, [widget, baseUrl]);

  return { error, loading, topics };
};
