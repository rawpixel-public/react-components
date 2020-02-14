import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
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
    icon: starSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Trending",
    url: "https://www.rawpixel.com/search/trending?sort=curated&page=1",
    icon: trendingSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Stickers",
    url: "https://www.rawpixel.com/search/stickers?sort=curated&page=1",
    icon: stickerSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Photos",
    url: "https://www.rawpixel.com/search/photos?sort=curated&page=1",
    icon: backgroundSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Graphics",
    url: "https://www.rawpixel.com/search/graphics?sort=curated&page=1",
    icon: resizeSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Templates",
    url: "https://www.rawpixel.com/search/templates?sort=curated&page=1",
    icon: templateSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Public domain",
    url: "https://www.rawpixel.com/search/public+domain?sort=curated&page=1",
    icon: leafSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Fonts",
    url: "https://www.rawpixel.com/search/fonts?sort=curated&page=1",
    icon: fontSvg,
    type: "addon",
    isPublished: true
  },
  {
    title: "Lightroom Presets",
    url: "https://www.rawpixel.com/search/lightroom?sort=curated&page=1",
    icon: slidersSvg,
    type: "addon",
    isPublished: true
  }
];

export const sidebar = () => (
  <WidgetsBar widgets={widgetsData} onFilterClick={action("filter-click")} />
);

export const dam = () => (
  <WidgetsBar
    widgets={widgetsData}
    onFilterClick={action("filter-click")}
    direction="row"
  />
);

export default {
  title: "Topics/Widgets",
  component: WidgetsBar,
  includeStories: [],
  decorators: [withKnobs]
};
