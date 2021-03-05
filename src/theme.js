import { palette, fontFamily } from "./utils/cssVars";

export default {
  palette: {
    topic: {
      background: "none",
      color: palette.grayDarkest,
      titleIcon: palette.grayMedium
    },
    widgets: {
      activeBackground: "rgba(0, 0, 0, 0.1)",
      hoverBackground: "rgba(0, 0, 0, 0.1)"
    },
    widget: {
      background: "none",
      color: palette.grayDarkest
    },
    widgetIcon: {
      background: palette.fuscous,
      activeBackground: palette.blueGradient,
      hoverBackground: palette.blueGradient
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
