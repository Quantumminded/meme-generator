import fetchData from './API/dataFatch';
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [ memeImgs, setMemeImgs ] = useState(false);
  const [ firstText, setFirstText ] = useState('');
  const [ secondText, setSecondText ] = useState('');
  const [ currentMeme, setCurrentMeme ] = useState(false);

  const randomMeme = () => Math.floor(Math.random()* 100);

  const back = () => {
    setCurrentMeme(prev => prev -1)
  }

  const next = () => {
    setCurrentMeme(prev => prev +1)
  }

  const random = () => {
    setCurrentMeme(randomMeme)
  }

  const topText = (e) => {
    setFirstText(e.target.value.toUpperCase())
  }
  
  const bottomText = (e) => {
    setSecondText(e.target.value.toUpperCase())
  }


  useEffect(() => { fetchData(setMemeImgs);

    setCurrentMeme(randomMeme())
  }, [])



  return (

    <div className="App">
      <h1>The Meme Generator</h1>
      <div className="container-img">
        <p className="topright">{firstText}</p>
        <img className="memeImg" src={memeImgs[currentMeme].url} alt='img' />
        <p className="bottomRight">{secondText}</p>
      </div>
      <br></br>
      <label for='top-text-input'>top-text</label>
      <br></br>
      <input type='text' id='top-text-input' name='top-text' onChange={topText} />
      <br></br>
      <label for='bottom-text-input'>bottom-text</label>
      <br></br>
      <input type='text' id='bottom-text-input' name='bottom-text' onChange={bottomText} />
      <br></br>
      <button disabled={currentMeme <= 0} onClick={back}>Prev</button>
      <button disabled={currentMeme >= 99} onClick={next}>Next</button>
      <button onClick={random}>Random</button>
      <br></br>
      <input type="file" id="input" accept="image/png, image/jpeg" />
    </div>
  );
}

export default App;
