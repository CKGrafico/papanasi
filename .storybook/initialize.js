import favicon from '../docs/resources/favicon.ico';

export function initialize() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'shortcut icon');
  link.setAttribute('href', favicon);
  document.head.appendChild(link);
}
