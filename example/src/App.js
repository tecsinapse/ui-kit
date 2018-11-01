import { Button } from '@tecsinapse/ui-kit';
import React from 'react';
import './App.css';
import logo from './logo.svg';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button> Teste Botão! </Button>
        <Button submitting> Enviando </Button>
      </header>
    </div>
  );
}
