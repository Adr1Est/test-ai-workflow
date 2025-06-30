import { useEffect, useState } from 'react'
import './App.css'
import { askAi } from './ai_service'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [aiData, setAiData] = useState(null)
  const [prompt, setPrompt] = useState("")

  const handleChange = (event) => {
    const {id, value} = event.target
    if(id === "prompt-ai"){ return setPrompt(value)}
  }

  const handleClick = async () => {
    setIsLoaded(false)
    const response = await askAi(prompt)
    setAiData(response)
    setIsLoaded(true)
  }

  const cleanResponse = (text) => {
    return text.replace(/<think>.*?<\/think>/gs, '').trim()
  }

  useEffect(() => {
    const getDataFromAPI = async () => {
      try{
        const response = await askAi("Utiliza únicamente 10 palabras para presentarte.")
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
    console.log(aiData);
  }, [aiData])

  return (
    <>
      <div id="ai-box">
        <p>Respuesta:</p>
        {isLoaded && aiData?.choices?.[0]?.message?.content ? <p>{cleanResponse(aiData.choices[0].message.content)}</p> : aiData?.message ? <p>{aiData.message}</p> : <span className="loader"></span>}
        <input name="" id="prompt-ai" placeholder='Escribe algo aquí...' onChange={handleChange} value={prompt}/>
        <button id="sendButton" onClick={handleClick}>Preguntar a la IA</button>
      </div>
    </>
  )
}

export default App
