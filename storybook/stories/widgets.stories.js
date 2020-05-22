import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";
import { WidgetsBar } from "@rawpixel-public/react-components";

import backgroundSvg from "../images/background.svg";
import fontSvg from "../images/font.svg";
import leafSvg from "../images/leaf.svg";
import resizeSvg from "../images/resize.svg";
import slidersSvg from "../images/sliders.svg";
import starSvg from "../images/star.svg";
import stickerSvg from "../images/sticker.svg";
import templateSvg from "../images/template.svg";
import trendingSvg from "../images/trending.svg";

const widgetsData = [
  {
    title: "My topics",
    url: "https://www.rawpixel.com/search/my+topics?sort=curated&page=1",
    icon_url: starSvg,
    type: "topic_group",
    hearted: true
  },
  {
    title: "Trending",
    url: "https://www.rawpixel.com/search/trending?sort=curated&page=1",
    icon_url: trendingSvg,
    type: "topic_group",
    hearted: true
  },
  {
    title: "Stickers",
    url: "https://www.rawpixel.com/search/stickers?sort=curated&page=1",
    icon_url: stickerSvg,
    type: "topic_group"
  },
  {
    title: "Photos",
    url: "https://www.rawpixel.com/search/photos?sort=curated&page=1",
    icon_url: backgroundSvg,
    type: "topic_group"
  },
  {
    title: "Graphics",
    url: "https://www.rawpixel.com/search/graphics?sort=curated&page=1",
    icon_url: resizeSvg,
    type: "topic_group",
    hearted: true
  },
  {
    title: "Templates",
    url: "https://www.rawpixel.com/search/templates?sort=curated&page=1",
    icon_url: templateSvg,
    type: "topic_group"
  },
  {
    title: "Public domain",
    url: "https://www.rawpixel.com/search/public+domain?sort=curated&page=1",
    icon_url: leafSvg,
    type: "topic_group",
    hearted: true
  },
  {
    title: "Fonts",
    url: "https://www.rawpixel.com/search/fonts?sort=curated&page=1",
    icon_url: fontSvg,
    type: "add_on"
  },
  {
    title: "Lightroom Presets",
    url: "https://www.rawpixel.com/search/lightroom?sort=curated&page=1",
    icon_url: slidersSvg,
    type: "add_on",
    hearted: true
  }
];

export const sidebar = () => (
  <WidgetsBar
    widgets={widgetsData}
    onFilterClick={action("filter-click")}
    grouping={select("grouping", ["hearted", "type", "none"], "type")}
  />
);

export const dam = () => (
  <WidgetsBar
    widgets={widgetsData}
    onFilterClick={action("filter-click")}
    direction="row"
    grouping={select("grouping", ["hearted", "type", "none"], "type")}
  />
);

export default {
  title: "Topics/Widgets",
  component: WidgetsBar,
  includeStories: [],
  decorators: [withKnobs]
};
