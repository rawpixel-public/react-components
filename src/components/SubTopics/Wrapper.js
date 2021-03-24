import styled from "styled-components";
import { theme } from "styled-tools";

import Button from "../../atoms/Button";
import ExpandButton from "./ExpandButton";

import { palette } from "../../utils/cssVars";

const Wrapper = styled.div`
  position: relative;

  & ul {
    margin: 2px -2px 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  & ul li {
    flex-grow: 1;
    list-style: none;
    margin: 0 2px 3px;
    &.expand {
      min-width: 24px;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      align-items: center;
    }
  }

  ${Button} {
    color: ${theme("subtopics.color.default", palette.grayDarkest)};
    font-size: ${theme("subtopics.font.size", "12px")};
    &:hover {
      color: ${theme("subtopics.color.hover", palette.topicIconColor)};
      background: ${theme("subtopics.background.hover", palette.havelock)};
    }
    &.active {
      color: ${theme("subtopics.color.active", palette.topicIconColor)};
      background: ${theme("subtopics.background.active", palette.royalblue)};
      &:hover {
        background: ${theme("subtopics.background.hover", palette.havelock)};
      }
    }
  }

  ${ExpandButton} {
    float: right;
  }
`;

export default Wrapper;
