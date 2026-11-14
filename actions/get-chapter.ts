import { db } from "@/lib/db";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId, isPublished: true },
    });

    const chapter = await db.chapter.findUnique({
      where: { id: chapterId, courseId, isPublished: true },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    const attachments = await db.attachment.findMany({
      where: { courseId },
    });

    const nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        isPublished: true,
        position: { gt: chapter.position },
      },
      orderBy: { position: "asc" },
    });

    const userProgress = await db.userProgress.findUnique({
      where: { userId_chapterId: { userId, chapterId } },
    });

    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      enrollment,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      enrollment: null,
    };
  }
};