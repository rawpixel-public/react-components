import styled from "styled-components";

import Button from "../../atoms/Button";
import ExpandButton from "./ExpandButton";

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
      flex-grow: 2;
      min-width: 24px;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      align-items: center;
    }
  }

  ${Button} {
    font-size: 11px;
  }

  ${ExpandButton} {
    float: right;
  }
`;

export default Wrapper;
