import "./globals.css";
import { Footer, NavBar } from "@/components";

import Provider from "@/components/Provider";

export const metadata = {
  title: "Sage",
  description: "Explore your minds",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="relative">
        <Provider>
          <NavBar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}