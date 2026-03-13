import MagnetLines from "./MagentLines"
import Orb from "./Orb"

export default function Home() {
    return (

        <div style={{ width: '100%', height: '800px', position: 'relative' }}>
            <Orb
                hoverIntensity={0.5}
                rotateOnHover
                hue={0}
                forceHoverState={false}
                backgroundColor="#000000"
            />
        </div>
    )
}
