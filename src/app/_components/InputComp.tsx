"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/input-box";
import React from "react";

const placeholders = [
  "What are your top priorities today?",
  "Set a goal to achieve this week!",
  "How can you make progress on your project?",
  "Start a Pomodoro session for deep focus.",
  "What tasks do you need to complete tomorrow?",
];

export default function InputComp() {
  return (
    <div className="w-full max-w-2xl flex gap-2">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => console.log(e.target.value)}
        onSubmit={() => {}}
        isLoading={false}
        files={[]}
        setFiles={() => {}}
        disabled={false}
      />
    </div>
  );
}
