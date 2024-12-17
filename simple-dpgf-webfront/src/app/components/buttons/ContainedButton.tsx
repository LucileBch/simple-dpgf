import Button from "@mui/material/Button";

interface IProps {
  label: string;
  path: string;
}

export default function ContainedButton(props: IProps): JSX.Element {
  return (
    <Button variant="contained" href={props.path}>
      {props.label}
    </Button>
  );
}
