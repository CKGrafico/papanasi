export function initialize() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'shortcut icon');
  link.setAttribute('href', '/favicon.ico');
  document.head.appendChild(link);
}
