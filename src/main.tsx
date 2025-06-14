import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Layout from './components/Layout';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout showFooter>
      <App />
    </Layout>
  </StrictMode>
);
