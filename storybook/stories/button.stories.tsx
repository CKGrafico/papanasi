// Button.stories.js|jsx

import React from 'react';
import { Button } from '../../packages/react/src';

export default {
  title: 'Button',
  component: Button
};

export const Primary = () => <Button variant="red">Button</Button>;
