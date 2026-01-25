import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useEffect } from 'react';
import { useTooltipExtension } from '../../../../packages/react/src';

const meta: Meta = {
  title: 'Elements/Extensions/Tooltip',
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

const TooltipExample = (args: { title?: string }) => {
  useEffect(() => {
    const target = document.body.querySelector('.tooltip-example');
    if (target) {
      useTooltipExtension(target);
    }
  }, []);

  return (
    <div className="tooltip-example">
      <div style={{ maxHeight: '200px', overflow: 'scroll' }}>
        <span {...args} style={{ fontSize: '3rem' }}>
          Hover me
        </span>
        <span style={{ minHeight: '400px', display: 'block' }}></span>
      </div>
    </div>
  );
};

export const Showcase: Story = {
  name: 'Tooltip',
  args: {
    title: 'Title of my tooltip'
  },
  render: (args) => <TooltipExample {...args} />
};
