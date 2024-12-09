import { GetTodo } from "@/actions/todo";
import { TodoComponent } from "@/components/TodoComponent";

export default async function DashboardPage() {
  const { error, todo } = await GetTodo();
  if (error) return <div>Something went wrong</div>;

  return <TodoComponent todo={todo} />;
}
