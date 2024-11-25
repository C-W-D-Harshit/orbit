"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // Show splash screen for 3 seconds

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(splashTimer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <AnimatePresence>
      {isSplashVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              className="h-32 w-32 rounded-full border-t-4 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="size-16 relative">
                <Image
                  src="/static/logo.png"
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          <span className="sr-only">Loading application...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
