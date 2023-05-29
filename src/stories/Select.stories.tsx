import type { Meta, StoryObj } from "@storybook/react";
import Select from "../select";

const { Option } = Select;

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
      defaultValue: ""
    },
    label: {
      control: "text",
      defaultValue: "Please Select"
    },
    floating: {
      control: { type: "boolean" },
      defaultValue: true
    },
    position: {
      options: ["top", "bottom"],
      control: { type: "select" },
      defaultValue: "bottom"
    },
    direction: {
      options: ["left", "right"],
      control: { type: "select" },
      defaultValue: "left"
    },
    mode: {
      options: ["single", "multi"],
      control: { type: "select" },
      defaultValue: "single"
    },
    type: {
      description: "Select comes in five types. In most cases, you’ll be fine with `default`.",
      table: {
        defaultValue: {
          summary: "default",
        },
      },
      options: ["default", "primary"],
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

const options = [
  { value: "istanbul", name: "Istanbul" },
  { value: "london", name: "London" },
  { value: "paris", name: "Paris" }
];

const getChildren = () => {
  return options.map(m => (
    <Option key={m.value} value={m.value}>
      {m.name}
    </Option>
  ));
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    type: "default",
    placeholder: "Please Select",
    floating: true,
    children: getChildren()
  },
};

export const Childs: Story = {
  args: {
    type: "default",
    placeholder: "Please Select",
    children: getChildren()
  }
};

export const Primary: Story = {
  args: {
    type: "primary",
    placeholder: "Please Select",
    children: getChildren()
  },
};

export const Multi: Story = {
  args: {
    type: "primary",
    placeholder: "Please Select",
    mode: "multi",
    children: getChildren()
  },
};