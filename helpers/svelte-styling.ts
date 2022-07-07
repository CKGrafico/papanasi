// FROM: https://svelte.dev/repl/c7787db098e6495888036598586ec4f3?version=3.31.0

export function svelteStyling(node, vars) {
  Object.entries(vars).forEach(([p, v]) => {
    node.style[p] = v;
  });
}
