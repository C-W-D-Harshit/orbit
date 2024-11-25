"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "orbit/user",
  });
  return res;
}

export const onboardUserAction = async (
  username: string,
  photo: File,
  email: string
) => {
  console.log("onboardUserAction");
  console.log(photo);
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not authenticated");
    }

    const user = session.user;
    const userId = user?.id as string;

    const arrayBuffer = await photo.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataURI = `data:${photo.type};base64,${base64}`;
    console.log(dataURI);
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes);
    console.log(userId);

    await prisma.user.update({
      where: { email, isOnboarded: false },
      data: {
        username,
        isOnboarded: true,
        profile: {
          create: {
            avatarUrl: cldRes.secure_url,
            publicId: cldRes.public_id,
          },
        },
      },
    });

    return {
      success: true,
      message: "User onboarded successfully",
    };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return {
      success: false,
      message: "Error onboarding user",
    };
  }
};
