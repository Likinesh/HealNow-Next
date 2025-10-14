"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export async function adminVerify(data) {
    const {userId} = await auth();

    if(!userId) {
        return false;
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        });

        return user?.role === "ADMIN";
    } catch (error) {
        console.error("Error verifying admin:", error);
        return false;
    }
}

export async function pendingVerifications() {
    const isAdmin = await adminVerify();
    if (!isAdmin) {
        throw new Error("Not authorized");
    }
    
    try {
        const pendingDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "PENDING",
            },
            orderBy: {
                createdAt:"desc"
            }
        });

        return { doctors: pendingDoctors };
    } catch (error) {
        console.error("Error fetching pending verifications:", error);
        throw new Error("Failed to fetch pending verifications");
    }
}

export async function verifiedDoctors() {
    const isAdmin = await adminVerify();
    if(!isAdmin) {
        throw new Error("Not authorized");
    }
    
    try {
        const verifiedDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED",
            },
            orderBy: {
                createdAt:"asc"
            }
        });

        return { doctors: verifiedDoctors };
    } catch (error) {
        console.error("Error fetching verified doctors:", error);
        throw new Error("Failed to fetch verified doctors");
    }
}

export async function verifyDoctor(formData) {
    const isAdmin = await adminVerify();
    if(!isAdmin) {
        throw new Error("Not authorized");
    }

    const doctorId = formData.get("doctorId");
    const status = formData.get("status");

    if(!doctorId || !status) {
        throw new Error("Invalid form data");
    }

    try {
        await db.user.update({
            where: {
                id: doctorId
            },
            data: {
                verificationStatus: status
            }
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error updating verification status:", error);
        throw new Error("Failed to update verification status");
    }
}

export async function suspendDoctor(formData) {
    const isAdmin = await adminVerify();
    if(!isAdmin) {
        throw new Error("Not authorized");
    }

    const doctorId = formData.get("doctorId");
    const suspend = formData.get("suspend") === "true";
    if(!doctorId) {
        throw new Error("Invalid form data");
    }

    try {
        await db.user.update({
            where: {
                id: doctorId
            },
            data: {
                verificationStatus: suspend ? "PENDING" : "VERIFIED"
            }
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error updating suspension status:", error);
        throw new Error("Failed to update suspension status");
    }
}