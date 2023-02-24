import  React from 'react';
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
 //vezesAcad, peso, altura, objetivo
  const [vezesAcad, setvezesAcad] = useState('');
  const [peso, setpeso] = useState('');
  const [altura, setaltura] = useState('');
  const [nivel, setnivel] = useState('');
  const [objetivo, setobjetivo] = useState('');

 
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
          body: JSON.stringify({ vezesAcad, peso, altura, nivel, objetivo}),
        });
        
        const data = await response.json();
        
        setResult(data.result.replaceAll('\n', '<br />'));
      } catch(e){
        alert('Falha ao enviar dados, tente novamente mais tarde');
      } finally {
        setLoading(false);
      }

  }

  return (
    <div>
      <Head>
        <title>Personaly</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Personaly</h3>
        <p>Transforme seus treinos com inteligência artificial.</p>
        <form onSubmit={onSubmit}>


          <label>Quantas vezes você quer ir na academia por semana?</label>
          <select
            name="vezesAcad"
            value={vezesAcad}
            onChange={(e) => setvezesAcad(e.target.value)}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>


          <label>Qual seu peso em kilos?</label>
          <input
            type="number"
            name="peso"
            value={peso}
            onChange={(e) => setpeso(Number.parseInt(e.target.value))}
         />

          <label>Qual seu nível?</label>
          <select
            name="nivel"
            value={nivel}
            onChange={(e) => setnivel(e.target.value)}
          >
            <option value="3">Iniciante</option>
            <option value="4">Intermediário</option>
            <option value="5">Avançado</option>
          </select>


          <label>Qual seu tamanho em centímetros?</label>
          <input
            type="number"
            name="altura"
            value={altura}
            onChange={(e) => setaltura(Number.parseInt(e.target.value))}
         />
          
          <label>Qual seu objetivo?</label>
          <select
            name="objetivo"
            value={objetivo}
            onChange={(e) => setobjetivo(e.target.value)}
          >
            <option value="Perder Gordura">Perder Gordura</option>
            <option value="Ganhar Musculos">Ganhar Musculos</option>
            <option value="Melhorar Condicionamento">Melhorar Condicionamento</option>
            <option value="Melhorar Saude Cardíaca">Melhorar Saude Cardíaca</option>
          </select>




          <input type="submit" value="Monte meu Treino" />
          
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
