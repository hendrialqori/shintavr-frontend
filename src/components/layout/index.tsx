import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 h-screen overflow-scroll w-full dark:bg-dark bg-blue-50/30">
        {children}

        <footer className="text-gray-200 font-light mr-6 ml-auto text-center">
          Build with love and coffee by Hendri Alqori
        </footer>
      </main>
    </div>
  );
}
