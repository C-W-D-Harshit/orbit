import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// interface Task {
//   id: string;
//   title: string;
//   description?: string;
//   date?: string;
//   time?: string;
//   tags?: string[];
//   status: "pending" | "completed";
//   metadata?: string;
//   isOverdue?: boolean;
// }

export default function TasksPage() {
  const tasks = [
    {
      id: "1",
      title: "Create your first team project",
      description:
        "What's something big your team is working on? Create a project to keep all the tasks and deadlines organized in one place.",
      date: "21 Aug",
      status: "pending",
      metadata: "Set up your team / Start here...",
      isOverdue: true,
    },
    {
      id: "2",
      title: "Prepare Movie Night with Cousins",
      description: "Movie: Harry Potter...",
      date: "22 Aug",
      time: "15:00",
      tags: ["movie"],
      status: "pending",
      metadata: "Home 🏠 / Routines 📋",
      isOverdue: true,
    },
    {
      id: "3",
      title: "Add your team's logo",
      description:
        "Make your team feel at home by adding your logo in team settings.",
      date: "22 Aug",
      status: "pending",
      metadata: "Set up your team / Start here...",
      isOverdue: true,
    },
    {
      id: "4",
      title: "Do a weekly review of my tasks and goals",
      date: "Yesterday",
      status: "pending",
      metadata: "Home 🏠 / Routines 📋",
      isOverdue: true,
    },
    {
      id: "5",
      title: "Pre-Sprint Research",
      description:
        "Conduct any necessary research or gather existing data related to the problem or challenge that will be addressed during the s...",
      time: "14:00-15:30",
      tags: ["Sprint"],
      status: "pending",
      metadata: "Design Sprint / Pre-sprint prep",
    },
    {
      id: "6",
      title: "Adapt my work routines",
      description:
        "e.g.: perform daily shutdown routine, prepare weekly team meeting every Tuesday",
      status: "pending",
      metadata: "My work ❤️ / Routines 📋",
    },
    {
      id: "7",
      title: "Perform a workday shutdown routine 👋",
      tags: ["read"],
      status: "pending",
      metadata: "My work ❤️ / Inspiration ✨",
    },
    {
      id: "8",
      title: "Share Pre-Sprint Information",
      description:
        "Distribute relevant information and materials to participants prior to the sprint to ensure everyone is informed and prepared.",
      tags: ["Sprint"],
      status: "pending",
      metadata: "Design Sprint / Pre-sprint prep",
    },
  ];

  return (
    <div className="flex-1 bg-background text-foreground">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Today</h1>
          <div className="text-sm text-muted-foreground">8 tasks · 1h 30m</div>
        </div>

        <div className="space-y-6">
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="border-b">
                <p className="text-lg font-medium">Overdue</p>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-full">
                  {tasks
                    .filter((task) => task.isOverdue)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="group py-3 relative flex items-start gap-3"
                      >
                        <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary" />
                        <div className="min-w-0 flex-auto">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium leading-6">
                              {task.title}
                            </span>
                            {task.time && (
                              <span className="text-xs text-muted-foreground">
                                {task.time}
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {task.date}
                            </span>
                            {task.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {task.metadata && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {task.metadata}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="border-b">
                <p className="text-lg font-medium">26 Aug · Today · Monday</p>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-full">
                  {tasks
                    .filter((task) => !task.isOverdue)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="group py-3 relative flex items-start gap-3"
                      >
                        <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary" />
                        <div className="min-w-0 flex-auto">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium leading-6">
                              {task.title}
                            </span>
                            {task.time && (
                              <span className="text-xs text-muted-foreground">
                                {task.time}
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {task.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {task.metadata && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {task.metadata}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Button
          variant="ghost"
          className="mt-4 w-full justify-start text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </div>
    </div>
  );
}
