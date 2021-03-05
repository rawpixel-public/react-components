import React from "react";
import { withKnobs, select, number, boolean } from "@storybook/addon-knobs";
import { SubTopics } from "@rawpixel-public/react-components";

import Centered from "../components/Centered";

const subtopics = [
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
    name: "Graphic Design",
    visible: false
  },
  {
    id: 5,
    name: "Wallpaper",
    visible: true
  },
  {
    id: 6,
    name: "Photos",
    visible: true
  },
  {
    id: 7,
    name: "Photography",
    visible: true
  },
  {
    id: 8,
    name: "Elements",
    visible: true
  },
  {
    id: 9,
    name: "Stickers",
    visible: true
  },
  {
    id: 10,
    name: "Photos",
    visible: false
  },
  {
    id: 11,
    name: "Wallpaper",
    visible: true
  },
  {
    id: 12,
    name: "Graphic Design",
    visible: true
  }
];

export const controls = () => {
  const [selected, setSelected] = React.useState([]);
  const handleClick = (e, val) => {
    if (selected.includes(val)) {
      setSelected([]);
    } else {
      setSelected([val]);
    }
  };
  return (
    <Centered style={{ background: "#F9F9F9" }}>
      <div
        style={{
          width: select("width", ["190px", "235px", "300px"], "190px"),
          overflow: "hidden"
        }}
      >
        <SubTopics
          selected={selected}
          expandable={boolean("expandable", true)}
          subtopics={subtopics}
          onClick={handleClick}
          displayed={number("displayed", 5, {
            max: subtopics.length,
            min: 3
          })}
        />
      </div>
    </Centered>
  );
};

export default {
  title: "Topics/SubTopics",
  component: SubTopics,
  includeStories: [],
  decorators: [withKnobs]
};
