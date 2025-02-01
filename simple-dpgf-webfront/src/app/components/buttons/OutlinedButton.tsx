import { Button } from "@mui/material";

interface IProps {
  label: string;
}

export default function OutlinedButton({
  label,
}: Readonly<IProps>): JSX.Element {
  return <Button variant="outlined">{label}</Button>;
}
