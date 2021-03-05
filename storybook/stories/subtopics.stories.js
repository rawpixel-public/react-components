import React from "react";
import {
  withKnobs,
  text,
  boolean,
  select,
  object
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Categories } from "@rawpixel-public/react-components";

import Centered from "../components/Centered";

export const controls = () => {
  return (
    <Centered style={{ background: "#F9F9F9" }}>
      <div
        style={{
          width: select("width", ["190px", "235px", "300px"], "190px"),
          overflow: "hidden"
        }}
      >
        <Categories
          categories={object(
            "categories",
            [
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
              },
              {
                id: 6,
                name: "Graphic Design",
                visible: true
              },
              {
                id: 7,
                name: "Photography",
                visible: true
              }
            ],
            "controls"
          )}
          title={text("title", "Graphics", "controls")}
          showClear={boolean("showClear", false, "controls")}
          onClearClick={action("clear-click")}
          onCategoryClick={action("category-click")}
          displayedItems={select("displayedItems", [2, 3, 4, 5], 3, "controls")}
        />
      </div>
    </Centered>
  );
};

export const noControls = () => {
  const [active, setActive] = React.useState();

  return (
    <Centered style={{ background: "#FFF" }}>
      <div style={{ width: "300px" }}>
        <Categories
          categories={object(
            "categories",
            [
              {
                id: 1,
                name: "All",
                color_value: "#95ABD4"
              },
              {
                id: 2,
                name: "Elements",
                color_value: "#C88484"
              },
              {
                id: 3,
                name: "Stickers",
                color_value: "#A1CCB6"
              }
            ],
            "clear"
          )}
          title={text("title", "Graphics", "clear")}
          showClear={boolean("showClear", true, "clear")}
          onClearClick={() => setActive(undefined)}
          onCategoryClick={(e, c) => setActive(c)}
          displayedItems={select("displayedItems", [2, 3], 3, "clear")}
          activeCategory={active}
        />
      </div>
    </Centered>
  );
};

export const selectMultiple = () => {
  const [active, setActive] = React.useState([]);

  const handleCategoryClick = (e, c) => {
    if (active.indexOf(c) > -1) {
      setActive(active.filter(item => c.id !== item.id));
    } else {
      setActive([...active, c]);
    }
  };

  return (
    <Centered style={{ background: "#F4F4F4" }}>
      <div style={{ width: "300px" }}>
        <Categories
          categories={object(
            "categories",
            [
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
            ],
            "controls"
          )}
          title="Select multiple"
          onClearClick={() => setActive([])}
          onCategoryClick={handleCategoryClick}
          displayedItems={select("displayedItems", [2, 3, 4, 5], 3, "controls")}
          activeCategory={active}
        />
      </div>
    </Centered>
  );
};

export default {
  title: "Topics/Categories",
  component: Categories,
  includeStories: [],
  decorators: [withKnobs]
};
