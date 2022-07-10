import { querySelectorAllObservable } from '../../helpers';
import './tooltip.css';

const HIDDEN_CLASS = 'is-hidden';

const state = {
  initialized: false,
  tooltipElement: document.createElement('div'),
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  title: '',
  time: 0
};

function showTooltip() {
  state.tooltipElement.classList.remove(HIDDEN_CLASS);

  setTimeout(() => {
    state.tooltipElement.style.top = `${state.y}px`;
    state.tooltipElement.style.left = `${state.x}px`;
    state.tooltipElement.style.width = `${state.width}px`;
    state.tooltipElement.innerText = state.title;
  }, state.time);
}

function hideTooltip() {
  state.tooltipElement.classList.add(HIDDEN_CLASS);

  setTimeout(() => {
    state.tooltipElement.style.top = '0';
    state.tooltipElement.style.left = '0';
    state.tooltipElement.innerText = '';
  }, state.time);
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

  element.addEventListener('mouseenter', () => {
    const rect = element.getBoundingClientRect();

    state.x = rect.x;
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
  element.classList.add('pa-tooltip', HIDDEN_CLASS);

  state.tooltipElement = element;
  document.body.append(element);

  const styles = getComputedStyle(element);
  const transitionTime = styles.getPropertyValue(`--pa-tooltip-transition-time`).trim();
  state.time = Number(transitionTime);
}

export function useTooltipExtension(rootElement?: HTMLElement) {
  const element = rootElement || document.body;

  if (state.initialized) {
    hideTooltip();
    state.tooltipElement.remove();
  }

  state.initialized = true;

  setTimeout(() => {
    createTooltipElement();
    querySelectorAllObservable(element, '[title]', onAddElement);
  }, 10);
}
