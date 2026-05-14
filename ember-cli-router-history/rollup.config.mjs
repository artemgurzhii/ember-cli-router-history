import { Addon } from "@embroider/addon-dev/rollup";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

const addon = new Addon({
  srcDir: "src",
  destDir: "dist",
});

const extensions = [".js", ".ts", ".gts", ".gjs", ".hbs", ".json"];

export default {
  output: addon.output(),
  plugins: [
    addon.publicEntrypoints(["**/*.js"]),
    // Services are the only thing we can't rely on auto-import handling for us.
    addon.appReexports(["services/**/*.js"]),
    addon.dependencies(),
    nodeResolve({ extensions }),
    babel({ extensions, babelHelpers: "inline" }),
    addon.declarations(
      "declarations",
      "tsc --emitDeclarationOnly --declaration --declarationDir declarations",
    ),
    addon.clean(),
    copy({
      targets: [{ src: "../LICENSE", dest: "." }],
    }),
  ],
};
