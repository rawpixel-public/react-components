import React from "react";

export default (target = "website", catalog = "") => {
  const [loading, setLoading] = React.useState(false);
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

    fetch(
      `https://8703b7e2-39a9-46c9-888e-71d05385ced9.mock.pstmn.io/_services/topics/sidebar/widgets?${queryString}`,
      {
        method: "GET"
      }
    )
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
