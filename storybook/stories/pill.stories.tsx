import React from 'react';
import { Pill } from '../../packages/react/src';
import { alertVariants, variants } from '../helpers';

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
