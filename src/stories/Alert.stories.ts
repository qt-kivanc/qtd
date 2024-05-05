import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Alert } from "./Alert";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Alert",
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Info: Story = {
  args: {
    type: "info",
    title: "Info",
    children: "Your session has expired. Please log in again.",
  },
};

export const InfoWithoutTitle: Story = {
  args: {
    type: "info",
    children: "Fill in the missing information to complete your profile now.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning",
    children:
      "Your password has been seen in a data breach, please update it immediately.",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    title: "Success",
    children:
      "Your profile information has been successfully updated. You are now completely up to date.🤩",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    title: "Error",
    children:
      "The image you uploaded didn't comply with our policy and was automatically deleted.",
  },
};
