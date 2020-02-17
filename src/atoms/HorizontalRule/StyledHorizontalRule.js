import styled from "styled-components";
import { palette } from "../../utils/cssVars";

export const StyledHorizontalRule = styled.hr`
  background: ${palette.grayLighter};
  border: 1px solid #e9e9e9;
  box-sizing: content-box;
  height: 2px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: visible;
  width: 100%;
`;
