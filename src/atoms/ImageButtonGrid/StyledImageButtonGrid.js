import styled from "styled-components";
import { prop } from "styled-tools";

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
