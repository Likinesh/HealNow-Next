"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setUserRole(formData) {
  const { userId } = await auth();
  // console.log(userId);
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found in the database");
  }

  const role = formData.get("role");
  if (!role || (role !== "DOCTOR" && role !== "PATIENT")) {
    throw new Error("Invalid role selected");
  }

  try {
    if (role === "DOCTOR") {
      const speciality = formData.get("speciality");
      const experience = parseInt(formData.get("experience"), 10);
      const credentialUrl = formData.get("credentialUrl");
      const description = formData.get("description");

      // Validate inputs
      if (!speciality || !experience || !credentialUrl || !description) {
        throw new Error("All fields are required");
      }

      await db.user.update({
        where: {
          clerkUserId: userId,
        },
        data: {
          role: "DOCTOR",
          speciality,
          experience,
          credentialUrl,
          description,
          verificationStatus: "PENDING",
        },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctor/verification" };
    }
    if (role === "PATIENT") {
      await db.user.update({
        where: { clerkUserId: userId },
        data: {
          role: "PATIENT",
        },
      });

      revalidatePath("/");
      return { success: true, redirect: "/doctors" };
    }
  } catch (error) {
    console.error("Error creating user role:", error);
    throw new Error("Failed to create user role");
  }
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to get user information:", error);
    return null;
  }
}