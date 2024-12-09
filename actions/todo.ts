"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

type AddTodoType = {
  title: string;
  description?: string;
};

export async function AddTodo({ title, description }: AddTodoType) {
  try {
    const { userId } = await auth();

    if (!userId) return { error: "Not Authenticated" };

    await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return { success: "Data added successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function GetTodo() {
  try {
    const { userId } = await auth();

    if (!userId) return { error: "Not Authenticated" };

    const todo = await prisma.todo.findMany({
      where: {
        userId,
      },
      // order by created_at in descending order
      orderBy: {
        created_at: "desc",
      },
    });

    return { todo };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function ToggleTodo({ id }: { id: number }) {
  try {
    const { userId } = await auth();

    if (!userId) return { error: "Not Authenticated" };

    // check if the user is the owner of the todo item

    const isTheOwner = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!isTheOwner) return { error: "Not Authenticated" };

    await prisma.todo.update({
      data: {
        is_completed: !isTheOwner.is_completed,
      },
      where: {
        id,
        userId,
      },
    });

    return { success: "Todo Toggled successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function DeleteTodo({ id }: { id: number }) {
  try {
    const { userId } = await auth();

    if (!userId) return { error: "Not Authenticated" };

    // check if the user is the owner of the todo item

    const isTheOwner = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!isTheOwner) return { error: "Not Authenticated" };

    await prisma.todo.delete({
      where: {
        id,
        userId,
      },
    });

    return { success: "Todo deleted successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
