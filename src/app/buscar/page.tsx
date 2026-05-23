'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    type: string;
    image: string;
}

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
            let query = `https://rickandmortyapi.com/api/character/?`;
            if (name) query += `name=${name}&`;
            if (status) query += `status=${status}&`;
            if (gender) query += `gender=${gender}&`;
            if (type) query += `type=${type}&`;

            try {
                const res = await fetch(query);
                if (res.ok) {
                    const data = await res.json();
                    setCharacters(data.results);
                } else {
                    setCharacters([]); 
                }
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchFilteredCharacters();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [name, status, gender, type]);

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 transition-colors">
                    <FaArrowLeft /> Volver al Inicio
                </Link>

                <h1 className="text-3xl font-extrabold mb-8 text-green-400">Buscador Avanzado (CSR)</h1>

                {/* Inputs de Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nombre</label>
                        <div className="relative">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Rick..." className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Estado</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-white">
                            <option value="">Todos</option>
                            <option value="alive">Vivo</option>
                            <option value="dead">Muerto</option>
                            <option value="unknown">Desconocido</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Género</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-white">
                            <option value="">Todos</option>
                            <option value="female">Femenino</option>
                            <option value="male">Masculino</option>
                            <option value="genderless">Sin Género</option>
                            <option value="unknown">Desconocido</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Tipo</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Ej: Parasite..." className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-white" />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-xl text-green-400 py-12">Buscando en el multiverso...</div>
                ) : characters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {characters.map((char) => (
                            <Link href={`/personaje/${char.id}`} key={char.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300">
                                <div className="relative aspect-square">
                                    <Image src={char.image} alt={char.name} fill sizes="25vw" loading="lazy" className="object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg truncate">{char.name}</h3>
                                    <p className="text-sm text-gray-400">{char.species} {char.type && `(${char.type})`}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-12 text-lg">No se encontraron dimensiones con esos criterios.</div>
                )}
            </div>
        </main>
    );
}