import MarqueeSlider from '../components/MarqueeSlider'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Slider Testing Project
        </h1>
        <p className="text-center text-gray-600">
          Clean environment for testing different slider implementations
        </p>

        <div>
          <MarqueeSlider />
        </div>
      </div>
    </main>
  )
}
