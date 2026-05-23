import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6 py-12 text-white">
            <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl text-center">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-lg text-gray-300 mb-6">No se encontró el Pokémon que buscas.</p>
                <Link
                    href="/pokemon"
                    className="inline-flex rounded-full bg-purple-600 px-6 py-3 text-white font-semibold transition hover:bg-purple-500"
                >
                    Volver a la lista
                </Link>
            </div>
        </div>
    );
}
