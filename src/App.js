import React from 'react';
import classes from './App.module.css';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className={classes.App}>
      <BurgerBuilder />
    </div>
  );
}

export default App;


