import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { Toast, useToastExtension } from '../../../../packages/react/src';

const meta: Meta = {
  title: 'Elements/Extensions/Toast',
  argTypes: {
    title: {
      name: 'title',
      description: 'A sample of attribute title',
      table: {},
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj;

const ToastExample = () => {
  const toast = useToastExtension();

  if (typeof window !== 'undefined') {
    (window as Window & { toast?: typeof toast }).toast = toast;
  }

  return (
    <div className="toast-example">
      <div>
        <Toast />
        <span
          onClick={() => {
            toast.success({ message: 'example' + Math.random() });
          }}
        >
          Click me
        </span>
      </div>
    </div>
  );
};

export const Showcase: Story = {
  name: 'Toast',
  args: {
    title: 'Title of my tooltip'
  },
  render: () => <ToastExample />
};
