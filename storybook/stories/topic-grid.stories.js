import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Topic } from "@rawpixel-public/react-components";
import starSvg from "../images/star.svg";

export const dam = () => {
  const [loading, setLoading] = React.useState(false);
  const [tagged, setTagged] = React.useState(true);
  const [explanation, setExplanation] = React.useState("All images tagged. Click to untag.");

  const handleTopicClick = () => {
    setLoading(true);
    setExplanation(tagged ? "Untagging images..." : "Tagging images...");
    setTimeout(() => {
      setTagged(!tagged);
      setLoading(false);
      setExplanation(!tagged ? "All images tagged. Click to untag." : "All images untagged. Click to tag.");
    }, 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p>{explanation}</p>
      <Topic
        id={text("id", 1, "dam")}
        icon={text("icon", starSvg, "dam")}
        title={text("title", "My topics", "dam")}
        isLoading={loading}
        isTagged={tagged}
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
