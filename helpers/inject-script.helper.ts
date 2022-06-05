// From: https://stackoverflow.com/questions/13121948/dynamically-add-script-tag-with-src-that-may-include-document-write

export function addScript(src, id) {
  const identifier = `inject-${id}`;

  return new Promise((resolve, reject) => {
    if (document.querySelector(`#${identifier}`)) {
      resolve('');
      return;
    }

    const script = document.createElement('script');

    script.setAttribute('src', src);
    script.setAttribute('id', identifier);
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);

    document.body.appendChild(script);
  });
}
