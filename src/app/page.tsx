import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[100vh] relative w-full bg-[url('https://y8whjpz4je.ufs.sh/f/yREVVaIBli4pJifaJKzlMz1A6dpgLNHRKDanZvOktXfIiuqE')]">
      <div className="absolute inset-0 bg-black/60 z-20" />
      <main className="max-w-6xl text-white relative mx-auto min-h-screen z-30">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full h-screen">
          <section className="flex-1 flex flex-col gap-3 h-full justify-center">
            <h2 className="text-white font-semibold text-3xl lg:text-5xl">This is a header title for the repair shop</h2>
            <p>Thinkk about this later for content and SEO</p>
          </section>
          <section className="flex-1 flex flex-col gap-3 h-full justify-center">
            <Card className="bg-white/10 backdrop-blur-md border-none bg-clip-padding backdrop-filter">
              <CardContent className="flex flex-col items-center justify-center gap-3">
                <p className="font-header text-xl font-semibold text-white/70 tracking-wide uppercase">spidey@fixmate.com</p>
                <p className="font-header font-medium text-gray-200 tracking-wider uppercase">12345678</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
