import React, { useState } from 'react';
import './App.css';
import './theme.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NasaProvider } from './context/NasaContext';
import ListView from './views/ListView';
import GalleryView from './views/GalleryView';
import DetailView from './views/DetailView';
import { searchNasa } from './api/nasaClient';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [loading, setLoading] = useState(false);

  const doSearch = async (q: string) => {
    setLoading(true);
    try {
      const items = await searchNasa(q);
      // setItems is provided by a context consumer inside the views via NasaProvider.
      // We'll use a custom event to pass items into context since App is not consuming it directly here.
      window.dispatchEvent(new CustomEvent('nasa:search', { detail: items }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter basename="/mp2">
      <NasaProvider>
        <div className="App-root">

          <div className="app-container">
            <header className="app-header">
              <div className="header-planet" aria-hidden="true"></div>
              <h1 className="app-title">NASA Image Explorer</h1>
              <p className="app-subtitle">Explore NASA's Image and Video Library</p>
            </header>
            <nav className="app-nav">
              <Link to="/">List</Link>
              <Link to="/gallery">Gallery</Link>
            </nav>

            <div className="search-row">
              <SearchBox onSearch={doSearch} loading={loading} />
            </div>

            <div className="content">
              <Routes>
                <Route path="/" element={<ListView />} />
                <Route path="/gallery" element={<GalleryView />} />
                <Route path="/detail/:id" element={<DetailView />} />
              </Routes>
            </div>
          </div>

          {/* Footer */}
          <footer className="app-footer">
            <span>© {new Date().getFullYear()} Jung In Chang</span>
          </footer>
        </div>
      </NasaProvider>
    </BrowserRouter>
  );
}

const SearchBox: React.FC<{ onSearch: (q: string) => void; loading: boolean }> = ({ onSearch, loading }) => {
  const [q, setQ] = useState('apollo');
  return (
    <div className="search-row">
      <TextField variant="filled" size="small" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search NASA images" sx={{ input: { color: '#e6eef8' } }} />
      <Button variant="contained" color="primary" onClick={() => onSearch(q)} disabled={loading}>{loading ? 'Searching...' : 'Search'}</Button>
    </div>
  );
};

export default App;
