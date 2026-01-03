import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Brandon Campbell | UI/UX Designer",
  description: "Portfolio of Brandon Campbell - UI/UX & Product Designer",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased p-0 m-0" style={{ backgroundColor: '#121212' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Outer container */}
          <div className="min-h-screen w-full relative" style={{ backgroundColor: '#121212' }}>
            {/* Divider line - 85px from top, full width */}
            <div 
              className="absolute top-[85px] left-0 right-0 w-full h-px bg-gray-400/30 z-50"
              style={{
                width: '100vw',
                marginLeft: 'calc((100% - 100vw) / 2)',
                marginRight: 'calc((100% - 100vw) / 2)'
              }}
            ></div>
            {/* Inner content area with border */}
            <div 
              className="min-h-screen border-l border-r mx-auto max-w-[1500px] bg-dark-primary dark:bg-dark-primary relative"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: '1px' }}
            >
              <Navigation />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

