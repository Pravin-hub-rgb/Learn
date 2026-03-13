export default function ScoreBox({children}: {children: React.ReactNode})
{
    return (
        <div className="rounded-4xl border p-2">
            <p>{children}</p>
        </div>
    )
}