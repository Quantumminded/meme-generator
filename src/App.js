import fetchData from './API/dataFatch';
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [memeImgs, setMemeImgs] = useState(false);
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [currentMeme, setCurrentMeme] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [firstTextNew, setFirstTextNew] = useState('');
  const [secondTextNew, setSecondTextNew] = useState('');



  const randomMeme = () => Math.floor(Math.random() * 100);

  const back = () => {
    setCurrentMeme(prev => prev - 1)
  }

  const next = () => {
    setCurrentMeme(prev => prev + 1)
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
  const topTextNew = (e) => {
    setFirstTextNew(e.target.value.toUpperCase())
  }
  const bottomTextNew = (e) => {
    setSecondTextNew(e.target.value.toUpperCase())
  }


  useEffect(() => {
    fetchData(setMemeImgs);

    setCurrentMeme(randomMeme())
  }, [])

  // function handleUpload(e){
  //   const fileName=(e.target.value);
  //   //const objectURL = window.URL.createObjectURL(fileName)
  //   setImgUrl(fileName);
  //   const imgDiv= document.getElementById('img-div')
  //   const img= document.createElement('img');
  //   //img.src =fileName ;
  //   img.src = URL.createObjectURL(fileName);
  //   img.height = 60;

  //     //URL.revokeObjectURL(img.src);
  //   imgDiv.append(img);

  // }

  const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");
  fileSelect.addEventListener("click", (e) => {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
  }, false);

  fileElem.addEventListener("change", handleFiles, false);

  function handleFiles() {
    if (!this.files.length) {
      fileList.innerHTML = "<p>No files selected!</p>";
    } else {
      fileList.innerHTML = "";
      const list = document.createElement("ul");
      fileList.appendChild(list);
      for (let i = 0; i < this.files.length; i++) {
        const li = document.createElement("li");
        list.appendChild(li);

        const img = document.createElement("img");
        img.src = URL.createObjectURL(this.files[i]);
        img.height = 60;
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        }
        li.appendChild(img);
        const info = document.createElement("span");
        info.innerHTML = `${this.files[i].name}: ${this.files[i].size} bytes`;
        li.appendChild(info);
      }
    }
  }





  return (

    <div className="App">
      <h1>The Meme Generator</h1>
      <div className="container-img">
        <p className="topright">{firstText}</p>
        <img className="memeImg" src={memeImgs[currentMeme]} alt='img' />
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
      {/* <input type="file" id="input" onChange={handleUpload} accept="image/png, image/jpeg" />
      <div id='img-div'> <img id="uploadedImage" src={imgUrl} alt=" image" /></div> */}
      
      <input
        type="file"
        id="fileElem"
        multiple
        accept="image/*"
      />
      <a href="#" id="fileSelect">Select some files</a>
       
      <div id="fileList">
      <p className="toprightNew">{firstTextNew}</p>
        <p>No files selected!</p>
        <p className="bottomRightNew">{secondTextNew}</p>
      </div>
      <label for='top-text-new'>top-text</label>
      <br></br>
      <input type='text' id='top-text-new' name='top-text-new' onChange={topTextNew} />
      <br></br>
      <label for='bottom-text-new'>bottom-text</label>
      <br></br>
      <input type='text' id='bottom-text-new' name='bottom-text-new' onChange={bottomTextNew} />
      <br></br>
       


    </div>

  );
}

export default App;
