import type { Metadata } from "next";
import { StarfallProfile } from "./starfall-profile";

export const metadata: Metadata = {
  title: "CADENCE // STARFALL | Chapter 8",
  description: "A recovered music profile, an unfinished project, and the songs that found their way home.",
};

export default function Home() {
  return <StarfallProfile />;
}
