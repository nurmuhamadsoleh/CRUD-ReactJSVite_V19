import { Input } from "antd";

export default function AppInput({ className = "", ...props }) {
  return <Input className={className} {...props} />;
}
