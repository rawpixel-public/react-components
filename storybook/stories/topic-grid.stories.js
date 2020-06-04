import React from "react";
import {
  withKnobs,
  text,
  boolean,
  select,
  number
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import {
  Topic,
  TopicsGrid,
  useTopicsApi
} from "@rawpixel-public/react-components";

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
    tag: "$icons",
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
    title: "Social media post",
    tag: "$social",
    icon_url: logoSvg
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
].map((topic, index) => ({ ...topic, id: index, groupIcon: topic.icon_url }));

export const grid = () => {
  return (
    <TopicsGrid
      topics={topicsData
        .map(topic => ({
          ...topic,
          groupIcon: boolean("show group icon", false) && topic.groupIcon
        }))
        .slice(0, number("number of topics", topicsData.length))}
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
  const { loading, topics } = useTopicsApi(
    {
      widget: select(
        "widget",
        { "61": 61, "62": 62, "63": 63, "64": 64, "65": 65 },
        61,
        "api"
      ),
      trending: boolean("trending", false, "api"),
      published: boolean("published", true, "api")
    },
    {
      revalidate: boolean("revalidate", true, "api")
    }
  );
  return (
    <TopicsGrid
      topics={topics.map(topic => ({
        ...topic,
        groupIcon: boolean("groupIcon", true, "api") ? topic.icon_url : null
      }))}
      onTopicClick={action("topic-grid-click")}
      defaultHeight={320}
      loading={loading}
      viewable={9}
    />
  );
};

export default {
  title: "Topics/Topic Grid",
  component: Topic,
  includeStories: [],
  decorators: [withKnobs]
};
