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
    name: "Stickers",
    tag: "$stickers",
    icon: stickerSvg
  },
  {
    name: "Patterns",
    tag: "$patterns",
    icon: patternSvg
  },
  {
    name: "Icons",
    tag: "$icons",
    icon: heartSvg
  },
  {
    name: "Doodles",
    tag: "$doodles",
    icon: doodleSvg
  },
  {
    name: "Typography",
    tag: "$typography",
    icon: fontSvg
  },
  {
    name: "Frames",
    tag: "$frames",
    icon: frameSvg
  },
  {
    name: "Logos",
    tag: "$logos",
    icon: logoSvg
  },
  {
    name: "Ornamental",
    tag: "$ornamental",
    icon: ornamentSvg
  },
  {
    name: "Transparent PNG",
    tag: "$transparent",
    icon: transparentSvg
  },
  {
    name: "Wallpaper",
    tag: "$wallpaper",
    icon: wallpaperSvg
  },
  {
    name: "Watercolors",
    tag: "$watercolors",
    icon: watercolorSvg
  },
  {
    name: "Backgrounds",
    tag: "$backgrounds",
    icon: backgroundSvg
  },
  {
    name: "Nature",
    tag: "$nature",
    icon: leafSvg
  },
  {
    name: "Graphics",
    tag: "$graphics",
    icon: resizeSvg
  },
  {
    name: "Watercolors",
    tag: "$watercolors",
    icon: watercolorSvg
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
