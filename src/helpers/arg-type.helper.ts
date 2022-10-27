import { breakpoints } from '../models';

export function getBreakpointArgTypes(description, options) {
  const argTypes = {};

  breakpoints.map((breakpoint) => {
    argTypes[breakpoint.value] = {
      name: breakpoint.value,
      description: description.replace('{breakpoint}', breakpoint.key),
      table: {},
      options,
      control: { type: 'select' }
    };
  });

  return argTypes;
}
