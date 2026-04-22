import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Feature } from "@/components/Feature";
import { Collection } from "@/components/Collection";
import { Atelier } from "@/components/Atelier";
import { Rooms } from "@/components/Rooms";
import { Reserve } from "@/components/Reserve";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Feature />
      <Collection />
      <Atelier />
      <Rooms />
      <Reserve />
    </>
  );
}
