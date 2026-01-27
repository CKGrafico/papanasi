import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta = {
  title: 'Documentation/Introduction',
  parameters: {
    previewTabs: { canvas: { hidden: true } }
  }
};

export default meta;

type Story = StoryObj;

export const Intro: Story = {
  name: 'Intro',
  render: () => null
};
