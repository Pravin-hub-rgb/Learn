interface HeroProps {
    title: string;
    subtitle: string;
    author?: string
}
export default function HeroSection({title, subtitle, author}: HeroProps) {

    return (
        <section className="p-10 text-center bg-[#B0f0f0] text-black rounded-2xl my-5">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {author && <div>{author}</div> }
            <button className="px-5 py-2.5 bg-[#0070f3] text-white border-none rounded-md">
                Aur Jaano
            </button>
        </section>
    )
}