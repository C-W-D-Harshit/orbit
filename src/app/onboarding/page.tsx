"use client";

import { useState, useCallback } from "react";
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
import { Upload, X } from "lucide-react";
import * as z from "zod";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { onboardUserAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  photo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [dataURI, setDataURI] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUserStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      photo: null,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setPhoto(acceptedFiles[0]);
        form.setValue("photo", acceptedFiles[0]);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const removePhoto = () => {
    setPhoto(null);
    form.setValue("photo", null);
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const toastId = toast.loading("Creating your profile...");

    try {
      const res = await onboardUserAction(
        values.name,
        values.photo,
        user?.email as string
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message, { id: toastId });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error onboarding user:", error);
      toast.error("Error onboarding user", { id: toastId });
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
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary" : "border-muted"
                  }`}
                >
                  <input {...getInputProps()} />
                  {photo ? (
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={URL.createObjectURL(photo)}
                        alt="Profile"
                        fill
                        className="object-cover rounded-full"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto();
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p>Drag & drop your photo here, or click to select</p>
                    </div>
                  )}
                </div>
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
