import { getDocument, getWindow } from 'ssr-window';
import { Breakpoint, breakpoints } from '../models';
import { wait } from './wait.helper';

export function getBreakpointClasses(
  basic: string | number,
  xxs: string | number,
  xs: string | number,
  s: string | number,
  m: string | number,
  l: string | number,
  xl: string | number,
  xxl: string | number,
  prefix = ''
) {
  const props: { [key: string]: string | number } = { basic, xxs, xs, s, m, l, xl, xxl };

  const usedBreakpoints = Object.entries(props)
    .filter(([key]: [Breakpoint, string]) => breakpoints.find((x) => x.value === key))
    .filter((x) => x[0] && x[1] !== '' && x[1] !== null && x[1] !== undefined);

  const breakpointsClasses = usedBreakpoints.map(([key, value]: [Breakpoint, string]) => prefix + value + '@' + key);

  return ' ' + breakpointsClasses.join(' ');
}

/* We are using this because nowadays you cannot have a custom property in a media query */

function checkBreakpoints() {
  const window = getWindow();
  const document = getDocument();

  const styles = window.getComputedStyle(document.documentElement);
  const medias = breakpoints.map((breakpoint) => ({
    key: breakpoint.value,
    value:
      breakpoint.value === Breakpoint.Basic
        ? '0'
        : styles.getPropertyValue(`--pa-breakpoint-${breakpoint.value}`).trim()
  }));

  if (!window.matchMedia || !document.body || !document.body.classList) {
    return;
  }

  function onChangeMedia(media, matches) {
    const className = `breakpoint-${media.trim()}`;

    if (matches) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }

  medias.forEach(({ key, value }) => {
    onChangeMedia(key, window.innerWidth > Number(value.replace('px', '')));
    window.matchMedia(`(min-width: ${value})`).addEventListener('change', (e) => onChangeMedia(key, e.matches));
  });
}

export async function initBreakpointChecker() {
  await wait();
  checkBreakpoints();
}
