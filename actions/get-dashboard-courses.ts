import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import type { CourseWithProgressWithCategory } from "@/actions/get-courses";

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const enrollments = await db.enrollment.findMany({
      where: { userId, course: { isPublished: true } },
      include: {
        course: {
          include: {
            category: true,
            chapters: {
              where: { isPublished: true },
              select: { id: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const courses: CourseWithProgressWithCategory[] = await Promise.all(
      enrollments.map(async ({ course }) => ({
        ...course,
        progress: await getProgress(userId, course.id),
      }))
    );

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return { completedCourses, coursesInProgress };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return { completedCourses: [], coursesInProgress: [] };
  }
};