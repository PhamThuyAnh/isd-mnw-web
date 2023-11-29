import logo from './logo.svg';
import './App.css';
import Router from './router/Router';
import MessengerCustomerChat from 'react-messenger-customer-chat';

function App() {
  return (
    <div className="App">
      <Router />
      <MessengerCustomerChat
        pageId="100067095433715"
        appId="2096140013906271"
      />
    </div>
  );
}

export default App;
