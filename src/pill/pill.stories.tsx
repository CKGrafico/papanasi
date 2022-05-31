import React from 'react';
import { variants } from '../../models';
import { Pill } from '../../packages/react/src';

const title = 'Components/Pill';
const component = Pill;
const description = `Todo`;

const Template = (args) => (
  <>
    {variants.map((variant) => (
      <Pill key={variant.key} {...args} variant={variant.value}>
        {variant.key}
      </Pill>
    ))}
  </>
);

export const Default = Template.bind({});

export default {
  title,
  component,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  }
};
