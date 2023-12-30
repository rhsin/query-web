import Listings from "@/components/Listings"
import QueryResults from "@/components/QueryResults"

export default function Home() {
  return (
    <main className="flex p-10">
      <div className="font-mono text-sm">
        <QueryResults />
        {/* <Listings /> */}
      </div>
    </main>
  )
}
