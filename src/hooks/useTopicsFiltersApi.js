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

const defaultParams = {
  filterId: null
};

const defaultOptions = {
  baseUrl: "https://dev-labs.rawpixel.com",
  shouldFetch: true
};

export default (params = defaultParams, options = defaultOptions) => {
  const { filterId } = { ...defaultParams, ...params };
  const { baseUrl, shouldFetch } = { ...defaultOptions, ...options };

  const [settings, setSettings] = React.useState({});

  React.useEffect(() => {
    if (shouldFetch && filterId && !(filterId in settings)) {
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
  }, [filterId, baseUrl, shouldFetch]);

  return settings[filterId] || initialState;
};
