import { Layout as RALayout, LayoutProps, Menu } from "react-admin";
import AppBar from "./AppBar";

export default function Layout(props: LayoutProps) {
  return (
    <RALayout {...props} appBar={AppBar} menu={Menu}>
      {props.children}
    </RALayout>
  );
}
