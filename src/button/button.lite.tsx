export type ButtonProps = {
  variant?: string;
  children?: any; // TODO change
};

export default function Button(props: ButtonProps) {
  return (
    <button data-test1="1" class={`pa-button ${props.variant ? `pa-button--${props.variant}` : ''} `}>
      {props.children}
    </button>
  );
}
