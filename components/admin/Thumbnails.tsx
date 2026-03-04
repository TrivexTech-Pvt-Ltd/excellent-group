"use client";

/** Renders a project/client thumbnail safely on the client side
 *  (so we can use onError without crashing a Server Component). */
export function ProjectThumb({
    src,
    name,
}: {
    src: string;
    name: string;
}) {
    const isUrl = src.startsWith("http") || src.startsWith("/");

    if (!isUrl) {
        return (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs p-1 text-center leading-tight">
                {name[0]?.toUpperCase()}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                if (el.parentElement) {
                    el.parentElement.innerHTML = `<span class="text-zinc-500 text-xs">${name[0]?.toUpperCase()}</span>`;
                }
            }}
        />
    );
}

export function ClientThumb({
    src,
    name,
}: {
    src: string;
    name: string;
}) {
    const isUrl = src.startsWith("http") || src.startsWith("/");

    if (!isUrl) {
        return (
            <span className="font-bold text-base text-zinc-400">
                {name[0]?.toUpperCase()}
            </span>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            className="w-full h-full object-contain p-1"
            onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                if (el.parentElement) {
                    el.parentElement.innerHTML = `<span class="font-bold text-base text-zinc-400">${name[0]?.toUpperCase()}</span>`;
                }
            }}
        />
    );
}
