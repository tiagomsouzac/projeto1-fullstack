import { useState } from 'react'
import './App.css'

function App() {
  const [cep, setCep] = useState('')
  const [resposta, setResposta] = useState('')

  async function consultarCep(event) {
    event.preventDefault()

    const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await result.json()

    setResposta(JSON.stringify(data, null, 2))
  }

  function pegarCep(event) {
    setCep(event.target.value)
  }

  return (
    <main className="app">
      <section className="lookup-card" aria-labelledby="page-title">
        <p className="eyebrow">CONSULTA DE ENDEREÇO</p>
        <h1 id="page-title">Consulte um CEP</h1>
        <p className="description">
          Informe o CEP para consultar os dados do endereço.
        </p>

        <form className="lookup-form" onSubmit={consultarCep}>
          <label htmlFor="cep">CEP</label>
          <div className="form-row">
            <input
              id="cep"
              name="cep"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Digite os 8 números"
              value={cep}
              onChange={pegarCep}
              aria-describedby="cep-hint"
            />
            <button type="submit" >Consultar</button>
          </div>
          <span id="cep-hint" className="hint">
            Apenas números
          </span>
        </form>

        <section className="result" aria-labelledby="result-title">
          <div className="result-heading">
            <h2 id="result-title">Resposta JSON</h2>
          </div>
          <pre className="json-output" aria-live="polite">
            {resposta || 'Sem resposta ainda.'}
          </pre>
        </section>
        <p className="attribution">Dados fornecidos pelo ViaCEP</p>
      </section>
    </main>
  )
}

export default App
