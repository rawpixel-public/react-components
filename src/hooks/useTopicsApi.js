import React from "react";

export default (
  widget,
  page = 1,
  pagesize = 100,
  baseUrl = "https://dev-labs.rawpixel.com"
) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [topics, setTopics] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    const queryParams = {
      ...(typeof widget === "number" && { widget }),
      ...(page && { page }),
      ...(pagesize && { pagesize })
    };
    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join("&");

    fetch(`${baseUrl}/api/v1/topics?${queryString}`, {
      method: "GET",
      credentials: "include",
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.results)) {
          setLoading(false);
          setTopics(data.results);
        } else {
          console.log({ data });
        }
      })
      .catch(reason => {
        console.log({ reason });
        setLoading(false);
        setError(true);
      });
  }, [widget, page, pagesize]);

  return { error, loading, topics };
};
