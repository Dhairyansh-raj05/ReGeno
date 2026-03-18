import React from "react";

const GAMES = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    price: "₹1,299",
    image: "/GTA5.png",
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    price: "₹1,999",
    image: "/RDR2.png",
  },
  {
    id: 3,
    title: "Spider-Man: Remastered",
    price: "₹1,499",
    image: "/SMR.png",
  },
  {
    id: 4,
    title: "Uncharted 4: A Thief's End",
    price: "₹1,199",
    image: "/UC4.png",
  },
  {
    id: 5,
    title: "Ghost of Tsushima",
    price: "₹1,099",
    image: "/GoT.png",
  },
  {
    id: 6,
    title: "Cyberpunk 2077",
    price: "₹1,599",
    image: "/CP.png",
  },
];

const Games: React.FC = () => {
  return (
    <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 py-10 flex flex-col gap-10">
      <div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
          Games Collection
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Find your next favorite adventure in our extensive game library.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {GAMES.map((game) => (
          <div
            key={game.id}
            className="group relative aspect-[3/4] bg-slate-100 dark:bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <p className="text-white font-bold text-sm line-clamp-2">
                {game.title}
              </p>
              <p className="text-primary text-base font-black mt-1">
                {game.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Games;
