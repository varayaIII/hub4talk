// src/components/Logo.jsx
export default function Logo({ size = 'normal' }) {
  const sizes = {
    small: 'w-8 h-8',
    normal: 'w-10 h-10',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    normal: 'w-6 h-6',
    large: 'w-10 h-10',
    xlarge: 'w-14 h-14'
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-lg hover:shadow-orange-500/50 transition-all duration-300`}>
      {/* Globo con conexiones */}
      <svg 
        className={`${iconSizes[size]} text-white relative z-10`}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo del globo */}
        <circle 
          cx="12" 
          cy="12" 
          r="9" 
          stroke="currentColor" 
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Líneas del meridiano */}
        <path 
          d="M12 3 C 12 3, 15 7, 15 12 C 15 17, 12 21, 12 21" 
          stroke="currentColor" 
          strokeWidth="1.5"
          fill="none"
        />
        <path 
          d="M12 3 C 12 3, 9 7, 9 12 C 9 17, 12 21, 12 21" 
          stroke="currentColor" 
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Líneas del ecuador */}
        <path 
          d="M3 12 L 21 12" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <path 
          d="M5 8 L 19 8" 
          stroke="currentColor" 
          strokeWidth="1"
          opacity="0.6"
        />
        <path 
          d="M5 16 L 19 16" 
          stroke="currentColor" 
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Puntos de conexión (nodos) */}
        <circle cx="6" cy="8" r="1.5" fill="currentColor" className="animate-pulse" />
        <circle cx="18" cy="8" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="6" cy="16" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="18" cy="16" r="1.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        
        {/* Sonrisa amigable */}
        <path 
          d="M8 13.5 Q 12 16, 16 13.5" 
          stroke="currentColor" 
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Ojos */}
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>

      {/* Efectos de brillo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Partículas flotantes (opcional para hero) */}
      {size === 'xlarge' && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </>
      )}
    </div>
  );
}