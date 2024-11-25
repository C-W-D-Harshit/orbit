import { prisma } from "@/lib/prisma";
import { TaskPriority } from "@prisma/client";

export async function handleCreateTask(
  parameters: {
    title: string;
    description?: string;
    priority?: TaskPriority;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
    dueDate?: string;
    tags?: string[];
  },
  userEmail: string
) {
  const {
    title = "Untitled Task",
    description = "No description provided",
    priority = "MEDIUM",
    status = "TODO",
    dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default due date is 7 days from now in ISO format
  } = parameters;

  console.log("Creating task with parameters:", parameters);

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        dueDate: new Date(dueDate),
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true,
        dueDate: true,
        tags: true,
      },
    });

    console.log("Task created successfully:", task);

    return {
      success: true,
      message: "Task created successfully!",
      task,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: "Failed to create task.",
      error: (error as Error).message,
    };
  }
}
