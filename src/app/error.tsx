'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error de la aplicación:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6 py-12 text-white">
            <div className="max-w-xl rounded-3xl border border-red-500/20 bg-black/70 p-10 shadow-2xl">
                <h1 className="text-4xl font-bold text-red-400 mb-4">¡Error inesperado!</h1>
                <p className="text-gray-300 mb-6">Algo falló en la aplicación. Intenta recargar o vuelve a intentarlo.</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => reset()}
                        className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        </div>
    );
}
