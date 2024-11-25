"use client";

import * as React from "react";
import { Calendar, Clock, Flag, PlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddTask() {
  const [taskName, setTaskName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ taskName, description });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none">
        <DialogTitle className="sr-only">Add task</DialogTitle>
        <Card className="w-full">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <Input
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="border-0 p-0 text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0"
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-0 p-0 text-muted-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 resize-none min-h-[100px]"
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Due date
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Priority
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Reminders
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Select defaultValue="inbox">
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue placeholder="Select list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbox">📥 Inbox</SelectItem>
                    <SelectItem value="personal">👤 Personal</SelectItem>
                    <SelectItem value="work">💼 Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <DialogClose>
                  <Button type="button" variant="ghost" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" size="sm" variant={"default"}>
                  Add task
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
