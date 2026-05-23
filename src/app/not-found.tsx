import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-zinc-950 text-white px-6 py-12 relative overflow-hidden">
            {/* Efecto de luz roja de fondo (Glow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-md w-full text-center rounded-3xl border border-white/[0.08] bg-zinc-900/50 backdrop-blur-md p-10 shadow-2xl">
                {/* Indicador visual o decoración superior */}
                <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <span className="text-2xl text-red-500 font-mono">?</span>
                </div>

                <h1 className="text-7xl font-extrabold tracking-tight mb-2 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                    404
                </h1>
                
                <h2 className="text-xl font-semibold mb-3 text-zinc-200">
                    Pokémon No Encontrado
                </h2>
                
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                    El Pokémon o la página que estás buscando no existe en nuestra base de datos o fue movido.
                </p>

                <Link
                    href="/pokemon"
                    className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:from-red-500 hover:to-rose-400 hover:shadow-red-500/30 active:scale-[0.98]"
                >
                    Volver a Pokémon
                </Link>
            </div>
        </div>
    );
}