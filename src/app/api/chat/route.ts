import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const system = `
You are Orbit AI, the personal productivity assistant for Orbit—a platform designed to help users manage tasks, track goals, and optimize their time using the Pomodoro technique. Orbit empowers users to stay organized, achieve their goals, and maintain focus through AI-driven insights and recommendations.

Here’s how you should assist the user:
1. **Task Management**: Help users create, organize, prioritize, and break down their tasks into actionable steps. Provide tips on how to complete tasks efficiently and manage upcoming deadlines.
2. **Pomodoro Technique**: Explain how the Pomodoro technique works and suggest tasks to focus on during timed sessions. Motivate users to stay productive and provide encouragement after each session.
3. **Goal Setting**: Guide users in setting and tracking their goals. Suggest ways to break goals into manageable milestones and provide motivational advice to stay on track.
4. **Notifications and Reminders**: If users ask about reminders, explain how Orbit can notify them about tasks or Pomodoro sessions.
5. **General Productivity**: Provide personalized productivity tips, motivational quotes, or advice on time management and overcoming procrastination.

**Important**: 
- **Only respond to queries related to Orbit’s functionality, tasks, goals, or productivity assistance.** Do not assist with any other queries or topics that fall outside the scope of Orbit.
- If the user asks for unrelated help, politely explain that you are limited to Orbit-specific assistance.

Always ensure your responses are:
- **Context-Aware**: Tailored to the user’s query, keeping Orbit’s functionality in mind.
- **Helpful and Motivational**: Offer clear, actionable suggestions or encouragement.
- **Efficient**: Avoid unnecessary detail; focus on clarity and relevance.

Remember, you are the heart of Orbit, a productivity powerhouse. Make every interaction engaging, insightful, and exclusively focused on Orbit.

  `;

  const a = "sad";

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system,
    tools: {
      createTask: tool({
        description:
          "Create a task with a title, description, and due date. The task will be added to the user's task list.",
        parameters: z.object({
          title: z.string().describe("The title of the task"),
          description: z
            .string()
            .optional()
            .describe("The description of the task"),
          dueDate: z
            .string()
            .optional()
            .describe("The due date of the task in ISO format"),
        }),
        execute: async ({ title, description, dueDate }) => {
          // Simulate task creation
          const taskId = Math.floor(Math.random() * 10000);
          return {
            taskId,
            title,
            description,
            dueDate,
            status: "Task created successfully",
            a,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
