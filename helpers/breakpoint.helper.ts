import { Breakpoint, breakpoints } from '../models';

export function getBreakpointClasses(props: { [key: string]: string | number }, prefix = '') {
  const usedBreakpoints = Object.entries(props)
    .filter(([key]: [Breakpoint, string]) => breakpoints.find((x) => x.value === key))
    .filter((x) => x[0] && x[1]);

  const breakpointsClasses = usedBreakpoints.map(([key, value]: [Breakpoint, string]) => prefix + value + '@' + key);

  return ' ' + breakpointsClasses.join(' ');
}

/* We are using this because nowadays you cannot have a custom property in a media query */
export function initBreakpointChecker() {
  const styles = getComputedStyle(document.documentElement);
  const medias = breakpoints.map((breakpoint) => ({
    key: breakpoint.value,
    value: styles.getPropertyValue(`--pa-breakpoint-${breakpoint.value}`).trim()
  }));

  const $body = document.body;

  function onChangeMedia(media, matches) {
    const className = `breakpoint-${media.trim()}`;
    console.log(className, matches);

    if (matches) {
      $body.classList.add(className);
    } else {
      $body.classList.remove(className);
    }
  }

  medias.forEach(({ key, value }) => {
    onChangeMedia(key, window.innerWidth > Number(value.replace('px', '')));
    window.matchMedia(`(min-width: ${value})`).addEventListener('change', (e) => onChangeMedia(key, e.matches));
  });
}
