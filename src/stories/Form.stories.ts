import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Form",
  component: Form,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { 
    name            : "",
    initialValues   : {},
    useQueryString  : false
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    name: "simple-form",
    useQueryString: false
  },
};

export const PreDefined: Story = {
  args: {
    name: "predefined-form",
    useQueryString: false,
    initialValues: {
      image: "https://i.ibb.co/9tkg3Ws/3-D-Blackjack.jpg",
      username: "tomhanks",
      email: "tom@google.com",
      password: "TomHanks123",
      password2: "TomHanks123"
    }
  },
};