import React from "react";

export default (
  target = "website",
  catalog = "",
  baseUrl = "https://dev-labs.rawpixel.com"
) => {
  const [loading, setLoading] = React.useState(true);
  const [widgets, setWidgets] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    const queryParams = {
      ...(target && { target }),
      ...(catalog && { catalog })
    };
    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join("&");

    fetch(`${baseUrl}/_services/topics/sidebar/widgets?${queryString}`, {
      method: "GET",
      credentials: "include",
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLoading(false);
          setWidgets(data);
        } else {
          console.log({ data });
        }
      })
      .catch(reason => {
        console.log({ reason });
        setLoading(false);
      });
  }, [target, catalog]);

  return { loading, widgets };
};
