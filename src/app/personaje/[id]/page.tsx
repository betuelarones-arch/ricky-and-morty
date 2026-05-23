import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaTv, FaGlobe, FaDna, FaHeartbeat } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 864000;

interface CharacterResponse {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    created: string;
}

async function getCharacterData(id: string): Promise<CharacterResponse> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) {
        return Promise.reject(new Error('Personaje no encontrado'));
    }
    return res.json();
}

export default async function CharacterDetailPage({ params }: { params: { id: string } }) {
    let character: CharacterResponse;

    try {
        character = await getCharacterData(params.id);
    } catch (error) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white p-4 md:p-12 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden md:flex">

                <div className="relative md:w-1/2 aspect-square md:aspect-auto min-h-[300px]">
                    <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="p-8 md:w-1/2 flex flex-col justify-between">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-green-400 hover:underline mb-4">
                            <FaArrowLeft /> Regresar
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
                                    <span className="text-purple-400 font-bold">T</span>
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
                        Creado en BD: {new Date(character.created).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </main>
    );
}

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