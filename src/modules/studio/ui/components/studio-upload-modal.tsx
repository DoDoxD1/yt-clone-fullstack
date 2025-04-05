"use client";
import { Button } from "@/components/ui/button";
import { createMockVideo } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function StudioUploadModal() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createMockVideo,
    onSuccess: (response) => {
      //TODO: refresh videos
      queryClient.invalidateQueries({ queryKey: ["get-user-videos"] });
      toast.success("Video Created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = function () {
    mutate();
  };
  return (
    <Button variant="secondary" onClick={handleClick} disabled={isPending}>
      {isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
      Create
    </Button>
  );
}
