import { querySelectorAllObservable } from '../../helpers';
import './tooltip.css';

const state = {
  tooltipElement: document.createElement('div'),
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  title: ''
};

function showTooltip() {
  state.tooltipElement.style.top = `${state.y - state.height}px`;
  state.tooltipElement.style.left = `${state.x - state.width / 2}px`;
  state.tooltipElement.innerText = state.title;
}

function hideTooltip() {
  state.tooltipElement.style.top = '0';
  state.tooltipElement.style.left = '0';
  state.tooltipElement.innerText = '';
}

function manageElementTitle(element: HTMLElement) {
  const title = element.getAttribute('title');
  const ariaLabel = element.getAttribute('aria-label');

  element.setAttribute('aria-label', ariaLabel || title);
  element.removeAttribute('title');

  return title;
}

function onAddElement(element: HTMLElement) {
  const title = manageElementTitle(element);
  const rect = element.getBoundingClientRect();

  element.addEventListener('mouseenter', () => {
    state.x = rect.left;
    state.y = rect.y;
    state.height = rect.height;
    state.width = rect.width;
    state.title = title;
    showTooltip();
  });

  element.addEventListener('mouseleave', () => {
    state.x = 0;
    state.y = 0;
    state.height = 0;
    state.width = 0;
    state.title = '';
    hideTooltip();
  });
}

function createTooltipElement() {
  const element = document.createElement('div');
  element.classList.add('pa-tooltip');

  state.tooltipElement = element;
  document.body.append(element);
}

export function useTooltipExtension(rootElement: HTMLElement) {
  if (!rootElement) {
    return;
  }

  setTimeout(() => {
    createTooltipElement();
    querySelectorAllObservable(rootElement, '[title]', onAddElement);
  }, 10);
}
