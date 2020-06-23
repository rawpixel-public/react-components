import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import postcss from "rollup-plugin-postcss";

export default {
  input: ["src/index.js", "src/button.js"],
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
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    resolve(),
    commonjs(),
    postcss({
      plugins: []
    })
  ]
};
