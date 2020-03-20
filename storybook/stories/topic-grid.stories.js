import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { Topic, TopicsGrid, useTopicsApi } from "@rawpixel-public/react-components";

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
].map((topic, index) => ({ ...topic, id: index }));

export const grid = () => {
  return (
    <TopicsGrid
      topics={topicsData}
      onTopicClick={action("topic-grid-click")}
      loading={boolean("loading", false)}
    />
  );
};

export const noScroll = () => {
  return (
    <TopicsGrid
      topics={topicsData.slice(0, 9)}
      onTopicClick={action("topic-grid-click")}
      defaultHeight={320}
      loading={boolean("loading", false)}
      viewable={9}
    />
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
        name={text("name", "My topics", "dam")}
        isLoading={loading}
        isTagged={tagged}
        isTagMode={boolean("isTagMode", true, "dam")}
        onTopicClick={handleTopicClick}
      />
    </div>
  );
};

export const api = () => {
  const { loading, topics } = useTopicsApi();
  return <TopicsGrid
    topics={topics}
    onTopicClick={action("topic-grid-click")}
    defaultHeight={320}
    loading={loading}
    viewable={9}
  />
};

export default {
  title: "Topics/Topic Grid",
  component: Topic,
  includeStories: [],
  decorators: [withKnobs]
};
