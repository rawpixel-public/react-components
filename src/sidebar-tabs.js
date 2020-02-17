import React, { cloneElement, Children, useState } from "react";
import PropTypes from "prop-types";

import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsHeader,
  StyledTabButton
} from "./components/SidebarTabs/StyledSidebarTabs";

const SidebarTabs = ({ children, activeTab, onTabChange }) => {
  const [activeIndex, setActiveIndex] = useState(activeTab || 0);
  if (activeTab !== undefined && activeTab !== activeIndex) {
    setActiveIndex(activeTab);
  }

  const changeTab = index => {
    if (activeTab === undefined) {
      setActiveIndex(index);
    }
    if (typeof onTabChange === "function") {
      onTabChange(index);
    }
  };

  const tabs = Children.map(children, (tab, index) => {
    return cloneElement(tab, {
      onClick: () => changeTab(index),
      active: index === activeIndex
    });
  });

  const content = Children.toArray(children)
    .filter((tab, index) => index === activeIndex)
    .map(({ props: { children } }) => children);

  return (
    <StyledTabs role="tablist">
      <StyledTabsHeader>{tabs}</StyledTabsHeader>
      <StyledTabsContent role="tabpanel">{content}</StyledTabsContent>
    </StyledTabs>
  );
};

SidebarTabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node,
  onTabChange: PropTypes.func
};

const SidebarTab = ({ title, ...props }) => (
  <StyledTabButton {...props}>{title}</StyledTabButton>
);

SidebarTab.propTypes = {
  title: PropTypes.string
};

export { SidebarTabs, SidebarTab };
