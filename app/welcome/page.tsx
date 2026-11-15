import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Brainstorming",
    description:
      "Find a cause or question you want to tackle. Think about who your idea is for, whether it would actually benefit them, and how it could be misused.",
  },
  {
    title: "Hardware",
    description:
      "Modules on 3D modeling and printing, power management, microphones and speakers, motors, and movement.",
  },
  {
    title: "The brain",
    description:
      "Learn how the microcontroller works and how it controls the different parts of your robot.",
  },
  {
    title: "Software and computer vision",
    description:
      "Bring it together with the software side of robotics, including how a robot can see.",
  },
];

const WelcomePage = async () => {
  const { userId } = await auth();

  return (
    <div className="min-h-full flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <span className="font-semibold">Robotics for Social Good</span>
        {userId ? (
          <Link href="/">
            <Button variant="ghost" size="sm">
              Go to dashboard
            </Button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
        )}
      </header>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Learn robotics by imagining what it could do for the people around
            you
          </h1>
          <p className="text-lg text-slate-600">
            A free, open-source introduction to robotics for beginners with
            little or no hardware experience. Start with an idea you care
            about, then learn the skills to build toward it.
          </p>
          <div className="flex items-center justify-center gap-x-2">
            {userId ? (
              <Link href="/search">
                <Button>Browse courses</Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button>Create a free account</Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline">Sign in</Button>
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            What you&apos;ll learn:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <div key={module.title} className="border rounded-md p-4">
                <h3 className="font-medium mt-1">{module.title}</h3>
                <p className="text-sm text-slate-600 mt-2">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-12 space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            Why this course?
          </h2>
          <ul className="space-y-3 text-slate-700">
            <li>
              <span className="font-medium">Your idea comes first:</span>{" "}
              Instead of following a fixed project, you choose what you want to
              build and why.
            </li>
            <li>
              <span className="font-medium">Technology for social good:</span>{" "}
              Inspired by Ruha Benjamin&apos;s book <em>Imagination</em>, the
              course asks you to think beyond the usual uses of robotics.
            </li>
            <li>
              <span className="font-medium">Free and open source:</span> No
              subscription, no enrollment window, and no prior experience
              needed.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;