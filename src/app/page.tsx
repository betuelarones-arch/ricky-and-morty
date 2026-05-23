import Link from 'next/link';
import Image from 'next/image';
import { ApiResponse, Character } from './types'; 
import { FaSearch, FaFlask, FaDatabase } from 'react-icons/fa';

async function getCharacters(): Promise<Character[]> {
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    cache: 'force-cache', 
  });
  
  if (!res.ok) throw new Error('Error al cargar los personajes');
  
  const data: ApiResponse = await res.json();
  return data.results;
}

export default async function HomePage() {
  const characters = await getCharacters();

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-green-500 selection:text-black">
      {/* SECCIÓN HERO */}
      <section className="relative overflow-hidden bg-gray-900 border-b border-gray-800 py-20 lg:py-28">
        {/* Efecto de luces de portal de fondo */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Badge Pequeño */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest backdrop-blur-sm">
            <FaFlask className="animate-spin" style={{ animationDuration: '3s' }} /> Proyecto de Laboratorio Next.js
          </div>
          
          {/* Título Principal de Impacto */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            Rick & Morty Labs
          </h1>
          
          {/* Subtítulo */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
            Explora el multiverso a través de esta aplicación ultra optimizada. Experimenta el renderizado estático dinámico, estrategias de caché avanzadas y consultas en tiempo real.
          </p>

          {/* Acciones principales */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/buscar" 
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-gray-950 font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <FaSearch className="text-gray-950 group-hover:scale-110 transition-transform" />
              <span>Explorador en Tiempo Real</span>
            </Link>
            
            <div className="inline-flex items-center justify-center gap-2 bg-gray-800/80 border border-gray-700 text-gray-300 font-medium px-6 py-4 rounded-xl backdrop-blur-sm">
              <FaDatabase className="text-green-400" />
              <span>SSG Integrado</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE LA REJILLA DE PERSONAJES */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              Personajes Destacados
            </h2>
            <p className="text-gray-400 text-sm mt-1">Cargados estáticamente en el servidor de forma instantánea.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link 
              href={`/personaje/${char.id}`} 
              key={char.id} 
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 shadow-md hover:shadow-green-500/5 transition-all duration-300 flex flex-col h-full"
            >
              {/* Contenedor de la Imagen */}
              <div className="relative aspect-square overflow-hidden bg-gray-800">
                <Image 
                  src={char.image} 
                  alt={char.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              
              {/* Información del Personaje */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-green-400 transition-colors line-clamp-1">
                    {char.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-2 h-2 rounded-full ${char.status === 'Alive' ? 'bg-green-500' : char.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'}`} />
                    <p className="text-xs text-gray-400 font-medium truncate">
                      {char.status} — {char.species}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-800/60 flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                  <span>ID: {char.id}</span>
                  <span className="text-green-500/70 group-hover:text-green-400 transition-colors">Ver Detalles →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}