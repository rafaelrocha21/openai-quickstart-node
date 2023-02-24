import  React from 'react';
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {

  const [diasDieta, setdiasDieta] = useState(7);
  const [numRefeicoes, setnumRefeicoes] = useState(3);
  const [numOpcoes, setnumOpcoes] = useState(2);
  const [doencas, setdoencas] = useState('');
  const [peso, setpeso] = useState('');
  const [altura, setaltura] = useState('');
  const [idade, setidade] = useState('');
  const [numExercicios, setnumExercicios] = useState('');
  const [alergias, setalergias] = useState('');
 
  const [loading, setLoading] = useState(false);


  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    if(loading){
      return;
    }
    setLoading(true)
      try{
        
        const response = await fetch("/api/generate-diet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ diasDieta, numRefeicoes, numOpcoes, doencas, peso, altura, idade, numExercicios, alergias }),
        });
  
        const data = await response.json();
        setResult(data.result.replace('\n', '<br/>'));
      } catch(e){
        alert('Falha ao enviar dados, tente novamente mais tarde');
      } finally {
        setLoading(false);
      }

  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>MyNutri</h3>
        <form onSubmit={onSubmit}>


          <label>Dias de Dieta</label>
          <select
            name="diasDieta"
            value={diasDieta}
            onChange={(e) => setdiasDieta(e.target.value)}
          >
            <option value="sete">7 Dias</option>
            <option value="catorze">14 Dias</option>
          </select>


          <label>Numero de Refeições por dia</label>
          <select
            name="numRefeicoes"
            value={numRefeicoes}
            onChange={(e) => setnumRefeicoes(e.target.value)}
          >
            <option value="tresRefeicoes">3 </option>
            <option value="quatroRefeicoes">4</option>
            <option value="cincoRefeicoes">5</option>
          </select>

          <label>Quantas variações de prato por refeição?</label>
          <select
            name="numOpcoes"
            value={numOpcoes}
            onChange={(e) => setnumOpcoes(e.target.value)}
          >
            <option value="umaVariacao">1</option>
            <option value="duasVariacoes">2</option>
          </select>

          <label>Você possui alguma doença crônica? Separe cada doença com vírgulas "," </label>
          <input
            type="text"
            name="doencas"
            value={doencas}
            onChange={(e) => setdoencas(e.target.value)}
            placeholder = "Nenhuma Doença"
            required
          />
          
          <label>Qual seu peso atual em kilos?</label>
          <input
            type="number"
            name="peso"
            value={peso}
            onChange={(e) => setpeso(Number.parseInt(e.target.value))}
            placeholder = "00"
            required
          />

          <label>Qual sua altura atual em centímetros?</label>
          <input
            type="number"
            name="altura"
            value={altura}
            onChange={(e) => setaltura(Number.parseInt(e.target.value))}
            placeholder = "00"
            required
          />

          <label>Qual sua idade em anos?</label>
          <input
            type="number"
            name="idade"
            value={idade}
            onChange={(e) => setidade(Number.parseInt(e.target.value))}
            placeholder = "00"
            required
          />

          <label>Quantas vezes você faz exercicio por semana?</label>
          <input
            type="number"
            name="numExercicios"
            value={numExercicios}
            onChange={(e) => setnumExercicios(Number.parseInt(e.target.value))}
            placeholder = "00"
            required
          />
          
          <label>Você possui alguma alergia? Separe cada alergia com vírgulas ",".</label>
          <input
            type="text"
            name="alergias"
            value={alergias}
            onChange={(e) => setalergias(e.target.value)}
            placeholder = "Nada"
            required
          />



          <input type="submit" value="Generate names" />
          
        </form>

        {loading && (
          <div>

              <img src="/loading.gif" className={styles.loading} id="loading"></img>
              <div className={styles.blur}></div>
            </div>
        )}


        {result && (<div 
        className={styles.result} 
        dangerouslySetInnerHTML={{ __html : result}}
        />
        )}
      </main>
    </div>
  );
}
