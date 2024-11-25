"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

export function TaskCard({
  title,
  description,
  dueDate,
  priority,
}: TaskCardProps) {
  const priorityColor = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="truncate">{title}</span>
            <Badge className={priorityColor[priority]}>{priority}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Due: {dueDate}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/tasks">
              <span className="flex items-center justify-center">
                Go to Tasks
                <ChevronRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
