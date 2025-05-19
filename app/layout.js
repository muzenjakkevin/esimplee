import './globals.css';
import Navbar from './components/Navbar/Navbar';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'My Website',
  description: 'Created with plain CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
