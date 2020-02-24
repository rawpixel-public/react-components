import React, { Children } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

import {
  StyledImageButtonGridContainer,
  StyledScrollbar
} from "./StyledImageButtonGrid";

// 3 rows of image buttons height.
const defaultHeight = 240;
const defaultWidth = 225;

const ImageButtonGrid = ({ children, viewable = 9 }) => {
  const [height, setHeight] = React.useState(defaultHeight);
  const ContainerRef = React.useRef();

  React.useEffect(() => {
    const element = ContainerRef.current;
    const offsetHeight = element.offsetHeight;

    // Set container to exact height to hide scrollbar tracks.
    if (Children.count(children).length <= viewable) {
      setHeight(offsetHeight);
    }
  }, [children, viewable]);

  return (
    <Scrollbars
      style={{ height, width: defaultWidth }}
      hideTracksWhenNotNeeded
      renderThumbVertical={props => <StyledScrollbar {...props} />}
    >
      <StyledImageButtonGridContainer ref={ContainerRef}>
        {children}
      </StyledImageButtonGridContainer>
    </Scrollbars>
  );
};

ImageButtonGrid.propTypes = {
  children: PropTypes.node,
  viewable: PropTypes.number
};

export default ImageButtonGrid;
