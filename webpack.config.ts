import type { Configuration } from "webpack";

module.exports = {
  entry: {
    script: {
      import: "src/script.ts",
      runtime: false
    },
    sw: {
      import: "src/sw.ts",
      runtime: false
    },
    actions: {
      import: "src/modules/actions.ts",
      runtime: false
    },
    state: {
      import: "src/modules/state.ts",
      runtime: false
    }
  },
} as Configuration;
