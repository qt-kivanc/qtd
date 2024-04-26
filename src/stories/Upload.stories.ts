import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Upload } from './Upload';
import { FileTypes } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Upload',
  component: Upload,
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
  args: { onClick: fn() },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PreDefined: Story = {
  args: {
    action                  : "https://api.imgbb.com/1/upload?key=fa70bcfc032ed5fd20eafb19d21742b2",
    filePath                : "https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=XBX_A-BuyBoxBGImage01-D.png",
    resultFileName          : "product-2",
    maxFileSize             : 1024,
    showDeleteIcon          : true,
    showPreviewIcon         : true,
    removeAction            : "",
    removeExtraFormData     : {},
    binaryName              : "image",
    fileTypes               : [FileTypes.PNG, FileTypes.JPG]
  },
};

export const Disabled: Story = {
  args: {
    action                  : "https://api.imgbb.com/1/upload?key=fa70bcfc032ed5fd20eafb19d21742b2",
    filePath                : "https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=XBX_A-BuyBoxBGImage01-D.png",
    resultFileName          : "product-1",
    maxFileSize             : 1024,
    showDeleteIcon          : true,
    showPreviewIcon         : true,
    disabled                : true,
    removeAction            : "",
    removeExtraFormData     : {},
    binaryName              : "image",
    fileTypes               : [FileTypes.PNG, FileTypes.JPG]
  },
};

export const NoDefinedFile: Story = {
  args: {
    action                  : "https://api.imgbb.com/1/upload?key=fa70bcfc032ed5fd20eafb19d21742b2",
    maxFileSize             : 1024,
    showDeleteIcon          : true,
    showPreviewIcon         : true,
    removeAction            : "",
    removeExtraFormData     : {},
    binaryName              : "image",
    fileTypes               : [FileTypes.PNG, FileTypes.JPG]
  },
};

export const Error: Story = {
  args: {
    action                  : "https://api.imgbb.com/1/upload?key=fa70bcfc032ed5fd20eafb19d21742b2",
    filePath                : "https://assets.xboxservices.com/assets/94/d6/94d66c09-f466-4ed3-9b1e-c098f2737f5b.jpg?n=Xbox-Series-X_Content-Placement-0_Next-Gen-Framerates_788x444_01.jpg",
    maxFileSize             : 1024,
    fileHeight              : "100%",
    previewFileHeight       : 300,
    showDeleteIcon          : true,
    showPreviewIcon         : true,
    removeAction            : "",
    removeExtraFormData     : {},
    binaryName              : "image",
    fileTypes               : [FileTypes.PNG, FileTypes.JPG]
  },
};
