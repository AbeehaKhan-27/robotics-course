import { db } from "@/lib/db";

type CourseStat = {
  name: string;
  enrolled: number;
  completed: number;
};

export const getAnalytics = async (userId: string) => {
  try {
    const courses = await db.course.findMany({
      where: { userId },
      include: {
        enrollments: { select: { userId: true } },
        chapters: { where: { isPublished: true }, select: { id: true } },
      },
    });

    const data: CourseStat[] = await Promise.all(
      courses.map(async (course) => {
        const chapterIds = course.chapters.map((chapter) => chapter.id);
        let completed = 0;

        if (chapterIds.length > 0) {
          // Count completed chapters per student; "completed" means all of them
          const perStudent = await db.userProgress.groupBy({
            by: ["userId"],
            where: { chapterId: { in: chapterIds }, isCompleted: true },
            _count: { _all: true },
          });

          completed = perStudent.filter(
            (student) => student._count._all === chapterIds.length
          ).length;
        }

        return {
          name: course.title,
          enrolled: course.enrollments.length,
          completed,
        };
      })
    );

    const totalEnrollments = data.reduce((sum, c) => sum + c.enrolled, 0);
    const totalCompleted = data.reduce((sum, c) => sum + c.completed, 0);
    const completionRate =
      totalEnrollments > 0
        ? Math.round((totalCompleted / totalEnrollments) * 100)
        : 0;

    return { data, totalEnrollments, totalCompleted, completionRate };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [] as CourseStat[],
      totalEnrollments: 0,
      totalCompleted: 0,
      completionRate: 0,
    };
  }
};