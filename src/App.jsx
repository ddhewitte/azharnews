import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import NewsCard from './components/NewsCard'
import { useDispatch, useSelector } from "react-redux";
import { setNews, setSearch, setSortBy, setSelected } from "./redux/newsSlice";

function App() {
  const dispatch = useDispatch();
  const { items, selected, search, sortBy } = useSelector((state) => state.news);

  const API_ENDPOINT = import.meta.env.VITE_NY_URL_ENDPOINT;
  const API_KEY = import.meta.env.VITE_NY_KEY;

  const handleMoreOnClick = (article) => {
    alert('ok');
    dispatch(setSelected(article));
  };

  useEffect(() => {
      const fetchStories = async() => {
        const urlGetStories = `${API_ENDPOINT}/svc/topstories/v2/home.json?api-key=${API_KEY}`;
        try{
          const res = await axios.get(urlGetStories);
          
          const filteredData = res.data.results
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sortBy === "asc") return a.title.localeCompare(b.title);
            else return b.title.localeCompare(a.title);
          });

          dispatch(setNews(filteredData));

        }catch(error){
          console.log(`Error fetching API ${error}`);
        }
      }

      fetchStories();
  }, [dispatch, search, sortBy])

  return (
    <div className="p-4">

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari berita..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="border px-2 py-1 rounded"
        />

        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>



      <h1 className="text-2xl font-bold mb-2">News Articles</h1>
      <div className="grid grid-cols-3 gap-4">
        
        {items.map((val, key) => (
          <NewsCard
            key={key}
            title={val.title}
            byline={val.byline}
            moreOnClick={() => handleMoreOnClick(val)} 
          />
        ))}
      </div>

      {/* tampilkan detail berita kalau ada yang dipilih */}
      {selected && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold">{selected.title}</h2>
          <p className="text-gray-700">{selected.abstract}</p>
          <a
            href={selected.url}
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
