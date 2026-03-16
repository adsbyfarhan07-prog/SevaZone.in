// Complete code for SevaZone React Application

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import PdfGeneration from './components/PdfGeneration';
import WalletManagement from './components/WalletManagement';
import ProfileManagement from './components/ProfileManagement';
import TransactionHistory from './components/TransactionHistory';
import Support from './components/Support';
import { IntlProvider } from 'react-intl';
import messages_en from './translations/en.json';
import messages_hi from './translations/hi.json';

// Language messages
const messages = {
  'en': messages_en,
  'hi': messages_hi,
};

class App extends React.Component {
  state = {
    language: 'en', // default language
  };

  switchLanguage = (lang) => {
    this.setState({ language: lang });
  };

  render() {
    return (
      <IntlProvider messages={messages[this.state.language]} locale={this.state.language}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Registration} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/pdf-generation' component={PdfGeneration} />
            <Route path='/wallet-management' component={WalletManagement} />
            <Route path='/profile' component={ProfileManagement} />
            <Route path='/transactions' component={TransactionHistory} />
            <Route path='/support' component={Support} />
            <Route path='/' component={Login} />
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;