import { ThemeContext } from "@/context/theme";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryContext } from "@/context/query.context";
import { AuthProvider } from "@/context/AuthContexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intruck - Delivery Service",
  description: "Gerenciador de entregas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={inter.className}>
        <QueryContext>
          <AuthProvider>
            <ThemeContext>{children}</ThemeContext>
          </AuthProvider>
        </QueryContext>
      </body>
    </html>
  );
}
