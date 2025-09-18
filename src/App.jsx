import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const API_ENDPOINT = import.meta.env.VITE_NY_URL_ENDPOINT;
  const API_KEY = import.meta.env.VITE_NY_KEY;

  useEffect(() => {
      const fetchStories = async() => {
        const urlGetStories = `${API_ENDPOINT}/svc/topstories/v2/home.json?api-key=${API_KEY}`;
        try{
          const res = await axios.get(urlGetStories);
          console.log(res)
        }catch(error){
          console.log(`Error fetching API ${error}`);
        }
      }

      fetchStories();
  }, [])

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </>
  )
}

export default App
