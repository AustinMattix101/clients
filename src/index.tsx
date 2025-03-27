import { lazy, Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import "./utils/i18next/i18next";

import { getLoadingMarkup } from "./components/assets/components";

import './index.css';

const App = lazy(() => import('./components/app/App'));

function GetApp(): void {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StrictMode>
      <Suspense fallback={getLoadingMarkup()}>
          <App />
      </Suspense>
    </StrictMode>
    
  );
}
GetApp();