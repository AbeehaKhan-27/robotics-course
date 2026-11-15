"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface NotesFormProps {
  courseId: string;
  chapterId: string;
  initialNote: string;
}

const formSchema = z.object({
  content: z.string().max(5000, "Notes can be up to 5000 characters"),
});

export const NotesForm = ({
  courseId,
  chapterId,
  initialNote,
}: NotesFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: initialNote },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/notes`,
        values
      );
      toast.success("Notes saved");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4">
      <div className="font-medium">Your notes</div>
      <p className="text-xs text-muted-foreground mt-1">
        Write down your thoughts about your application, questions, or notes.
        Only you can see them.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="What are you thinking about after this module?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!isValid || isSubmitting} type="submit">
            Save notes
          </Button>
        </form>
      </Form>
    </div>
  );
};