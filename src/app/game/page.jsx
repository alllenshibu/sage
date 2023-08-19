import GameCard from "@/components/GameCard";

import Shoot from "@/assets/duck_shoot.jpeg";
import Reward from "@/assets/rewards.png";
import Collection from "@/assets/collections.jpg";

export default function Page() {
  return (
    <div className="min-h-[540px]">
      <h1 className="text-center my-8 text-3xl font-semibold">
        Today's specials
      </h1>
      <div className="flex flex-col gap-6 mb-28">
        <GameCard
          title="Shoot the duck"
          desc="Shoot the ducks to win the game"
          link="/game/shoot"
          img={Shoot}
        />
        <GameCard
          title="Claim daily reward"
          desc="All you need to do is click here and you can get the special reward"
          link="/game/reward"
          img={Reward}
        />
        <GameCard
          title="See collections"
          desc="See what you have collected so far and yes there is so much."
          link="/game/reward"
          img={Collection}
        />
      </div>
    </div>
  );
}
