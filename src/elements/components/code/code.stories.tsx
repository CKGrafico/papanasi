import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Code } from '../../../../packages/react/src';

const meta: Meta<typeof Code> = {
  title: 'Elements/Components/Code',
  component: Code,
  argTypes: {
    editable: {
      name: 'editable',
      description: 'Let the user edit the code',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    disableCopy: {
      name: 'disableCopy',
      description: 'Disable the copy button',
      table: {},
      control: {
        type: 'boolean'
      }
    },
    language: {
      name: 'language',
      description:
        'Language to highlight, complete list https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md',
      table: {},
      options: ['javascript', 'typescript', 'css', 'scss', 'json', 'xml', 'markdown'],
      control: { type: 'select' }
    },
    theme: {
      name: 'theme',
      description:
        'Theme to use in the editor, are from https://github.com/highlightjs/highlight.js/tree/main/src/styles but not all are included',
      table: {},
      options: ['default', 'dark', 'atom-one-light', 'atom-one-dark', 'github', 'monokai'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Code>;

const sampleCode =
  "import React from 'react'; \n\n" +
  'type CardProps = { \n' +
  '  title: string, \n' +
  '  paragraph: string \n' +
  '} \n\n' +
  'export const Card = (props: CardProps) => { \n' +
  '  const { title, paragraph } = props; \n\n' +
  '  return ( \n' +
  '    <aside> \n' +
  '      <h2>{title}</h2> \n' +
  '      <p>{paragraph}</p> \n' +
  '    </aside> \n' +
  '  ); \n' +
  '}; \n\n' +
  "const el = <Card title='Hello and welcome!' paragraph='To this papanasi' />\n";

export const Showcase: Story = {
  name: 'Code',
  args: {
    editable: true,
    language: 'javascript',
    theme: 'github',
    disableCopy: false,
    code: sampleCode
  },
  render: (args) => (
    <div>
      <Code {...args} slotCopy={<span>Copy</span>}></Code>
    </div>
  )
};
