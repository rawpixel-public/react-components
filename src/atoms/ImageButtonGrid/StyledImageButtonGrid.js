import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { palette } from "../../utils/cssVars";

const setCursorStyle = props => {
  const { height, minConstraints, maxConstraints } = props;
  const [, minHeight] = minConstraints;
  const [, maxHeight] = maxConstraints;
  if (height === minHeight) {
    return css`
      cursor: s-resize;
    `;
  }
  if (height === maxHeight) {
    return css`
      cursor: n-resize;
    `;
  }
  return css`
    cursor: ns-resize;
  `;
};

export const StyledImageButtonGridContainer = styled.div`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${prop("itemWidth")}, 1fr));
    column-gap: 5px;
    row-gap: 10px;
    padding-right: 10px;
  }
`;

export const StyledScrollbar = styled.div`
  background-color: #e9e9e9;
  border-radius: 3px;
  width: 2px !important;
`;

export const StyledResizable = styled(Resizable)`
  .react-resizable-handle-s {
    background: ${palette.white};
    transform: none;

    height: 7px;
    width: 100%;
    left: 0;
    ${ifProp(
      { axis: "none" },
      css`
        display: none;
      `
    )};
    ${setCursorStyle};
    &:before {
      content: "";
      display: block;
      width: 20px;
      height: 3px;
      border-top: 1px solid ${palette.topicButtonBackground};
      border-bottom: 1px solid ${palette.topicButtonBackground};
      position: absolute;
      left: calc(50% - 5px);
    }
  }
`;
