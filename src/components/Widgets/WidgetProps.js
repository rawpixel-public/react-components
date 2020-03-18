import PropTypes from "prop-types";

export default {
  as: PropTypes.any,
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon_url: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.oneOf(["topic_group", "add_on"]).isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool
};
