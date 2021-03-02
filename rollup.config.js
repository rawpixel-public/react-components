import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import postcss from "rollup-plugin-postcss";
import visualizer from "rollup-plugin-visualizer";

export default {
  input: [
    "src/index.js",
    "src/atoms.js",
    "src/button.js",
    "src/hooks.js",
    "src/topics.js",
    "src/widgets.js"
  ],
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
    exports: "named"
  },
  plugins: [
    external(),
    url(),
    svgr(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs({
      namedExports: {
        exenv: ["canUseDOM"]
      }
    }),
    postcss({
      plugins: []
    }),
    visualizer()
  ]
};
