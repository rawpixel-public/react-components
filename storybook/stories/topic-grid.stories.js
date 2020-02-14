import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { Topic, TopicsGrid } from "@rawpixel-public/react-components";

import backgroundSvg from "../images/background.svg";
import fontSvg from "../images/font.svg";
import leafSvg from "../images/leaf.svg";
import resizeSvg from "../images/resize.svg";
import starSvg from "../images/star.svg";
import stickerSvg from "../images/sticker.svg";
import heartSvg from "../images/heart.svg";
import doodleSvg from "../images/doodle.svg";
import patternSvg from "../images/pattern.svg";
import frameSvg from "../images/frame.svg";
import logoSvg from "../images/logo.svg";
import ornamentSvg from "../images/ornament.svg";
import transparentSvg from "../images/transparent.svg";
import wallpaperSvg from "../images/wallpaper.svg";
import watercolorSvg from "../images/watercolor.svg";

const topicsData = [
  {
    title: "Stickers",
    filter: "$stickers",
    icon: stickerSvg
  },
  {
    title: "Patterns",
    filter: "$patterns",
    icon: patternSvg
  },
  {
    title: "Icons",
    filter: "$icons",
    icon: heartSvg
  },
  {
    title: "Doodles",
    filter: "$doodles",
    icon: doodleSvg
  },
  {
    title: "Typography",
    filter: "$typography",
    icon: fontSvg
  },
  {
    title: "Frames",
    filter: "$frames",
    icon: frameSvg
  },
  {
    title: "Logos",
    filter: "$logos",
    icon: logoSvg
  },
  {
    title: "Ornamental",
    filter: "$ornamental",
    icon: ornamentSvg
  },
  {
    title: "Transparent PNG",
    filter: "$transparent",
    icon: transparentSvg
  },
  {
    title: "Wallpaper",
    filter: "$wallpaper",
    icon: wallpaperSvg
  },
  {
    title: "Watercolors",
    filter: "$watercolors",
    icon: watercolorSvg
  },
  {
    title: "Backgrounds",
    filter: "$backgrounds",
    icon: backgroundSvg
  },
  {
    title: "Nature",
    filter: "$nature",
    icon: leafSvg
  },
  {
    title: "Graphics",
    filter: "$graphics",
    icon: resizeSvg
  },
  {
    title: "Watercolors",
    filter: "$watercolors",
    icon: watercolorSvg
  }
].map((topic, index) => ({ ...topic, id: index }));

export const grid = () => {
  return (
    <TopicsGrid topics={topicsData} onTopicClick={action("topic-grid-click")} />
  );
};

export const dam = () => {
  const [loading, setLoading] = React.useState(false);
  const [tagged, setTagged] = React.useState(true);
  const [explanation, setExplanation] = React.useState(
    "All images tagged. Click to untag."
  );

  const handleTopicClick = () => {
    setLoading(true);
    setExplanation(tagged ? "Untagging images..." : "Tagging images...");
    setTimeout(() => {
      setTagged(!tagged);
      setLoading(false);
      setExplanation(
        !tagged
          ? "All images tagged. Click to untag."
          : "All images untagged. Click to tag."
      );
    }, 3000);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>{explanation}</p>
      <Topic
        id={text("id", 1, "dam")}
        icon={text("icon", starSvg, "dam")}
        title={text("title", "My topics", "dam")}
        isLoading={loading}
        isTagged={tagged}
        isDAM={boolean("isDAM", true, "dam")}
        onTopicClick={handleTopicClick}
      />
    </div>
  );
};

export default {
  title: "Topics/Topic Grid",
  component: Topic,
  includeStories: [],
  decorators: [withKnobs]
};
