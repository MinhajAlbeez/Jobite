'use client';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import localFont from 'next/font/local';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './components/Navbarr'; 
import Footer from './components/Footer';
import { usePathname } from 'next/navigation'; // Import usePathname

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current route

  const noLayoutRoutes = ['/user-auth']; 

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          {!noLayoutRoutes.includes(pathname) && <Navbar />} 
          <main>{children}</main>
          {!noLayoutRoutes.includes(pathname) && <Footer />} 
          <ToastContainer /> 
        </Provider>
      </body>
    </html>
  );
}
