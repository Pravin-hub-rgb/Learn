import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Contact Form</h1>
      <ContactForm />
    </main>
  )
}