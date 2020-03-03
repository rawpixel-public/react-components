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
      if (group === "main") {
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
      } else {
        setActiveFilters([...activeFilters, filter]);
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
