import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Column, Container, Row } from '../../../../packages/react/src';
import { getBreakpointArgTypes } from '../../../helpers';

const meta: Meta<typeof Column> = {
  title: 'Elements/Layout/Grid',
  component: Column,
  argTypes: {
    fluid: {
      name: 'Container: fluid',
      description: 'Let the container grow to max',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    direction: {
      name: 'Rows: Direction',
      description: 'Direction of the columns inside the rows',
      table: {},
      options: ['', 'row', 'column', 'row-reverse', 'column-reverse'],
      control: { type: 'select' }
    },
    ...getBreakpointArgTypes('Columns: Size in {breakpoint}', [
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
  name: 'Grid',
  args: {
    fluid: true
  },
  render: (args) => {
    const { fluid, direction, ...column } = args;
    return (
      <Container fluid={fluid}>
        <Row basic={direction}>
          <Column {...column}>Row 1 of 3 - Column 1 of 3</Column>
          <Column {...column}>Row 1 of 3 - Column 2 of 3</Column>
          <Column {...column}>Row 1 of 3 - Column 3 of 3</Column>
        </Row>
        <Row basic={direction}>
          <Column {...column}>Row 2 of 3 - Column 1 of 3</Column>
          <Column {...column}>Row 2 of 3 - Column 2 of 3</Column>
          <Column {...column}>Row 2 of 3 - Column 3 of 3</Column>
        </Row>
        <Row basic={direction}>
          <Column {...column}>Row 3 of 3 - Column 1 of 3</Column>
          <Column {...column}>Row 3 of 3 - Column 2 of 3</Column>
          <Column {...column}>Row 3 of 3 - Column 3 of 3</Column>
        </Row>
      </Container>
    );
  }
};
