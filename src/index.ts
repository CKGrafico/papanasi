import { initBreakpointChecker, setPlatform, setVersion, Platform } from './helpers';
import './styles/variables.css';
export { setDebugLevel, DebugLevel, addCodeLanguage, getPlatform, getVersion } from './helpers';

// Init Components
export { default as Avatar } from './elements/components/avatar';
export { default as Button } from './elements/components/button';
export { default as Code } from './elements/components/code';
export { default as Pill } from './elements/components/pill';
export { default as Spinner } from './elements/components/spinner';
export { default as Itchio } from './elements/enterprise/itchio';
export { default as useTooltipExtension } from './elements/extensions/tooltip';
// TODO this breaks command --element
export { default as Toast, useToastExtension } from './elements/extensions/toast';
export { default as Column } from './elements/layout/column';
export { default as Container } from './elements/layout/container';
export { default as Row } from './elements/layout/row';
// End Components

setPlatform(Platform.Default);
setVersion('0.0.0');
initBreakpointChecker();
