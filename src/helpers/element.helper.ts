export function querySelectorAllObservable(
  element: HTMLElement,
  selector: string,
  callback: (element: HTMLElement) => void
) {
  if (!element.querySelectorAll) {
    return;
  }

  const elements = Array.from(element.querySelectorAll(selector));

  if (callback) {
    elements.forEach(callback);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((element: HTMLElement) => {
        if (element.nodeType === Node.ELEMENT_NODE && element.matches(selector)) {
          elements.push(element);
          callback && callback(element);
        }
      });
    });
  });

  observer.observe(element, { childList: true, subtree: true });

  return elements;
}
