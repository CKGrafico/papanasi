import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Breadcrumb } from '../../../../packages/react/src';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Elements/Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: {
      name: 'separator',
      description: 'String used to separate items',
      table: {},
      control: { type: 'text' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Showcase: Story = {
  name: 'Breadcrumb',
  args: {
    separator: '/'
  },
  render: (args) => (
    <Breadcrumb
      {...args}
      items={[
        { label: 'Home', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Data' }
      ]}
    />
  )
};
