import PropTypes from "prop-types";

export default {
  title: PropTypes.string.isRequired,
  filter_icon: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.oneOf(["topic_group", "add_on"]).isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool
};
