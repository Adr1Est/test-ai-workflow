import { useEffect, useState } from 'react'
import './App.css'
import { askAi } from './ai_service'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [aiData, setAiData] = useState(null)
  const [prompt, setPrompt] = useState("")
  const [dataToArray, setDataToArray] = useState(null)

  const handleChange = (event) => {
    const {id, value} = event.target
    if(id === "prompt-ai"){ return setPrompt(value)}
  }

  const handleClick = async () => {
    if (prompt){
      setIsLoaded(false)
      const response = await askAi(prompt)
      setAiData(response)
      return setIsLoaded(true)
    }
    return alert("Rellena el campo!")
  }

  useEffect(() => {
    const getDataFromAPI = async () => {
      try{
        const response = await askAi("Dame el tip astronómico del día. No más de 20 palabras.")
        setAiData(response)
        setIsLoaded(true)
      }catch(error){
        setAiData("Error al obtener respuesta.")
        console.log(error)
      }
    }

    getDataFromAPI()
  }, [])

  useEffect(() => {
    try{
      const myData = JSON.parse(aiData)
      setDataToArray(myData.spots)
    }catch(error){
      console.log("aiData no es un JSON válido:", error)
    }
  }, [aiData])

  return (
    <>
      <div id="ai-box">
        <p>Respuesta:</p>
        {isLoaded && aiData ? <p>{aiData}</p> : <span className="loader"></span>}
        <input name="" id="prompt-ai" placeholder='Escribe algo aquí...' onChange={handleChange} value={prompt}/>
        <button id="sendButton" onClick={handleClick}>Preguntar a la IA</button>
      </div>
      <div id="json-box">
        {dataToArray && Array.isArray(dataToArray) ? dataToArray.map((place, index) => (
          <div key={index} className='placeCard'>
            <p><strong>Nombre:</strong> {place.name}</p>
            <p><strong>Localización:</strong> {place.location}</p>
            <div>
              <p><strong>Latitud:</strong> {place.coordinates.latitude}</p>
              <p><strong>Longitud:</strong> {place.coordinates.longitude}</p>
            </div>
          </div>
        )) : <p>Sin datos...</p>}
      </div>
    </>
  )
}

export default App
