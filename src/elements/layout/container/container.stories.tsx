import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Container } from '../../../../packages/react/src';

const meta: Meta<typeof Container> = {
  title: 'Elements/Layout/Container',
  component: Container,
  argTypes: {
    centered: {
      name: 'centered',
      description: 'Let the content to be centered',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    fluid: {
      name: 'fluid',
      description: 'Let the container grow to max',
      table: {},
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Showcase: Story = {
  name: 'Container',
  args: {
    fluid: false,
    centered: false
  },
  render: (args) => <Container {...args}>Container</Container>
};
