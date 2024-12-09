"use client";

import { AddTodo, DeleteTodo, ToggleTodo } from "@/actions/todo";
import { UserButton } from "@clerk/nextjs";
import { Todo } from "@prisma/client";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TodoComponentType = {
  todo?: Todo[];
};

export function TodoComponent({ todo }: TodoComponentType) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function addTodo() {
    setIsLoading(true);

    const { error, success } = await AddTodo({
      title,
      description,
    });

    if (error) return setError(error);

    setTitle("");
    setDescription("");

    router.refresh();
    setIsLoading(false);
  }

  async function toggleTodo(id: number) {
    const { error, success } = await ToggleTodo({ id });

    if (error) return setError(error);

    router.refresh();
  }

  async function deleteTodo(id: number) {
    const { error, success } = await DeleteTodo({ id });

    if (error) return setError(error);

    router.refresh();
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <UserButton />
      </div>

      <div className="space-y-4 mb-6">
        <input
          placeholder="Add a new todo title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Add a description (optional)"
          className="textarea textarea-bordered w-full h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="btn btn-primary w-full"
          onClick={addTodo}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Add Todo"}
        </button>
      </div>

      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {error}</span>
        </div>
      )}

      <ul className="space-y-4">
        {todo?.map((todo) => (
          <li key={todo.id} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={todo.is_completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox checkbox-primary mr-2"
                />

                <h2
                  className={`card-title flex-grow ${
                    todo.is_completed && "line-through text-gray-500"
                  }`}>
                  {todo.title}
                </h2>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-error text-white size-7 p-1 btn-sm">
                  <Trash2 size={18} />
                </button>
              </div>
              {todo.description && (
                <div className="bg-base-200 p-3 rounded-lg mt-2">
                  <p className="text-sm">{todo.description}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
