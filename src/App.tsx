import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './theming';
import { Navigation } from './navigation';
import Theme from "./components/theme/Theme";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Theme>
        <BrowserRouter>
          <Layout>
            {/*<ModalButton />*/}
            <Navigation />
          </Layout>
        </BrowserRouter>
      </Theme>
    </div>
  );
}

export default App;
