import { getDocument, getWindow } from 'ssr-window';
import { debug, querySelectorAllObservable } from '~/helpers';
import './tooltip.css';

const HIDDEN_CLASS = 'is-hidden';

let initialized = false;
let tooltips = [];

function showTooltip(state) {
  state.tooltipElement.style.transform = `translate(${state.x}px, ${state.y}px)`;
  state.tooltipElement.style.width = `${state.width}px`;
  state.tooltipElement.innerText = state.title;
  debug(`TooltipService showTooltip: state: ${JSON.stringify(state)}`);

  setTimeout(() => {
    state.tooltipElement.classList.remove(HIDDEN_CLASS);
  }, state.time);
}

function hideTooltip(state) {
  state.tooltipElement.classList.add(HIDDEN_CLASS);
  debug(`TooltipService hideTooltip: state: ${JSON.stringify(state)}`);

  setTimeout(() => {
    state.tooltipElement.style.transform = `translate(-100px, -100px)`;
    state.tooltipElement.innerText = '';
  }, state.time);
}

function manageElementTitle(element: HTMLElement) {
  const title = element.getAttribute('title');
  const ariaLabel = element.getAttribute('aria-label');

  element.setAttribute('aria-label', ariaLabel || title);
  element.removeAttribute('title');

  debug(`TooltipService manageElementTitle: title: ${title}`);
  return title;
}

function onAddElement(rootElement: HTMLElement, element: HTMLElement) {
  const window = getWindow();

  const title = manageElementTitle(element);
  const styles = window.getComputedStyle(rootElement);
  const transitionTime = styles.getPropertyValue(`--pa-tooltip-transition-time`).trim();

  debug(`TooltipService onAddElement: transitionTime: ${transitionTime}`);
  const state = {
    tooltipElement: null,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    title: '',
    time: Number(transitionTime)
  };

  const tooltipElement = createTooltipElement(rootElement);
  state.tooltipElement = tooltipElement;
  tooltips.push(state);

  element.addEventListener('mouseenter', () => {
    const rect = element.getBoundingClientRect();
    const rootRect = rootElement.getBoundingClientRect();

    debug(`TooltipService onAddElement: mouseenter`);
    state.x = Math.abs(rootRect.x) + rootElement.scrollLeft + rect.x;
    state.y = Math.abs(rootRect.y) + rootElement.scrollTop + rect.y;
    state.height = rect.height;
    state.width = rect.width;
    state.title = title;

    showTooltip(state);
  });

  element.addEventListener('mouseleave', () => {
    state.x = 0;
    state.y = 0;
    state.height = 0;
    state.width = 0;
    state.title = '';

    debug(`TooltipService onAddElement: mouseleave`);

    hideTooltip(state);
  });
}

function createTooltipElement(rootElement: HTMLElement) {
  const document = getDocument();
  const element = document.createElement('div');
  element.classList.add('pa-tooltip', HIDDEN_CLASS);
  element.setAttribute('aria-hidden', 'true');

  rootElement.prepend(element);
  debug(`TooltipService createTooltipElement`);

  return element;
}

export default function useTooltipExtension(rootElement?: HTMLElement) {
  const document = getDocument();
  const element = rootElement || document.body;

  if (initialized) {
    debug(`TooltipService useTooltipExtension: initialized`);
    tooltips.forEach((state) => {
      hideTooltip(state);
      state.tooltipElement.remove();
    });

    tooltips = [];
  }

  initialized = true;

  setTimeout(
    () =>
      querySelectorAllObservable(element, '[title]', (titleElement: HTMLElement) =>
        onAddElement(element, titleElement)
      ),
    10
  );
}
