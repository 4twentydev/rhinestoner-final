import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Todo = Database["public"]["Tables"]["todos"]["Row"];

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch of todos
    fetchTodos();

    // Set up real-time subscription
    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTodos((current) => [...current, payload.new as Todo]);
          } else if (payload.eventType === "DELETE") {
            setTodos((current) =>
              current.filter((todo) => todo.id !== payload.old.id)
            );
          } else if (payload.eventType === "UPDATE") {
            setTodos((current) =>
              current.map((todo) =>
                todo.id === payload.new.id ? { ...todo, ...payload.new } : todo
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (data) setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const { error } = await supabase.from("todos").insert([
        {
          title: newTodo.trim(),
          user_id: (await supabase.auth.getUser()).data.user?.id,
          completed: false,
        },
      ]);

      if (error) throw error;
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  async function toggleTodo(todo: Todo) {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", todo.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-2 border rounded"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo)}
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
            <Button
              variant="destructive"
              size="sm"
              className="ml-auto"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
