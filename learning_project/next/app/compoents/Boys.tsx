import Circle from "../components/Circle";
import ScoreBox from "./ScoreBox";

export default function Boys() {
    return (
        <div className="bg-gray-300 grid grid-cols-[1fr_2fr] mt-20 p-10">
            <div className="flex justify-center items-center p-3">
                <img src="./boys.png" alt="The Boys TV show poster" className="rounded-lg" />
            </div>
            <div className="p-4">
                <div>
                    <h2 className="font-bold text-2xl">The Boys (2019)</h2>
                    <p>Sci-Fi & Fantasy and Action & Adventure</p>
                </div>
                <div className="flex">
                    <ScoreBox>84% User Score</ScoreBox>
                    <ScoreBox>🥹😅😍</ScoreBox>
                    <ScoreBox>What's your vibe?</ScoreBox>
                </div>
                <div className="flex">
                    <Circle />
                    <Circle />
                    <Circle />
                    <div className="flex items-center">
                        <p>Play Trailer</p>
                    </div>
                </div>
                <div>
                    <p>Never meet your heroes.</p>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold">Overview</h2>
                        <p>A group of vigilantes known informally as "The Boys" set out to take down corrupt superheroes
                            with no
                            more than blue-collar grit and a willingness to fight dirty.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold underline">Eric Kripke</h3>
                        <p>Creator</p>
                    </div>
                </div>
            </div>
        </div>
    )
}