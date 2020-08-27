import ReactDOM from 'react-dom';
import React from 'react';
import { Navbar, Button } from './components';

function App() {
  return (
    <div>
      <h3>Pham Van An</h3>
      <Navbar label="navbar" />
      <Button label="Click me" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
