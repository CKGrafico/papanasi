import { initBreakpointChecker, setPlatform, Platform } from './helpers';
import './styles/variables.css';
export { setDebugLevel, DebugLevel, addCodeLanguage } from './helpers';

// Init Components
export { default as Avatar } from './elements/components/avatar';
export { default as Button } from './elements/components/button';
export { default as Code } from './elements/components/code';
export { default as Pill } from './elements/components/pill';
export { default as Spinner } from './elements/components/spinner';
export { default as Itchio } from './elements/enterprise/itchio';
export { default as useTooltipExtension } from './elements/extensions/tooltip';
export { default as Column } from './elements/layout/column';
export { default as Container } from './elements/layout/container';
export { default as Row } from './elements/layout/row';
// End Components

setPlatform(Platform.Default);
initBreakpointChecker();
