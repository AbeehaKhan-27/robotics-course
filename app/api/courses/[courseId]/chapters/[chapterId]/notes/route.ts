import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth();
    const { courseId, chapterId } = await params;
    const { content } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (typeof content !== "string" || content.length > 5000) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
        isPublished: true,
        course: { isPublished: true },
      },
    });

    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }

    const note = await db.note.upsert({
      where: { userId_chapterId: { userId, chapterId } },
      update: { content },
      create: { userId, chapterId, content },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("[CHAPTER_ID_NOTES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}