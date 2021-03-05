import { palette, fontFamily } from "./utils/cssVars";

export default {
  palette: {
    topic: {
      background: "none",
      color: palette.grayDarkest,
      titleIcon: palette.grayMedium
    },
    widget: {
      activeBackground: "rgba(0, 0, 0, 0.1)",
      hoverBackground: "rgba(0, 0, 0, 0.1)",
      background: "none",
      color: palette.grayDarkest
    },
    widgetIcon: {
      background: palette.topicActive,
      activeBackground: `linear-gradient(to left, ${palette.pink}, ${palette.blue})`,
      hoverBackground: `linear-gradient(to left, ${palette.pink}, ${palette.blue})`
    }
  },
  font: {
    button: {
      base: fontFamily.base,
      active: fontFamily.medium
    },
    topic: {
      base: fontFamily.base,
      active: fontFamily.medium
    },
    widget: {
      base: fontFamily.base,
      active: fontFamily.medium
    }
  },
  fontSize: {
    topic: "11px",
    widget: "12px"
  }
};
