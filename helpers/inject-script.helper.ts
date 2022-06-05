// From: https://stackoverflow.com/questions/13121948/dynamically-add-script-tag-with-src-that-may-include-document-write
export function addScript(src, id) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`#${id}`)) {
      return;
    }

    const script = document.createElement('script');

    script.setAttribute('src', src);
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);

    document.body.appendChild(script);
  });
}
