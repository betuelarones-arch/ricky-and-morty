// src/app/buscar/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { Character } from '../types'; // Importación limpia desde tus tipos globales

export default function SearchPage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchFilteredCharacters = async () => {
            setLoading(true);

            // Uso de URLSearchParams nativo para armar URLs seguras y codificadas
            const params = new URLSearchParams();
            if (name) params.append('name', name);
            if (status) params.append('status', status);
            if (gender) params.append('gender', gender);
            if (type) params.append('type', type);

            const queryString = params.toString();
            const query = `https://rickandmortyapi.com/api/character/${queryString ? `?${queryString}` : ''}`;

            try {
                const res = await fetch(query);
                if (res.ok) {
                    const data = await res.json();
                    setCharacters(data.results || []);
                } else {
                    // La API de Rick and Morty responde con un 404 HTTP si no hay coincidencias
                    setCharacters([]); 
                }
            } catch (error) {
                console.error("Error fetching data", error);
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };

        // El Debounce evita saturar la API externa por cada letra presionada
        const delayDebounceFn = setTimeout(() => {
            fetchFilteredCharacters();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [name, status, gender, type]);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-6 md:p-12 selection:bg-green-500 selection:text-black">
            <div className="max-w-6xl mx-auto">
                {/* Botón Volver con micro-interacción */}
                <Link href="/" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 transition-colors group text-sm font-medium">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </Link>

                <h1 className="text-3xl md:text-4xl font-black mb-8 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Buscador Avanzado (CSR)
                </h1>

                {/* Grid de Inputs de Filtros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Nombre</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Ej: Rick..." 
                                className="w-full bg-gray-800 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-green-500 text-sm text-white transition-all" 
                            />
                            <FaSearch className="absolute left-3.5 top-3.5 text-gray-500 text-xs" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Estado</label>
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)} 
                            className="w-full bg-gray-800 border border-gray-700/50 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500 text-sm text-white transition-all appearance-none"
                        >
                            <option value="">Todos</option>
                            <option value="alive">Vivo</option>
                            <option value="dead">Muerto</option>
                            <option value="unknown">Desconocido</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Género</label>
                        <select 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)} 
                            className="w-full bg-gray-800 border border-gray-700/50 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500 text-sm text-white transition-all"
                        >
                            <option value="">Todos</option>
                            <option value="female">Femenino</option>
                            <option value="male">Masculino</option>
                            <option value="genderless">Sin Género</option>
                            <option value="unknown">Desconocido</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Tipo</label>
                        <input 
                            type="text" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} 
                            placeholder="Ej: Parasite..." 
                            className="w-full bg-gray-800 border border-gray-700/50 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500 text-sm text-white transition-all" 
                        />
                    </div>
                </div>

                {/* Renderizado de Resultados condicionales */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-green-400 gap-3 font-medium">
                        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                        <span>Escaneando el multiverso...</span>
                    </div>
                ) : characters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {characters.map((char) => (
                            <Link 
                                href={`/personaje/${char.id}`} 
                                key={char.id} 
                                className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 shadow-md hover:shadow-green-500/5 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-800">
                                    <Image 
                                        src={char.image} 
                                        alt={char.name} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 25vw" 
                                        loading="lazy" 
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="font-bold text-base text-gray-100 group-hover:text-green-400 transition-colors line-clamp-1">{char.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${char.status === 'Alive' ? 'bg-green-500' : char.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'}`} />
                                            <p className="text-xs text-gray-400 font-medium truncate">
                                                {char.species} {char.type && `— ${char.type}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-800/60 text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex justify-between">
                                        <span>ID: {char.id}</span>
                                        <span className="text-green-500/70 group-hover:text-green-400 transition-colors">Detalles →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20 border border-dashed border-gray-800 rounded-2xl text-base">
                        No se encontraron dimensiones con esos criterios de búsqueda.
                    </div>
                )}
            </div>
        </main>
    );
}