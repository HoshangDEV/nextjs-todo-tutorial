import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <CheckCircle className="h-6 w-6 mr-2" />
          <span className="font-bold">TodoMaster</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/sign-in">
            Sign In
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/sign-up">
            Sign Up
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/">
            Home
          </Link>
        </nav>
      </header>
      <main className="flex-grow h-full flex flex-col justify-center items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Simplify Your Life with TodoMaster
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Organize your tasks, boost your productivity, and achieve your
              goals with our intuitive todo app.
            </p>
          </div>
          <div className="space-x-4">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TodoMaster. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
