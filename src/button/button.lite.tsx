export type ButtonProps = {
  variant?: string;
  children?: any;
};

export default function Button(props: ButtonProps) {
  return <button class={`pa-button ${props.variant ? `pa-button--${props.variant}` : ''} `}>{props.children}</button>;
}
