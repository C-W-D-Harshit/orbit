"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "ai";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export default function ChatInterface({ messages }: { messages: Message[] }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
              <motion.div
                className={`inline-block py-5 px-6 rounded-lg  ${
                  message.role === "user"
                    ? "bg-card text-card-foreground text-left whitespace-pre-wrap"
                    : "bg-muted"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Markdown
                  className={cn(
                    "prose dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/70 prose-code:text-primary prose-pre:bg-muted prose-pre:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground"
                  )}
                  // remarkPlugins={[remarkGfm]}
                  // rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    h1: ({ node, ...props }) => <h1 className="" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="" {...props} />,
                    p: ({ node, ...props }) => <p className="" {...props} />,
                    ul: ({ node, ...props }) => <ul className="" {...props} />,
                    ol: ({ node, ...props }) => <ol className="" {...props} />,
                    li: ({ node, ...props }) => <li className="" {...props} />,
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
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </ScrollArea>
    </div>
  );
}
