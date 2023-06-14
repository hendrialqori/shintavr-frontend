import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
