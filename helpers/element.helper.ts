export function querySelectorAllObservable(
  element: HTMLElement,
  selector: string,
  callback = (element: HTMLElement) => null
) {
  const elements = Array.from(element.querySelectorAll(selector));
  elements.forEach(callback);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((element: HTMLElement) => {
        if (element.nodeType === Node.ELEMENT_NODE && element.matches(selector)) {
          elements.push(element);
          callback(element);
        }
      });
    });
  });

  observer.observe(element, { childList: true, subtree: true });

  return elements;
}
