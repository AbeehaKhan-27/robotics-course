"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { Chapter } from "@/lib/generated/prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoEmbed } from "@/components/video-embed";
import { getEmbedUrl } from "@/lib/video";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z
    .string()
    .min(1, "Paste a YouTube or Vimeo link")
    .refine((value) => getEmbedUrl(value) !== null, "Please paste a YouTube or Vimeo link"),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { videoUrl: initialData?.videoUrl || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const save = async (videoUrl: string | null) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        videoUrl,
      });
      toast.success("Module updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => save(values.videoUrl);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Module video (optional)
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-40 bg-slate-200 rounded-md mt-2">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="mt-2 space-y-2">
            <VideoEmbed url={initialData.videoUrl} title={initialData.title} />
            <Button variant="ghost" size="sm" onClick={() => save(null)}>
              Remove video
            </Button>
          </div>
        ))}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Paste a YouTube or Vimeo link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};