"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/input-box";
import React, { useState } from "react";
import { useCompletion } from "ai/react";
import { Attachment, ChatRequestOptions, JSONValue, ToolInvocation } from "ai";

const placeholders = [
  "What are your top priorities today?",
  "Set a goal to achieve this week!",
  "How can you make progress on your project?",
  "Start a Pomodoro session for deep focus.",
  "What tasks do you need to complete tomorrow?",
];

export default function InputComp({
  handleSubmit,
  handleInputChange,
}: {
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="w-full max-w-3xl flex justify-center items-center gap-2 backdrop-blur-sm h-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e) => handleInputChange(e)}
        onSubmit={handleSubmit}
        isLoading={false}
        files={[]}
        setFiles={() => {}}
        disabled={false}
      />
    </div>
  );
}
