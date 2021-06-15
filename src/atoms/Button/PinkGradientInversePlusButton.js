import PropTypes from "prop-types";

const StyledButton = () => null;

StyledButton.propTypes = {
  $active: PropTypes.bool,
  $size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"]),
  $iconThickness: PropTypes.oneOf(["light", "normal"])
};

StyledButton.defaultProps = {
  $active: false,
  $size: "medium",
  $iconThickness: "normal"
};

export default StyledButton;
