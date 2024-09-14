import './globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'A simple Todo app with Next.js App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <footer className="text-gray-300 row-start-3 flex gap-6 flex-wrap items-center justify-center">
          This is the layout footer
        </footer>
      </body>
    </html>
  );
}
