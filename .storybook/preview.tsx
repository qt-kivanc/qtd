import React from "react";

import type { Preview } from "@storybook/react";
import { QTDProvider } from "../src/context/QTDContext";

export const decorators = [
  (Story:any) => (
    <QTDProvider>
      <Story />
    </QTDProvider>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
