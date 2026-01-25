import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, Itchio } from '../../../../packages/react/src';

const meta: Meta<typeof Itchio> = {
  title: 'Elements/Enterprise/Itchio',
  component: Itchio
};

export default meta;

type Story = StoryObj<typeof Itchio>;

export const Showcase: Story = {
  name: 'Itchio',
  args: {
    user: 'ckgrafico',
    game: 'alice-ring',
    width: 800,
    height: 600,
    secret: '',
    slotLoading: 'Loading...'
  },
  render: (args) => (
    <Itchio {...args}>
      <Button variant="tertiary">Buy it</Button>
    </Itchio>
  )
};
