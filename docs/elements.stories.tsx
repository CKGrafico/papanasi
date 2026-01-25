import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useEffect } from 'react';
import { Avatar, Button, Column, Container, Itchio, Row, useTooltipExtension } from '../packages/react/src';

const meta: Meta = {
  title: 'Documentation/Elements',
  parameters: {
    previewTabs: { canvas: { hidden: true } }
  }
};

export default meta;

type Story = StoryObj;

const TooltipExample = () => {
  useEffect(() => {
    const target = document.body.querySelector('.tooltip-example');
    if (target) {
      useTooltipExtension(target);
    }
  }, []);

  return (
    <div className="tooltip-example">
      <span title="Example tooltip" style={{ fontSize: '3rem' }}>
        Hover me
      </span>
    </div>
  );
};

export const LayoutExample: Story = {
  name: 'Layout',
  render: () => (
    <Container>
      <Row>
        <Column>Row 1 - Column 1 of 3</Column>
        <Column>Row 1 - Column 2 of 3</Column>
        <Column>Row 1 - Column 3 of 3</Column>
      </Row>
      <Row>
        <Column>Row 2 - Column 1 of 3</Column>
        <Column>Row 2 - Column 2 of 3</Column>
        <Column>Row 2 - Column 3 of 3</Column>
      </Row>
      <Row>
        <Column>Row 3 - Column 1 of 3</Column>
        <Column>Row 3 - Column 2 of 3</Column>
        <Column>Row 3 - Column 3 of 3</Column>
      </Row>
    </Container>
  )
};

export const ComponentsExample: Story = {
  name: 'Components',
  render: () => (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="tertiary" outline>
        Tertiary
      </Button>
      <Avatar name="Alis Mug" />
    </>
  )
};

export const EnterpriseExample: Story = {
  name: 'Enterprise',
  render: () => (
    <Itchio user="ckgrafico" game="alice-ring" width={800} height={600}>
      <span>Click me</span>
    </Itchio>
  )
};

export const ExtensionsExample: Story = {
  name: 'Extensions',
  render: () => <TooltipExample />
};
