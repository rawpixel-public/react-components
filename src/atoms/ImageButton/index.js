import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import filterReactProps from "filter-react-props";

import {
  StyledImageButton,
  StyledImgWrapper,
  StyledImageButtonTitle,
  StyledIcon
} from "./StyledImageButton";

import DotLoader from "../Loader/DotLoader";

// Destruct props to remove props which should not be passed to the DOM.
const ImageButtonLink = ({ className, children, href, to, ...props }) => {
  const filteredProps = filterReactProps({ ...props });
  return to ? (
    <Link
      className={className}
      to={to}
      onlyActiveOnIndex={false}
      {...filteredProps}
    >
      {children}
    </Link>
  ) : (
    <a className={className} href={href} {...filteredProps}>
      {children}
    </a>
  );
};

ImageButtonLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string
};

const ImageButton = ({
  active = false,
  href,
  icon,
  title,
  isLoading = false,
  onClick,
  to,
  ...props
}) => (
  <StyledImageButton
    active={active ? true : undefined}
    as={to ? ImageButtonLink : href ? "a" : "button"}
    onClick={onClick}
    disabled={(isLoading && "disabled") || props.disabled}
    isLoading={isLoading ? true : undefined}
    to={to}
    href={href}
    {...props}
  >
    <StyledImgWrapper className="img-wrapper">
      {isLoading && (
        <DotLoader className="loader" loaderWidth={60} dotSize={10} />
      )}
      <StyledIcon imgSrc={icon} />
    </StyledImgWrapper>
    <StyledImageButtonTitle>{title}</StyledImageButtonTitle>
  </StyledImageButton>
);

ImageButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.any,
  to: PropTypes.string
};

export default ImageButton;
