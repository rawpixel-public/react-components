import PropTypes from "prop-types";
import { StyledButton as Button } from "./StyledButton";

Button.defaultProps = {
  size: "medium"
};

Button.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.any,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"]),
  theme: PropTypes.shape({
    active: PropTypes.shape({
      background: PropTypes.string,
      color: PropTypes.string
    }),
    hover: PropTypes.shape({
      background: PropTypes.string,
      color: PropTypes.string
    })
  })
};

export default Button;
