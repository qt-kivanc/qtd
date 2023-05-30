import type { Meta, StoryObj } from "@storybook/react";
import Button from "../button";

import Flow from './assets/flow.svg';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button is our most important UI element used by almost all components.'
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      name: "label",
      description: "It supports all children properties, especially `string`. Suggested usage is `string`.",
      table: {
        defaultValue: {
          summary: "Button Text",
        },
      },
      control: 'text',
      defaultValue: "Button Text"
    },
    type: {
      description: "Button comes in five types. In most cases, you’ll be fine with `default`.",
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
      description: "Button comes in five sizes. In most cases, you’ll be fine with `default`.",
      table: {
        defaultValue: {
          summary: "default",
        },
      },
      options: ["default", "x-small", "small", "medium", "large"],
      control: { type: "select" },
      defaultValue: "default"
    },
    svg: {
      table: {
        defaultValue: {
          summary: "",
        },
      },
      options: [0, 1],
      mapping: ["", Flow],
      control: {
        type: 'select',
        labels: ["default", "SVG Icon"],
      }
    },
    contentPosition: {
      table: {
        defaultValue: {
          summary: "left",
        },
      },
      options: ["left", "right"],
      control: { type: "inline-radio" },
    },
    justify: {
      options: [
        "center", "end", "flex-end", "flex-start", "inherit", "initial", 
        "left", "normal", "revert", "right", "space-around", "space-between", 
        "space-evenly", "start", "stretch", "unset"
      ],
      control: { type: "select" },
      defaultValue: "center"
    },
    circle: {
      control: "boolean",
      defaultValue: false
    },
    stretch: {
      control: "boolean",
      defaultValue: false
    },
    useIconPadding: {
      control: "boolean",
      defaultValue: true
    },
    loading: {
      control: "boolean",
      defaultValue: false
    },
    disabled: {
      control: "boolean",
      defaultValue: false
    },
    isSubmit: {
      control: "boolean",
      defaultValue: false
    },
    selected: {
      control: 'boolean',
      defaultValue: false
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    type: "default",
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    children: "Button"
  },
};

export const Generic: Story = {
  args: {
    type: "generic",
    children: "Button"
  },
};

export const Link: Story = {
  args: {
    type: "link",
    children: "Button"
  },
};

export const Request: Story = {
  args: {
    type: "request",
    children: "Button"
  },
};

export const Approve: Story = {
  args: {
    type: "approve",
    children: "Button"
  },
};

export const Reject: Story = {
  args: {
    type: "reject",
    children: "Button"
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
  },
};
