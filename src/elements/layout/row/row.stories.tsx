import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Column, Container, Row } from '../../../../packages/react/src';
import { getBreakpointArgTypes } from '../../../helpers';

const meta: Meta<typeof Row> = {
  title: 'Elements/Layout/Row',
  component: Row,
  argTypes: {
    ...getBreakpointArgTypes('Direction in {breakpoint}', ['', 'row', 'column', 'row-reverse', 'column-reverse'])
  }
};

export default meta;

type Story = StoryObj<typeof Row>;

export const Showcase: Story = {
  name: 'Row',
  args: {},
  render: (args) => (
    <Container>
      <Row {...args}>
        <Column>Row</Column>
      </Row>
    </Container>
  )
};
