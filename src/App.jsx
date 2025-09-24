import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import NewsCard from './components/NewsCard'

function App() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const API_ENDPOINT = import.meta.env.VITE_NY_URL_ENDPOINT;
  const API_KEY = import.meta.env.VITE_NY_KEY;

  const handleMoreOnClick = (article) => {
    alert('ok');
    setSelectedNews(article);
  };

  useEffect(() => {
      const fetchStories = async() => {
        const urlGetStories = `${API_ENDPOINT}/svc/topstories/v2/home.json?api-key=${API_KEY}`;
        try{
          const res = await axios.get(urlGetStories);
          setNews(res.data.results);
        }catch(error){
          console.log(`Error fetching API ${error}`);
        }
      }

      fetchStories();
      console.log(news);
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">News Articles</h1>
      <div className="grid grid-cols-3 gap-4">
        {news.map((val, key) => (
          <NewsCard
            key={key}
            title={val.title}
            byline={val.byline}
            moreOnClick={() => handleMoreOnClick(val)} 
          />
        ))}
      </div>

      {/* tampilkan detail berita kalau ada yang dipilih */}
      {selectedNews && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold">{selectedNews.title}</h2>
          <p className="text-gray-700">{selectedNews.abstract}</p>
          <a
            href={selectedNews.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Read Full Article
          </a>
        </div>
      )}
    </div>
  );
}

export default App
