import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Calendar from './pages/Calendar';
import Merchandising from './pages/Merchandising';
import Login from './pages/Login';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import CreateNews from './pages/CreateNews';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/equipos" element={<Teams />} />
                        <Route path="/calendario" element={<Calendar />} />
                        <Route path="/merchandising" element={<Merchandising />} />
                        <Route path="/socios" element={<Login />} />
                        <Route path="/noticias" element={<News />} />
                        <Route path="/noticias/:id" element={<NewsDetail />} />
                        <Route path="/crear-noticia" element={<CreateNews />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
