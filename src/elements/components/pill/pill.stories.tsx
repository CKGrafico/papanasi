import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Pill } from '../../../../packages/react/src';
import { intents, variants } from '../../../models';

const meta: Meta<typeof Pill> = {
  title: 'Elements/Components/Pill',
  component: Pill,
  argTypes: {
    intent: {
      name: 'intent',
      description: 'Specify a temporary intent for the pill',
      table: {},
      options: intents.map((x) => x.value),
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Showcase: Story = {
  name: 'Pill',
  args: {
    intent: ''
  },
  render: (args) => (
    <div>
      {variants.map((variant) => (
        <Pill key={variant.key} {...args} variant={variant.value}>
          {variant.key}
        </Pill>
      ))}
    </div>
  )
};
