import React from "react";

const useTopicWidgetSettingsActiveState = () => {
  const [activeFilters, setActiveFilters] = React.useState([]);

  const handleSetActiveFilters = filter => {
    const { group, tag } = filter;
    const isActive = !!activeFilters.find(
      activeFilter => tag === activeFilter.tag
    );

    if (isActive) {
      setActiveFilters([
        ...activeFilters.filter(activeFilter => tag !== activeFilter.tag)
      ]);
    } else {
      switch (group) {
        case "main":
          // Only one of "free" or "premium" can be active.
          setActiveFilters([
            ...activeFilters.filter(({ tag }) => {
              if (filter.tag === "$free") {
                return tag !== "$premium";
              }
              if (filter.tag === "$premium") {
                return tag !== "$free";
              }
              return true;
            }),
            filter
          ]);
          break;

        case "filters":
          // Only one filter can be active at a time.
          setActiveFilters([
            ...activeFilters.filter(({ group }) => group !== "filters"),
            filter
          ]);
          break;

        default:
          setActiveFilters([...activeFilters, filter]);
          break;
      }
    }
  };

  const isFilterActiveMapper = filter => ({
    ...filter,
    active: !!activeFilters.find(
      activeFilter => activeFilter.tag === filter.tag
    )
  });

  const resetActiveFilters = () => setActiveFilters([]);

  return {
    activeFilters,
    setActiveFilters: handleSetActiveFilters,
    isFilterActiveMapper,
    resetActiveFilters
  };
};

export default useTopicWidgetSettingsActiveState;
