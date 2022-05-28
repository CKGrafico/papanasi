import React from 'react';
import { alertVariants, variants } from '../../helpers';
import { Pill } from '../../packages/react/src';

const title = 'Pill';
const component = Pill;
const description = `Todo`;

const Template = (args) => (
  <>
    <ul>
      {variants.map((variant) => (
        <li key={variant.key}>
          <Pill {...args} variant={variant.key}>
            {variant.name}
          </Pill>
        </li>
      ))}
    </ul>

    <ul>
      {alertVariants.map((variant) => (
        <li key={variant.key}>
          <Pill {...args} variant={variant.key}>
            {variant.name}
          </Pill>
        </li>
      ))}
    </ul>
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
