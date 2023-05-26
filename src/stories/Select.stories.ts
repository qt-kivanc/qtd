import type { Meta, StoryObj } from "@storybook/react";
import Select from "../select";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
  title: "Design System/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Select is our most important UI element used by almost all components.'
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      defaultValue: "Please Select"
    },
    floating: {
      control: { type: "boolean" },
      defaultValue: true
    },
    type: {
      description: "Select comes in five types. In most cases, you’ll be fine with `default`.",
      table: {
        defaultValue: {
          summary: "default",
        },
      },
      options: ["default", "primary", "secondary", "generic", "link", "request", "approve", "reject"],
      control: { type: "select" },
      defaultValue: "default"
    },
    size: {
      description: "Select comes in five sizes. In most cases, you’ll be fine with `default`.",
      table: {
        defaultValue: {
          summary: "default",
        },
      },
      options: ["default", "x-small", "small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "default"
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false
    }
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    type: "default"
  },
};

export const Primary: Story = {
  args: {
    type: "primary"
  },
};