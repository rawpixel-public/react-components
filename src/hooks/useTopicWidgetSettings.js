import React from "react";

const useTopicWidgetSettings = (site, widget) => {
  const [main, setMain] = React.useState([]);
  const [fileTypes, setFileTypes] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [secondaryFilters, setSecondaryFilters] = React.useState([]);

  React.useEffect(() => {
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

    setMain(main);
    setFileTypes(fileTypes);
    setFilters(getFiltersBySite(site));

    if (site === "dam-team") {
      setSecondaryFilters(secondaryFilters);
    }
  }, [site, widget]);

  // Handles rules around which filters can be active in "main" group.
  const validateAndSetMain = (filters, updatedFilter) => {
    if (updatedFilter.tag === "$free" && updatedFilter.active) {
      const premium = filters.find(filter => filter.tag === "$premium");
      const premiumIndex = filters.indexOf(premium);
      premium.active = false;
      filters[premiumIndex] = premium;
    }

    if (updatedFilter.tag === "$premium" && updatedFilter.active) {
      const free = filters.find(filter => filter.tag === "$free");
      const freeIndex = filters.indexOf(free);
      free.active = false;
      filters[freeIndex] = free;
    }

    setMain(filters);
  };

  // Only one filter from the "filters" group can be active at a time.
  const validateAndSetFilters = (filters, updatedFilter) => {
    setFilters(
      filters.map(filter => {
        if (filter.tag !== updatedFilter.tag) {
          filter.active = false;
        }
        return filter;
      })
    );
  };

  return {
    main,
    fileTypes,
    filters,
    ...(site === "dam-team" && { secondaryFilters }),
    setMain: validateAndSetMain,
    setFileTypes,
    setFilters: validateAndSetFilters,
    secondaryFilters
  };
};

export default useTopicWidgetSettings;
