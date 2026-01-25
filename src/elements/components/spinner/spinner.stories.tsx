import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Spinner } from '../../../../packages/react/src';
import { Variant, variants } from '../../../models';

const meta: Meta<typeof Spinner> = {
  title: 'Elements/Components/Spinner',
  component: Spinner,
  argTypes: {
    full: {
      name: 'full',
      description: 'Show a full spinner',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    fullscreen: {
      name: 'fullscreen',
      description: 'Show a full screen spinner',
      table: {},
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Showcase: Story = {
  name: 'Spinner',
  args: {
    full: false,
    fullscreen: false
  },
  render: (args) => (
    <div>
      <>
        {variants.map((variant) => {
          if (variant.value === Variant.Basic) {
            return <Spinner key={variant.key} {...args} variant={variant.value} />;
          }

          return <Spinner key={variant.key} variant={variant.value} />;
        })}
      </>
    </div>
  )
};
