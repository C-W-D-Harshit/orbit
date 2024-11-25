"use client";

/* eslint-disable react/no-unescaped-entities */
import { ListIcon, RocketIcon, TimerIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import InputComp from "./_components/InputComp";
import React from "react";
import ChatInterface from "./_components/ChatInterface";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "ai/react";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-1 flex-col items-center mb-16 justify-between ">
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <React.Fragment>
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-0.5 lg:space-y-3"
            >
              <div>
                <motion.div
                  className="p-6 mb-3 rounded-full bg-primary/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <RocketIcon className="size-12 text-primary" />
                </motion.div>
              </div>
              <motion.h1
                className="lg:text-4xl text-2xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome to Orbit
              </motion.h1>
              <motion.h2
                className="lg:text-2xl text-xl font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Ready to chat with AI?
              </motion.h2>
              <motion.p
                className="lg:text-lg text-sm font-medium text-muted-foreground max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Ask questions, get insights, and boost your productivity with
                Orbit's AI-driven chat interface. Let's achieve more together!
              </motion.p>
            </motion.div>
            {/* Suggestions Grid */}
            <motion.div
              className="w-full max-w-md sm:max-w-3xl mb-32 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 pb-6 lg:pb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {suggestions.map((suggestion, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-4 hover:bg-accent lg:h-32 transition-colors cursor-pointer flex flex-row sm:flex-col items-center text-left sm:text-center space-x-4 sm:space-x-0 sm:space-y-2">
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
                </motion.div>
              ))}
            </motion.div>
          </React.Fragment>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl flex-1 overflow-hidden flex flex-col"
          >
            <ChatInterface messages={messages} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Input Section */}
      <div className="w-full flex justify-center items-center h-32 fixed bottom-0 px-6 lg:px-0">
        <InputComp
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
