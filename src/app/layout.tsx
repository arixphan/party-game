import { FirebaseConfigContext } from "./shares/firebase/FirebaseConfigContext";
import { LayoutProvider } from "./shares/layout/LayoutProvider";

import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-w-full min-h-screen flex flex-col">
        <FirebaseConfigContext>
          <LayoutProvider />
          <main className="flex flex-col items-center flex-auto justify-between">
            {children}
          </main>
        </FirebaseConfigContext>
      </body>
    </html>
  );
}
