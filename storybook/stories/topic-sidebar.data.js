import backgroundSvg from "../images/background.svg";
import fontSvg from "../images/font.svg";
import leafSvg from "../images/leaf.svg";
import resizeSvg from "../images/resize.svg";
import slidersSvg from "../images/sliders.svg";
import starSvg from "../images/star.svg";
import stickerSvg from "../images/sticker.svg";
import templateSvg from "../images/template.svg";
import trendingSvg from "../images/trending.svg";
import heartSvg from "../images/heart.svg";
import doodleSvg from "../images/doodle.svg";
import patternSvg from "../images/pattern.svg";
import frameSvg from "../images/frame.svg";
import logoSvg from "../images/logo.svg";
import ornamentSvg from "../images/ornament.svg";
import transparentSvg from "../images/transparent.svg";
import wallpaperSvg from "../images/wallpaper.svg";
import watercolorSvg from "../images/watercolor.svg";

export const topics = [
  {
    title: "Stickers",
    tag: "$stickers",
    icon_url: stickerSvg
  },
  {
    title: "Patterns",
    tag: "$patterns",
    icon_url: patternSvg
  },
  {
    title: "Icons",
    tag: "$icon",
    icon_url: heartSvg
  },
  {
    title: "Doodles",
    tag: "$doodles",
    icon_url: doodleSvg
  },
  {
    title: "Typography",
    tag: "$typography",
    icon_url: fontSvg
  },
  {
    title: "Frames",
    tag: "$frames",
    icon_url: frameSvg
  },
  {
    title: "Logos",
    tag: "$logos",
    icon_url: logoSvg
  },
  {
    title: "Ornamental",
    tag: "$ornamental",
    icon_url: ornamentSvg
  },
  {
    title: "Transparent PNG",
    tag: "$transparent",
    icon_url: transparentSvg
  },
  {
    title: "Wallpaper",
    tag: "$wallpaper",
    icon_url: wallpaperSvg
  },
  {
    title: "Watercolors",
    tag: "$watercolors",
    icon_url: watercolorSvg
  },
  {
    title: "Backgrounds",
    tag: "$backgrounds",
    icon_url: backgroundSvg
  },
  {
    title: "Nature",
    tag: "$nature",
    icon_url: leafSvg
  },
  {
    title: "Graphics",
    tag: "$graphics",
    icon_url: resizeSvg
  },
  {
    title: "Watercolors",
    tag: "$watercolors",
    icon_url: watercolorSvg
  }
].map((topic, index) => ({ ...topic, id: index.toString() }));

export const categories = [
  {
    id: 1,
    name: "All",
    visible: true
  },
  {
    id: 2,
    name: "Elements",
    visible: true
  },
  {
    id: 3,
    name: "Stickers",
    visible: true
  },
  {
    id: 4,
    name: "Photos",
    visible: false
  },
  {
    id: 5,
    name: "Wallpaper",
    visible: true
  }
];

export const widgets = [
  {
    title: "My topics",
    url: "https://www.rawpixel.com/search/my+topics?sort=curated&page=1",
    icon_url: starSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Trending",
    url: "https://www.rawpixel.com/search/trending?sort=curated&page=1",
    icon_url: trendingSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Stickers",
    url: "https://www.rawpixel.com/search/stickers?sort=curated&page=1",
    icon_url: stickerSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Photos",
    url: "https://www.rawpixel.com/search/photos?sort=curated&page=1",
    icon_url: backgroundSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Graphics",
    url: "https://www.rawpixel.com/search/graphics?sort=curated&page=1",
    icon_url: resizeSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Templates",
    url: "https://www.rawpixel.com/search/templates?sort=curated&page=1",
    icon_url: templateSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Public domain",
    url: "https://www.rawpixel.com/search/public+domain?sort=curated&page=1",
    icon_url: leafSvg,
    type: "filter",
    isPublished: true
  },
  {
    title: "Fonts",
    url: "https://www.rawpixel.com/search/fonts?sort=curated&page=1",
    icon_url: fontSvg,
    type: "addon",
    isPublished: true
  },
  {
    title: "Lightroom Presets",
    url: "https://www.rawpixel.com/search/lightroom?sort=curated&page=1",
    icon_url: slidersSvg,
    type: "addon",
    isPublished: true
  }
];
