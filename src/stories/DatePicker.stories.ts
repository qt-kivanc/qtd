import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "../datepicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DatePicker> = {
  title: "Design System/DatePicker",
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'DatePicker is our most important UI element used by almost all components.'
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {

  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    
  },
};