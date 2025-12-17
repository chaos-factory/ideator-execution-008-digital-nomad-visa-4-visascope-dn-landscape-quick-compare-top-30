import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComparePage from './pages/ComparePage';
import AboutPage from './pages/AboutPage';
import SourcesPage from './pages/SourcesPage';
import './App.css';

function App() {
  return (
    <Router basename="/ideator-execution-008-digital-nomad-visa-4-visascope-dn-landscape-quick-compare-top-30">
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1 className="site-title">
              <Link to="/compare">VisaScope</Link>
            </h1>
            <nav className="main-nav">
              <Link to="/compare">Compare</Link>
              <Link to="/about">About</Link>
              <Link to="/sources">Sources</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ComparePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sources" element={<SourcesPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#changelog">Changelog</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} VisaScope. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
