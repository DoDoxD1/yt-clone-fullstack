"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, updateVideo } from "@/lib/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";

interface FormSectionProps {
  videoId: string;
  videoFile: string;
  thumbnail: string;
  owner: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  title: string;
  description: string;
  duration: number;
  views: number;
  category: string;
  isPublished: boolean;
  videoPreview: string;
  createdAt: string;
}

export const FormSection = (video: FormSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: video,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { mutate, isPending, data } = useMutation({
    mutationFn: updateVideo,
    onSuccess: (response) => {
      //TO refresh videos
      queryClient.invalidateQueries({ queryKey: ["get-user-videos"] });
      queryClient.invalidateQueries({
        queryKey: ["user-video-" + response.data._id],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Video Updated!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
    },
  });

  const onSubmit = async (data: FormSectionProps) => {
    mutate(data);
  };

  if (!isMounted) {
    return null; // Return nothing during SSR
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Video Details</h1>
            <p className="text-xs text-muted-foreground">
              Manage your video details
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <TrashIcon className="size-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="space-y-8 lg:col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title{/* TODO: Add AI generate button */}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add a title to your video" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={10}
                      className="resize-none pr-10"
                      placeholder="Add a description to your video"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Add thumbnail field here */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.data.map(
                        (category: { _id: any; title: string }) => (
                          <SelectItem value={category.title} key={category._id}>
                            {category.title}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-8 lg:col-span-2">
            <div className="flex flex-col gap-4 bg-[#F9F9F9] rounded-xl overflow-hidden h-fit">
              <div className="aspect-video overflow-hidden relative">
                <VideoPlayer
                  playbackID={video.videoFile}
                  thumbnailUrl={video.thumbnail}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
