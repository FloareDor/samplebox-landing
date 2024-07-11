import { useState } from "react";
import { Button } from "@/components/ui/button";
import YouTubeEmbed from "@/components/YoutubeEmbed";

const Home = () => {
  const [inputState, setInputState] = useState("initial");
  const [email, setEmail] = useState("");

  const handleButtonClick = () => {
    setInputState("active");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setInputState("submitted");
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="dark bg-black text-white min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center opacity-80" />
      <div className="container max-w-3xl px-8 py-2 md:py-2 space-y-8 text-center relative z-10">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex justify-center">
            {inputState === "active" ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-black text-white placeholder:text-zinc-400 px-8 py-3 rounded-3xl text-sm outline-none font-semibold focus:shadow-2xl"
                autoFocus
              />
            ) : inputState === "initial" ? (
              <Button
                type="button"
                onClick={handleButtonClick}
                className="bg-zinc-950 text-zinc-400 px-8 py-3 rounded-3xl text-sm outline-none font-semibold hover:bg-zinc-950 focus:shadow-2xl"
              >
                Join the Waitlist
              </Button>
            ) : (
              <div className="bg-zinc-950 text-zinc-400 px-8 py-3 rounded-3xl text-sm font-semibold">
                Thanks! We'll keep you posted.
              </div>
            )}
          </form>
          
          <h1 className={`text-4xl md:text-6xl font-bold tracking-tight font-heading`}>SampleBox</h1>
          <div className="flex flex-col gap-0 items-center">
            <p className="text-lg md:text-xl text-muted-foreground font-body">
              drop a song and get a sample box.
            </p>
            <p className="text-lg md:text-xl text-zinc-400 font-body">
              includes stems, drums, loops and wonky ideas made from
              that song.
            </p>
          </div>
        </div>

        <YouTubeEmbed embedUrl="https://www.youtube.com/embed/QCLmfS77B3I?si=msjU71YW6YuT_L6q" />
      </div>
    </div>
  );
};

export default Home;