"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import { UploadButton } from "@/src/utils/uploadthing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon } from "lucide-react";
// import { toast } from "sonner";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  //   onFileSelect, // New prop to handle file selection
  valueStr,
  isLoading = false,
  files,
  //   setFiles,
  disabled,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileSelect?: (file: File) => void; // Optional prop
  valueStr?: string;
  isLoading?: boolean;
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?: boolean;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 5000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholders]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 200;
  const btnRef = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState(valueStr ?? "");
  const [animating, setAnimating] = useState(false);

  const handleInput = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`; // Set new height but limit it to maxHeight
    }
  };

  // const { selectionStart, selectionEnd, value } = textarea;
  // // Insert newline where the cursor is
  // textarea.value =
  //   value.substring(0, selectionStart) + "\n" + value.substring(selectionEnd);
  // // Move the cursor to the next line
  // textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  // setValue(textarea.value); // Update the state with the new value

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Function to check if the device is mobile
    const isMobileDevice = () => {
      return /Mobi|Android/i.test(navigator.userAgent);
    };
    if (e.key === "Enter" && !e.shiftKey && !animating) {
      if (!isMobileDevice()) {
        e.preventDefault(); // Prevents adding a new line
        vanishAndSubmit();
      }
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
      // Invoke onSubmit after the animation completes
      btnRef.current?.click();
      // Reset the textarea height here after submission
      if (inputRef.current) {
        inputRef.current.style.height = "auto"; // Reset to auto
        inputRef.current.value = ""; // Optionally clear the value, if needed
      }
      setTimeout(() => {
        // Reset the textarea height here after submission
        if (inputRef.current) {
          setValue(""); // Clear state if appropriate
        }
      }, 1000); // Adjust the timeout duration as per your animation duration
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onSubmit && onSubmit(e);
  };
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  console.log(files);

  return (
    <div className="w-full">
      <form
        className={cn(
          "w-full relative mx-auto flex items-center bg-white dark:bg-background drop-shadow-xl border border-border min-h-12 rounded-3xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
          value && "bg-gray-50"
        )}
        onSubmit={handleSubmit}
      >
        <canvas
          className={cn(
            "absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 sm:left-8 ml-8 lg:ml-3 origin-top-left filter invert dark:invert-0 pr-20",
            !animating ? "opacity-0" : "opacity-100"
          )}
          ref={canvasRef}
        />
        {/* Hidden File Input */}
        {/* <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      /> */}

        {/* Attach Icon Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={handleAttachClick}
              className="absolute left-3 w-20 px-1 transform z-50"
            >
              <FileIcon size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                toast.success("File uploaded successfully");
                // setFiles(res.map((file) => file.url));
                setFiles((prev) => res.map((file) => file.url));
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: {},
              }}
              // className="hidden"
            /> */}
          </DropdownMenuContent>
        </DropdownMenu>

        <textarea
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              handleInput();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onChange && onChange(e);
            }
          }}
          name="input"
          rows={1}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          style={{
            maxHeight: `${maxHeight}px`, // Limit the height
          }}
          disabled={disabled}
          // type="text"
          className={cn(
            "w-full ml-12 resize-none pr-24 h-auto min-h-6 relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black  focus:outline-none focus:ring-0 pl-0.5",
            animating && "text-transparent dark:text-transparent"
          )}
        />

        <button
          disabled={!value || isLoading}
          type="submit"
          ref={btnRef}
          className="absolute right-2 z-50 h-8 w-8 rounded-full disabled:bg-gray-100 bg-accent dark:disabled:bg-accent/80 transition duration-200 flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-foreground h-4 w-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
              d="M5 12l14 0"
              initial={{
                strokeDasharray: "50%",
                strokeDashoffset: "50%",
              }}
              animate={{
                strokeDashoffset: value ? 0 : "50%",
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
            />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </motion.svg>
        </button>

        <div className="absolute inset-0 left-8 lg:left-0 flex items-center rounded-full pointer-events-none">
          <AnimatePresence mode="wait">
            {!value && (
              <motion.p
                initial={{
                  y: 5,
                  opacity: 0,
                }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -15,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }}
                className="text-sm sm:text-base font-normal text-accent-foreground/60 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
