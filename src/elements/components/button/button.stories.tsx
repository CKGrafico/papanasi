import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../../../packages/react/src';
import { intents, variants } from '../../../models';

const meta: Meta<typeof Button> = {
  title: 'Elements/Components/Button',
  component: Button,
  argTypes: {
    outline: {
      name: 'outline',
      description: 'Modify button to be outlined',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      name: 'disabled',
      description: 'Disable actions in the button',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    intent: {
      name: 'intent',
      description: 'Specify a temporary intent for the button',
      table: {},
      options: intents.map((x) => x.value),
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Showcase: Story = {
  name: 'Button',
  args: {
    outline: false,
    disabled: false
  },
  render: (args) => (
    <div>
      {variants.map((variant) => (
        <Button key={variant.key} {...args} variant={variant.value}>
          {variant.key}
        </Button>
      ))}
    </div>
  )
};
