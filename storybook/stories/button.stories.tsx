import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';
import React from 'react';
import { Button } from '../../packages/react/src';
import { alertVariants, variants } from '../helpers';

const title = 'Button';
const component = Button;
const description = `Buttons allow to take actions in the app, and are used for navigation, forms, or any other task.
There are 3 different variants **"primary"**, **"secondary"** and **"tertiary"**, but also other 4 alert variants **"info"**, **"success"**, **"warning"** and **"error"**.

You can customize variants changing the variables, more info in the [variables page](/docs/start--page)

## Howe to use this component
### Angular
\`\`\`js
import { Button } from '@papanasi/angular';
import "@papanasi/angular/dist/papanasi.css";

/* TODO */
\`\`\`

### React
\`\`\`js
import { Button } from '@papanasi/react';
import "@papanasi/react/dist/papanasi.css";

export default function App() {
  return (
    <Button variant="primary" outline>Primary</Button>
  );
}
\`\`\`

### Vue
\`\`\`js
<script>
import { Button } from "@papanasi/vue";
import "@papanasi/vue/dist/papanasi.css";

export default {
  name: "App",
  components: {
    Button,
  },
};
</script>

<template>
  <Button variant="primary" :outline="true">Primary</Button>
</template>
\`\`\`

### Web Components
\`\`\`js
import { Button } from "@papanasi/webcomponents";
import "@papanasi/webcomponents/dist/papanasi.css";

customElements.get("pa-button") || customElements.define("pa-button", Button);

\`\`\`

## Stories
`;

const Template = (args) => (
  <>
    <ul>
      {variants.map((variant) => (
        <li key={variant.key}>
          <Button {...args} variant={variant.key}>
            {variant.name}
          </Button>
        </li>
      ))}
    </ul>

    <ul>
      {alertVariants.map((variant) => (
        <li key={variant.key}>
          <Button {...args} variant={variant.key}>
            {variant.name}
          </Button>
        </li>
      ))}
    </ul>
  </>
);

export const Default = Template.bind({});
Default.args = {
  outline: false
};
Default.argTypes = {
  outline: {
    description: 'Modify button to be outline',
    table: {
      defaultValue: { summary: 'false' }
    },
    control: {
      type: 'boolean'
    }
  }
};

export default {
  title,
  component,
  parameters: {
    docs: {
      page: () => (
        <>
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
          <Title />
        </>
      )
    }
  }
};
