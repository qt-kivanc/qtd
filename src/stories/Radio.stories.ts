import type { Meta, StoryObj } from "@storybook/react";
import Radio from "../radio";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Radio> = {
  title: "Design System/Radio",
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'Radio is our most important UI element used by almost all components.'
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {

  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio.Group>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    
  },
};