import React from "react";

const initialState = {
  websiteFilters: {
    main: [],
    fileTypes: [],
    filters: []
  },
  damFilters: {
    team: {
      filters: [],
      secondaryFilters: []
    },
    website: {
      filters: []
    }
  }
};

export default (filterId, baseUrl = "https://dev-labs.rawpixel.com") => {
  const [settings, setSettings] = React.useState({});

  React.useEffect(() => {
    if (filterId && !(filterId in settings)) {
      const url = `${baseUrl}/_services/topics/filters/${filterId}`;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Cookies");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "include",
        redirect: "follow"
      };
      fetch(url, requestOptions)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`fetching filters from ${url} failed`);
        })
        .then(data => {
          setSettings({ ...settings, [filterId]: data });
        })
        .catch(error => console.error(error));
    }
  }, [filterId, baseUrl]);

  return settings[filterId] || initialState;
};
