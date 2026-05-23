// src/app/personaje/[id]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaTv, FaGlobe, FaDna, FaHeartbeat } from 'react-icons/fa';
import { Character } from '../../types'; // Reutilizamos tu types.ts para mantener limpio el archivo

export const revalidate = 864000; 

async function getCharacterData(id: string): Promise<Character> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) {
        throw new Error('Personaje no encontrado');
    }
    return res.json();
}

// CORRECCIÓN CLAVE: En Next 16/React 19, 'params' es un Promise obligatoriamente
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CharacterDetailPage({ params }: PageProps) {
    // 1. Desenvolvemos la promesa de los params antes de usarlos
    const resolvedParams = await params;
    const id = resolvedParams.id;

    let character: Character;

    try {
        character = await getCharacterData(id);
    } catch (error) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white p-4 md:p-12 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden md:flex">

                {/* Contenedor Imagen */}
                <div className="relative md:w-1/2 aspect-square md:aspect-auto min-h-[300px]">
                    <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Contenedor Detalles */}
                <div className="p-8 md:w-1/2 flex flex-col justify-between">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-green-400 hover:underline mb-4 group">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Regresar al Laboratorio
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-green-400">{character.name}</h1>

                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-center gap-3">
                                <FaHeartbeat className={character.status === 'Alive' ? 'text-green-400' : character.status === 'Dead' ? 'text-red-400' : 'text-gray-400'} />
                                <span><strong className="text-white">Estado:</strong> {character.status}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaDna className="text-blue-400" />
                                <span><strong className="text-white">Especie/Género:</strong> {character.species} ({character.gender})</span>
                            </div>
                            {character.type && (
                                <div className="flex items-center gap-3">
                                    <span className="text-purple-400 font-bold text-sm bg-purple-500/10 px-1.5 rounded">T</span>
                                    <span><strong className="text-white">Tipo:</strong> {character.type}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <FaGlobe className="text-yellow-500" />
                                <span><strong className="text-white">Origen:</strong> {character.origin.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaGlobe className="text-orange-500" />
                                <span><strong className="text-white">Ubicación Actual:</strong> {character.location.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaTv className="text-pink-400" />
                                <span><strong className="text-white">Aparición en Episodios:</strong> {character.episode.length} capítulos</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-800 text-xs text-gray-500">
                        Sincronizado el: {new Date(character.created).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </main>
    );
}

// Generador de rutas estáticas óptimo para la compilación en Vercel
export async function generateStaticParams() {
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        if (!res.ok) return [];

        const data = await res.json();
        return data.results.map((char: any) => ({
            id: char.id.toString(),
        }));
    } catch (error) {
        console.error("Error generando rutas estáticas en la build", error);
        return [];
    }
}