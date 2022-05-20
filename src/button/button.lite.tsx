export type ButtonProps = {
  name: string;
};

export default function Button(props: ButtonProps) {
  return <button>{props.name}</button>;
}
