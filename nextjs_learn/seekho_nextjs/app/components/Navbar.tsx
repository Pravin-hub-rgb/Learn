export default function Navbar()
{
    return (
        <nav className="border rounded-2xl flex">
            <div className="m-2 border p-2 rounded-2xl">
                <h2>Seekho Nextjs</h2>
            </div>
            <div className="flex m-2 border p-2 rounded-2xl">
                <p>Learn HTML</p>
                <p>Learn CS</p>
            </div>
            <div className="flex m-2 p-2 rounded-2xl text-red-300">
                <p>Navbar Component</p>
            </div>
        </nav>
    )
}