import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Avatar } from '../../../../packages/react/src';
import { variants } from '../../../models';

const meta: Meta<typeof Avatar> = {
  title: 'Elements/Components/Avatar',
  component: Avatar,
  argTypes: {
    name: {
      name: 'name',
      description: 'The name to show the initials',
      table: {},
      control: 'text'
    },
    unavatar: {
      name: 'unavatar',
      description: 'If you want to use an image from https://unavatar.io/',
      control: 'text'
    },
    url: {
      name: 'url',
      description: 'If you want to use an image as source',
      control: 'text'
    },
    disabled: {
      name: 'disabled',
      description: 'Disable actions in the avatar',
      table: {},
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Showcase: Story = {
  name: 'Avatar',
  args: {
    disabled: false,
    unavatar: '',
    name: 'Alicia Mug',
    url: ''
  },
  render: (args) => (
    <div>
      <>
        {variants.map((variant) => (
          <Avatar key={variant.key} {...args} variant={variant.value} />
        ))}
      </>
    </div>
  )
};
