import React, { StrictMode } from "react";
import type { Preview } from "@storybook/react";

import { BrowserRouter } from 'react-router-dom';
import { QTDProvider } from '../lib/context/QTDContext';
import StoryRoot from '../lib/stories/root/index';

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
        <QTDProvider theme="light">
          <StoryRoot>
            <Story />
          </StoryRoot>
        </QTDProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;