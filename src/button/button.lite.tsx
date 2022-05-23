export type ButtonProps = {
  name?: string;
  color?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button>
      {props.name} {props.color}
    </button>
  );
}
