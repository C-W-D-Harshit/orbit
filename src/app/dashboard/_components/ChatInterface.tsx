"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "ai";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import Image from "next/image";

export default function ChatInterface({
  messages,
  status,
}: {
  messages: Message[];
  status: "in_progress" | "awaiting_message";
}) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  console.log(messages);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={cn("flex items-start gap-3", {
                  "justify-end": message.role === "user",
                })}
              >
                {message.role === "assistant" && (
                  <div className="size-8 relative rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Image src={"/logo.png"} fill alt="avatar" />
                  </div>
                )}
                <motion.div
                  className={`py-5 px-6 rounded-lg flex flex-col gap-3 ${
                    message.role === "user"
                      ? "bg-card text-card-foreground text-left whitespace-pre-wrap"
                      : "bg-muted"
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {message.toolInvocations ? (
                    <pre>
                      {JSON.stringify(message.toolInvocations, null, 2)}
                    </pre>
                  ) : (
                    <Markdown
                      className={cn(
                        "prose dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/70 prose-code:text-primary prose-pre:bg-muted prose-pre:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground"
                      )}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="" {...props} />
                        ),
                        code: ({ node, className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <pre className="p-4 rounded-lg overflow-x-auto">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          ) : (
                            <code
                              className="bg-muted px-1 py-0.5 rounded"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto mb-4">
                            <table
                              className="min-w-full divide-y divide-muted"
                              {...props}
                            />
                          </div>
                        ),
                        th: ({ node, ...props }) => (
                          <th
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            {...props}
                          />
                        ),
                        td: ({ node, ...props }) => (
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </Markdown>
                  )}
                  {message.role === "data" && (
                    <pre className={"bg-gray-200"}>
                      {JSON.stringify(message.data, null, 2)}
                    </pre>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {status === "in_progress" &&
            messages[messages.length - 1].role === "data" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
                className="flex items-start space-x-3 text-left mb-6"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
                  <svg className="size-3 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Thinking</span>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </ScrollArea>
    </div>
  );
}
