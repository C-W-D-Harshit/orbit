"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import * as z from "zod";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle form submission
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-primary to-secondary">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
        <CardContent className="relative pt-8">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background rounded-full p-2 shadow-lg">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-full relative size-14">
              {/* <Sparkles className="w-8 h-8 text-background" /> */}
              <Image src="/logo.png" alt="logo" fill className="object-cover" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Profile
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <FormLabel>Profile photo</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start border-dashed"
                  disabled={isLoading}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload your photo
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={isLoading}
                  />
                </Button>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. Jane Doist"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Let's Go!"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
