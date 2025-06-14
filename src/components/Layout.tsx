import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md p-4 flex items-center">
        <img src="/vite.svg" alt="logo" className="h-8 w-8 mr-2" />
        <span className="text-2xl font-bold text-purple-600">Rayito</span>
      </header>
      <main className="flex-1">{children}</main>
      {showFooter && (
        <footer className="bg-gray-100 text-center text-gray-500 p-4 text-sm">
          © 2024 Rayito
        </footer>
      )}
    </div>
  );
};

export default Layout;
