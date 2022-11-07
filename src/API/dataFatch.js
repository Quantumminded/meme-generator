import axios from 'axios'

const memeUrl = `https://api.imgflip.com/get_memes`

function fetchData (func) {
  // Axios version
  axios.get(memeUrl)
  .then(response => {
    return func(response.data.data.memes)
  })
  .catch(error => console.log(error))

  // Fetch version
  // fetch(memeUrl)
  //   .then(response => response.json())
  //   .then(json => {
  //     return func(json.data.memes)
  //   })
  //   .catch(error => console.log(error))
}
export default fetchData;