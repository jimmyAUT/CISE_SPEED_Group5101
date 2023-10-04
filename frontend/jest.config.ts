// import type { Config } from "@jest/types";
// // import "@testing-library/jest-dom";
// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
// };
// export default config;

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
};

export default config;
