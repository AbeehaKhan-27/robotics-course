import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { VideoEmbed } from "@/components/video-embed";
import { Separator } from "@/components/ui/separator";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const { courseId, chapterId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, attachments, nextChapter, userProgress, enrollment } =
    await getChapter({ userId, courseId, chapterId });

  if (!chapter || !course) {
    return redirect("/");
  }

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this module." />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        {chapter.videoUrl && (
          <div className="p-4">
            <VideoEmbed url={chapter.videoUrl} title={chapter.title} />
          </div>
        )}
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            <div className="flex items-center gap-x-2">
              {!enrollment && <CourseEnrollButton courseId={courseId} />}
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </div>
          </div>
          <Separator />
          {chapter.description && (
            <div>
              <Preview value={chapter.description} />
            </div>
          )}
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File className="h-4 w-4 mr-2" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;