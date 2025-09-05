import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pure-black text-pure-white">
      <div className="text-center max-w-lg px-8">
        <h1 className="text-8xl font-thin mb-4 text-pure-white">404</h1>
        <p className="text-xl font-light text-text-secondary mb-8">
          Esta página não existe no futuro que construímos.
        </p>
        <a 
          href="/" 
          className="btn-premium inline-flex items-center px-8 py-3 rounded-full font-light tracking-wide transition-all duration-300 border border-white/30 text-white relative overflow-hidden hover:text-black"
        >
          Voltar ao futuro
        </a>
      </div>
    </div>
  );
};

export default NotFound;
