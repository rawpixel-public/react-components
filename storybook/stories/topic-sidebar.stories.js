import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import {
  Button,
  Heading,
  HorizontalRule,
  SizeButton,
  WidgetsBar,
  TopicsGrid,
  Categories
} from "@rawpixel-public/react-components";

import { widgets, topics, categories } from "./topic-sidebar.data";
import SidebarButtonList from "../components/SidebarButtonList";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F4F4F4")};
  border-radius: 0.25em;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 280px;
`;

const ExampleSidebar = ({ isDAM }) => {
  const [topicData, setTopicData] = React.useState(topics);
  const [title, setTitle] = React.useState(widgets[0].title);
  const [activeFilter, setActiveFilter] = React.useState(0);
  const [live, setLive] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const handleFilterClick = (e, filter) => {
    setTitle(filter.title);
    setActiveFilter(widgets.indexOf(filter));
  };

  const handleTopicClick = (e, topic) => {
    const index = topicData.indexOf(topic);
    const isTagged = !topic.isTagged;
    const loadingTopic = {
      ...topic,
      isLoading: true,
      isTagged
    };
    const updatedTopics = [...topicData];
    updatedTopics[index] = loadingTopic;
    setTopicData(updatedTopics);

    setTimeout(() => {
      const loadedTopic = {
        ...topic,
        isLoading: false,
        isTagged: !topicData[index].isTagged
      };
      const updatedTopics = [...topicData];
      updatedTopics[index] = loadedTopic;
      setTopicData(updatedTopics);
    }, 1500);
  };

  return (
    <StyledSidebar isDAM={isDAM}>
      <div>
        {isDAM && (
          <>
            <SidebarButtonList>
              <Button>Details</Button>
              <Button active>Topics</Button>
            </SidebarButtonList>
            <SidebarButtonList itemsPerRow={3}>
              <Button size="small">Boards</Button>
              <Button size="small">Tag</Button>
              <Button size="small" active>
                Scores
              </Button>
            </SidebarButtonList>
            <SidebarButtonList>
              <Button>leaves</Button>
              <div
                style={{ textAlign: "center", padding: "5px 0", color: "#bbb" }}
              >
                {700 + score} ({score})
              </div>
            </SidebarButtonList>
            <SidebarButtonList>
              <Button onClick={() => setScore(score + 50)}>+50</Button>
              <Button onClick={() => setScore(score - 50)}>-50</Button>
            </SidebarButtonList>
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        <Categories
          title={title}
          categories={categories}
          onCategoryClick={action("category-click")}
          showClear={!isDAM}
        />
        <TopicsGrid
          topics={topicData}
          onTopicClick={handleTopicClick}
          isDAM={isDAM}
        />
        {isDAM && (
          <>
            <HorizontalRule style={{ width: "200px" }} />
            <SidebarButtonList>
              <Button active={live} onClick={() => setLive(!live)}>
                Live
              </Button>
              <Button active={!live} onClick={() => setLive(!live)}>
                Unpublished
              </Button>
            </SidebarButtonList>
          </>
        )}
        <HorizontalRule style={{ width: "200px" }} />
        <SidebarButtonList title={<Heading level={3}>File type</Heading>}>
          <Button
            as="a"
            href="https://www.rawpixel.com/search/trending?sort=curated&type=photos&page=1"
          >
            JPG / TIFF
          </Button>
          <Button
            as="a"
            href="https://www.rawpixel.com/search/trending?sort=curated&type=vectors&page=1"
          >
            Vectors
          </Button>
          <Button
            as="a"
            href="https://www.rawpixel.com/search/trending?sort=curated&type=psd&page=1"
          >
            PSD
          </Button>
          <Button
            as="a"
            href="https://www.rawpixel.com/search/trending?sort=curated&type=png&page=1"
          >
            PSD
          </Button>
          <Button
            as="a"
            href="https://www.rawpixel.com/search/trending?sort=curated&type=svg&page=1"
          >
            SVG
          </Button>
        </SidebarButtonList>
        <HorizontalRule style={{ width: "200px" }} />
        <SidebarButtonList>
          <Button onClick={action("sidebar-button-click")}>Backgrounds</Button>
          <Button onClick={action("sidebar-button-click")}>Frames</Button>
          <Button onClick={action("sidebar-button-click")}>Stickers</Button>
          <Button onClick={action("sidebar-button-click")}>Remix</Button>
        </SidebarButtonList>
        {!isDAM && (
          <>
            <HorizontalRule style={{ width: "200px" }} />
            <SidebarButtonList title={<Heading level={3}>Sizes</Heading>}>
              <SizeButton title="Portrait" height={40} width={30} />
              <SizeButton title="Landscape" height={30} width={40} />
              <SizeButton title="Social" height={40} width={40} />
              <SizeButton title="Banner 2:1" height={20} width={40} />
              <SizeButton title="Pinterest 2:3" height={45} width={30} />
              <SizeButton title="Landscape 16:9" height={27} width={48} />
              <SizeButton title="Story 9:16" height={48} width={27} />
              <SizeButton title="Banner 3:1" height={15} width={45} />
              <SizeButton title="Banner 5:7" height={40} width={30} />
            </SidebarButtonList>
          </>
        )}
      </div>

      <div>
        <WidgetsBar
          widgets={widgets}
          onFilterClick={handleFilterClick}
          activeWidget={activeFilter}
        />
      </div>
    </StyledSidebar>
  );
};

export const dam = () => {
  return <ExampleSidebar isDAM />;
};

export const website = () => {
  return <ExampleSidebar isDAM={false} />;
};

export default {
  title: "Topics/Sidebar",
  includeStories: [],
  decorators: [withKnobs]
};
