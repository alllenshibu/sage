import GameCard from "@/components/GameCard";

import Shoot from "@/assets/duck_shoot.jpeg";

export default function Page() {
  return (
    <div className="min-h-[540px]">
      <h1 className="text-center my-8 text-3xl font-semibold">
        Today's specials
      </h1>
      <div className="flex flex-col gap-2">
        <GameCard
          title="Shoot the duck"
          desc="Shoot the ducks to win the game"
          link="/game/shoot"
          img={Shoot}
        />
      </div>
    </div>
  );
}
