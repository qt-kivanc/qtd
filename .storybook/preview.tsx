import React, { StrictMode } from "react";
import type { Preview } from "@storybook/react";

import { BrowserRouter } from 'react-router-dom';
import { QTDProvider } from '../src/context/QTDContext';
import StoryRoot from '../src/stories/root/index';

const preview: Preview = {
  parameters: {
    actions: {

     },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QTDProvider theme="dark">
          <StoryRoot>
            <Story />
          </StoryRoot>
        </QTDProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;