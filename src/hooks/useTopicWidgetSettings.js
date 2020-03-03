import React from "react";

const groupMapper = group => filter => ({ ...filter, group });

const useTopicWidgetSettings = (catalogId, widget) => {
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

    const getFiltersByCatalogId = id => {
      switch (id) {
        case "website_content":
        case "dam-website":
          return filtersDamWeb;
        case "team":
        case "dam-team":
          return filtersDamTeam;
        case "website":
          return filtersWebsite;
      }
    };

    setMain(main.map(groupMapper("main")));
    setFileTypes(fileTypes.map(groupMapper("fileTypes")));
    setFilters(getFiltersByCatalogId(catalogId).map(groupMapper("filters")));

    if (catalogId === "dam-team" || catalogId === "team") {
      setSecondaryFilters(
        secondaryFilters.map(groupMapper("secondaryFilters"))
      );
    }
  }, [catalogId, widget]);

  return {
    main,
    fileTypes,
    filters,
    ...((catalogId === "dam-team" || catalogId === "team") && {
      secondaryFilters
    })
  };
};

export default useTopicWidgetSettings;
