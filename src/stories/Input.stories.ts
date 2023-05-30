import type { Meta, StoryObj } from "@storybook/react";
import Input from "../input/index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: "Design System/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Input is our most important UI element used by almost all components.'
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {

  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    
  },
};