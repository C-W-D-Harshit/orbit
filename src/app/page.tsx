/* eslint-disable react/no-unescaped-entities */
import { ListIcon, RocketIcon, TimerIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import InputComp from "./_components/InputComp";

interface Suggestion {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

const suggestions: Suggestion[] = [
  {
    icon: <RocketIcon className="h-5 w-5" />,
    title: "Top Goals for the Week",
    subtitle: "Set and track your priorities",
  },
  {
    icon: <TimerIcon className="h-5 w-5" />,
    title: "Start a Pomodoro Session",
    subtitle: "Boost your focus and productivity",
  },
  {
    icon: <ListIcon className="h-5 w-5" />,
    title: "Review Pending Tasks",
    subtitle: "Finish what's left undone",
  },
];

export default function page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-between ">
      {/* Welcome Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-0.5 lg:space-y-3">
        <div>
          <div className="p-6 mb-3 rounded-full bg-primary/10">
            <RocketIcon className="size-12 text-primary" />
          </div>
        </div>
        <h1 className="lg:text-4xl text-2xl font-bold tracking-tight">
          Welcome to Orbit
        </h1>
        <h2 className="lg:text-2xl text-xl font-medium">
          Ready to track your goals?
        </h2>
        <p className="lg:text-lg text-sm font-medium text-muted-foreground max-w-md">
          Manage your tasks, set meaningful goals, and stay focused with Orbit's
          AI-driven productivity tools. Let's achieve more together!
        </p>
      </div>

      {/* Suggestions Grid */}
      <div className="w-full max-w-md sm:max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6">
        {suggestions.map((suggestion, index) => (
          <Card
            key={index}
            className="p-4 hover:bg-accent transition-colors cursor-pointer flex flex-row sm:flex-col items-center text-left sm:text-center space-x-4 sm:space-x-0 sm:space-y-2"
          >
            <div className="p-2 rounded-full bg-primary/10 shrink-0">
              {suggestion.icon}
            </div>
            <div>
              <p className="font-medium text-sm">{suggestion.title}</p>
              <p className="text-xs text-muted-foreground">
                {suggestion.subtitle}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Input Section */}
      <InputComp />
    </div>
  );
}
