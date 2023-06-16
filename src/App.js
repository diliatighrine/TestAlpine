import React, { useState } from 'react'; //importation des modules React et useState depuis la bibliotheque React 

//definition du composant :
function App() {
  //declaration des états du composant en utilisant useState:
  const [urlGif, setUrlGif] = useState(''); //URL du gif et sa fonction de mise a jour 
  const [rep, setRep] = useState('');//la reponse et sa fonction de mise a jour 
  const [countClick, setCountClick] = useState(0); //le nombre de clics et sa fonction de mise a jour 
  const [random, setRandom] = useState(getRandom());
  //declaration des états du composant en utilisant useState:
  const [dejaFait, setDejaFait] = useState(false); //Apres quelques recherches j'ai decidé de me servir dt de cette variable pour fixer certains comportements indésirables de mon application 
  /* cette variable me permet de controler quand la fonction de fetch sera appelée (une seule fois lors de l'execution initiale) */

  /* */
  function getRandom() {
    return Math.floor(Math.random() * 5) + 1;  //random * (max-min +1)
  }

  /*La fonction fetchDataFromApi effectue une requete asynchrone a l'API fournie en utilisant le fameux fetch 
  Elle recupere la reponse sous forme Json et elle met à jour les états 'urlGif', 'rep' et 'countClick' et gere les erreurs en les affichant dans la console 
  identique à l'exemple déjà illustré en entretien */
  const fetchDataFromApi = async () => {
    try {
      const response = await fetch('https://yesno.wtf/api');
      const resJson = await response.json();
      //mise a jour 
      setRep(resJson.answer);
      setUrlGif(resJson.image);

    } catch (error) { //traitement des erreurs 
      console.log(error);
    }
  };

  if (!dejaFait) { //ce if me permet d'executer la fonction fetch lors de l'xecution initiale , on aurait pu aussi utiliser le useEffect en passant un tableau vide en parametres pour eviter ce probleme
    fetchDataFromApi();
    setDejaFait(true);
  }

  /* La fonction ClickButton est appelée lorsque le bouton est cliqué , son role s'agit de décrementer le nombre de clicks restants en utilisant la fonction de m-a-j, si on atteint 1 on refait la requete en appelant la fonction fetch  */

  const ClickButton = () => {
    if (countClick < random) { //si on n'a pas atteint le nombre random choisi entre 1 et 5
      setCountClick(countClick + 1); //on incremente 
    } else {
      setRandom(getRandom()); //sinon on reinitialise notre nombre aleatoire en faisant appel a notre fonction getRandom()
      setCountClick(1); //on reinitialise notre compteur de clicks à 1 (en comptant le click actuel )
      fetchDataFromApi(); //et on fait appel au fetch 
    }
  }

  return (
    <div
      style={{  //partie style : du CSS injecté dans mon element div 
        background: 'black', 
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',

      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
      <div 
        style={{ //cette partie gere le Gif
          background: `url(${urlGif}) no-repeat center center fixed`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '400px',
          height: '300px',
        }}
      />
      <h1 style={{ /*cette partie gere le boutton  */marginBottom: '20px', color: 'white' }}>{rep}</h1>
        <h1>{rep}</h1>
        <button onClick={ClickButton}> Send request </button>
      </div>
    </div>

  );
}

export default App; 
