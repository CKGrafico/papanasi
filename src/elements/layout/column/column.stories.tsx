import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Column, Container, Row } from '../../../../packages/react/src';
import { getBreakpointArgTypes } from '../../../helpers';

const meta: Meta<typeof Column> = {
  title: 'Elements/Layout/Column',
  component: Column,
  argTypes: {
    centered: {
      name: 'centered',
      description: 'Let the content to be centered',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    ...getBreakpointArgTypes('Column size in {breakpoint}', [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      'content',
      'fill',
      'hide'
    ])
  }
};

export default meta;

type Story = StoryObj<typeof Column>;

export const Showcase: Story = {
  name: 'Column',
  args: {
    centered: false
  },
  render: (args) => (
    <Container>
      <Row>
        <Column {...args} className="is-highlighted">
          Column
        </Column>
        <Column>Column Auto</Column>
        <Column>Column Auto</Column>
      </Row>
    </Container>
  )
};
