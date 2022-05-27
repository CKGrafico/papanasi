// Button.stories.js|jsx

import React from 'react';
import { Button } from '../../packages/react/src';

export default {
  title: 'Button',
  component: Button
};

export const Regular = () => (
  <>
    <ul>
      <li>
        <Button>Default</Button>
      </li>
      <li>
        <Button variant="primary">Primary</Button>
      </li>
      <li>
        <Button variant="secondary">Secondary</Button>
      </li>
      <li>
        <Button variant="tertiary">Tertiary</Button>
      </li>
    </ul>

    <ul>
      <li>
        <Button variant="info">Info</Button>
      </li>
      <li>
        <Button variant="success">Success</Button>
      </li>
      <li>
        <Button variant="warning">Warning</Button>
      </li>
      <li>
        <Button variant="error">Error</Button>
      </li>
    </ul>
  </>
);

export const Outline = () => (
  <>
    <ul>
      <li>
        <Button outline>Default</Button>
      </li>
      <li>
        <Button outline variant="primary">
          Primary
        </Button>
      </li>
      <li>
        <Button outline variant="secondary">
          Secondary
        </Button>
      </li>
      <li>
        <Button outline variant="tertiary">
          Tertiary
        </Button>
      </li>
    </ul>

    <ul>
      <li>
        <Button outline variant="info">
          Info
        </Button>
      </li>
      <li>
        <Button outline variant="success">
          Success
        </Button>
      </li>
      <li>
        <Button outline variant="warning">
          Warning
        </Button>
      </li>
      <li>
        <Button outline variant="error">
          Error
        </Button>
      </li>
    </ul>
  </>
);
