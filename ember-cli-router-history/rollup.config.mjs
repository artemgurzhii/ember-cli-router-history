import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  output: addon.output(),

  plugins: [
    addon.publicEntrypoints([
      'index.ts',
      'services/router-history.ts',
      'objects/history-item.ts',
      'utils/helpers.ts',
    ]),

    addon.appReexports(['services/router-history.js']),

    addon.dependencies(),

    nodeResolve({ extensions: ['.js', '.ts'] }),

    babel({
      extensions: ['.js', '.ts'],
      babelHelpers: 'runtime',
    }),

    addon.clean(),
  ],
};
