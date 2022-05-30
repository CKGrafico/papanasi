import { breakpoints } from '../models';

export function getBreakpointArgTypes(description, options) {
  const argTypes = {};

  breakpoints.map((breakpoint) => {
    argTypes[breakpoint.value] = {
      name: breakpoint.value,
      description: description.replace('{breakpoint}', breakpoint.key),
      table: {
        defaultValue: { summary: '' }
      },
      options,
      control: { type: 'select' }
    };
  });

  return argTypes;
}

export function getDebugArgTypes() {
  return {
    debug: {
      name: 'debug',
      description: 'Show debugging styles',
      table: {
        defaultValue: { summary: 'false' }
      },
      control: {
        type: 'boolean'
      }
    }
  };
}
