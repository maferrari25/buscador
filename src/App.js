import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import axios from 'axios';

import api from './services/api';



function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch(e) {
    if (input === "") {
      alert("Preencha o campo CEP")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('')
    } catch {
      alert('Ops, ocorreu um erro ao buscar o CEP ' + input)
      setInput("")
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite deu CEP..."
          value={input}
          onChange={e => setInput(e.target.value)}
        ></input>
        <button className="buttonSearch"
          onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && (
            <span>Complemento: {cep.complemento}</span>)}
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
