import React from "react";

const groupMapper = group => filter => ({ ...filter, group });

const useTopicWidgetSettings = (site, widget) => {
  const [main, setMain] = React.useState([]);
  const [fileTypes, setFileTypes] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [secondaryFilters, setSecondaryFilters] = React.useState([]);

  React.useEffect(() => {
    if (!widget) {
      return;
    }

    const { websiteFilters = {}, damFilters = {} } = widget;
    const { main, fileTypes, filters: filtersWebsite } = websiteFilters;
    const { team = {}, website = {} } = damFilters;
    const { filters: filtersDamWeb } = website;
    const { filters: filtersDamTeam, secondaryFilters } = team;

    const getFiltersBySite = site => {
      switch (site) {
        case "dam-website":
          return filtersDamWeb;
        case "dam-team":
          return filtersDamTeam;
        case "website":
          return filtersWebsite;
      }
    };

    setMain(main.map(groupMapper("main")));
    setFileTypes(fileTypes.map(groupMapper("fileTypes")));
    setFilters(getFiltersBySite(site).map(groupMapper("filters")));

    if (site === "dam-team") {
      setSecondaryFilters(
        secondaryFilters.map(groupMapper("secondaryFilters"))
      );
    }
  }, [site, widget]);

  return {
    main,
    fileTypes,
    filters,
    ...(site === "dam-team" && { secondaryFilters })
  };
};

export default useTopicWidgetSettings;
