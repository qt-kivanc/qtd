import type { Meta, StoryObj } from '@storybook/react';
//import { fn } from '@storybook/test';
import { ModalManager } from './ModalManager';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ModalManager',
  component: ModalManager,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    //onOkClick     : fn(),
    //onCancelClick : fn()
  },
} satisfies Meta<typeof ModalManager>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FullFeatured: Story = {
  args: {
    title: "Modal Header Title",
    customProps : {
      content: "I came from the props...",
    },
    closeOnClickOutside   : true,
    preventESC            : false,
    showOkButton          : true,
    showCancelButton      : true
  },
};

export const Title: Story = {
  args: {
    title: "Modal Header Title",
    customProps : {
      content: "I came from the props...",
    },
    closeOnClickOutside : true,
    preventESC            : false
  },
};

export const CustomButtonTexts: Story = {
  args: {
    customProps : {
      content: "I came from the props...",
    },
    okButtonText : "Tamam",
    cancelButtonText : "İptal"
  },
};

export const CustomButtonHandlers: Story = {
  args: {
    customProps : {
      content: "I came from the props...",
    },
    onOk        : () => {console.log("onOk")},
    onCancel    : () => {console.log("onCancel")}
  },
};

export const OnlyCloseWithEvent: Story = {
  args: {
    customProps : {
      content: "I came from the props...",
    },
    closeOnClickOutside   : false,
    preventESC            : true,
    showCloseButton       : false,
    showOkButton          : false,
    showCancelButton      : false,
  },
};
