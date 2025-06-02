import { Button } from "@/core/components/ui/button";
import { ImageDropzoneField } from "@/core/components/ui/dropzone";
import type React from "react";
import { useState } from "react";
import { useUploadAlbum } from "../mutations/useUploadAlbum";
import type { Event } from "@/core/types";

interface Props {
  event: Event
}

export const SetAlbumForm: React.FC<Props> = ({ event }) => {
  const { mutate } = useUploadAlbum()

  const [value, setValue] = useState<File | string | null>(event.album[0] ?? null)

  return (
    <div className="flex w-full p-4 border border-input bg-input/30 rounded-lg items-center justify-between">
      <ImageDropzoneField value={value} onChange={setValue} label="Edit image" />
      <Button
        disabled={!value || typeof value === 'string'}
        variant="outline"
        onClick={() => mutate({ file: value as File, id: event.id })}
      >
        Upload
      </Button>
    </div>
  )
}