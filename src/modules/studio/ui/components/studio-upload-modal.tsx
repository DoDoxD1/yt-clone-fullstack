"use client";
import ResponsiveModal from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {  createVideo } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function StudioUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    description: "",
    video: undefined as File | undefined,
    thumbnail: undefined as File | undefined,
    category: "Uncategorized",
  });
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate, isPending, data } = useMutation({
    mutationFn: createVideo,
    onSuccess: (response) => {
      //TO refresh videos
      queryClient.invalidateQueries({ queryKey: ["get-user-videos"] });
      toast.success("Video Created!");
      resetForm();
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      video: undefined,
      thumbnail: undefined,
      category: "Uncategorized",
    });
    setVideoPreview(null);
    setThumbnailPreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file size for video uploads (10MB = 10 * 1024 * 1024 bytes)
      const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
      const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
      
      if (name === "video" && file.size > MAX_VIDEO_SIZE) {
        toast.error(`Video file is too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB.`);
        e.target.value = ''; // Reset the input
        return;
      }
      
      if (name === "thumbnailFile" && file.size > MAX_IMAGE_SIZE) {
        toast.error(`Thumbnail is too large. Maximum size is ${MAX_IMAGE_SIZE / (1024 * 1024)}MB.`);
        e.target.value = ''; // Reset the input
        return;
      }
      
      // Map the input name to the state property name
      const fieldName = name === "thumbnailFile" ? "thumbnail" : name;
      setForm({ ...form, [fieldName]: file });
      
      // Create preview URLs
      if (name === "video" && file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
      } else if (name === "thumbnailFile" && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setThumbnailPreview(url);
      }
    }
  };

  const handleRemoveFile = (type: "video" | "thumbnail") => {
    if (type === "video") {
      setForm({ ...form, video: undefined });
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
        setVideoPreview(null);
      }
    } else {
      setForm({ ...form, thumbnail: undefined });
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required files exist
    if (!form.video) {
      toast.error("Video file is required");
      return;
    }
    
    if (!form.thumbnail) {
      toast.error("Thumbnail is required");
      return;
    }
    
    // Create object with the expected structure for createVideo
    const videoData = {
      videoFile: form.video,
      thumbnailFile: form.thumbnail,
      title: form.title,
      description: form.description,
      category: form.category
    };
    
    toast.info("Uploading video... This may take a while.");
    setIsUploading(true);
    
    // Simulate progress for better UX (since we don't have actual upload progress)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    
    // Pass videoData to the createVideo mutation
    mutate(videoData, {
      onSettled: () => {
        clearInterval(progressInterval);
        setIsUploading(false);
        setUploadProgress(0);
      },
      onSuccess: () => {
        setUploadProgress(100);
      }
    });
  };

  const handleClick = function () {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          resetForm();
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="overflow-y-auto pr-1 max-h-[60vh] pb-4">
            <div className="space-y-4 p-4">
              {/* Video Upload */}
              <div className="space-y-2">
                <Label htmlFor="video">Video File</Label>
                <div className="relative">
                  {!videoPreview ? (
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground">MP4, WebM or MOV (max 2GB)</p>
                      <Input
                        id="video"
                        name="video"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-md overflow-hidden">
                      <video 
                        controls 
                        src={videoPreview} 
                        className="w-full h-auto max-h-[200px] object-contain bg-black"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile("video")}
                        className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Add a title that describes your video"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell viewers about your video"
                  rows={3}
                />
              </div>

              {/* Category */}
              {/* <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Science & Technology">Science & Technology</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <div className="relative">
                  {!thumbnailPreview ? (
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload thumbnail image</p>
                      <Input
                        id="thumbnailFile"
                        name="thumbnailFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-md overflow-hidden">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="w-full h-auto max-h-[100px] object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile("thumbnail")}
                        className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 mt-auto border-t sticky bg-background py-4">
            {isUploading && (
              <div className="mb-4">
                <p className="text-sm mb-2 text-center">
                  {uploadProgress < 100 
                    ? "Uploading video... Please don't close this window."
                    : "Processing video... This will complete shortly."}
                </p>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending || !form.video || isUploading}>
                {isPending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
                Upload Video
              </Button>
            </div>
          </div>
        </form>
      </ResponsiveModal>
      <Button variant="secondary" onClick={handleClick}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Create
      </Button>
    </>
  );
}
