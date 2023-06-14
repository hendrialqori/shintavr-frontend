import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 h-screen overflow-scroll w-full">
      {children}
      </main>
    </div>
  );
}
