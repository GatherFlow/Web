import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import { Label } from "./label";

interface ImagePreviewProps {
  url: string;
  onRemove: () => void;
}

const ImagePreview = ({ url, onRemove }: ImagePreviewProps) => (
  <div className="relative aspect-square">
    <button
      type="button"
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <img
      src={url}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

interface ImageDropzoneFieldProps {
  value: File | string | null;
  onChange: (file: File | null) => void;
  label?: string;
  name?: string;
}

export function ImageDropzoneField({
  value,
  onChange,
  label = "Image",
  name,
}: ImageDropzoneFieldProps) {
  const previewUrl =
    typeof value === "string"
      ? value
      : value
      ? URL.createObjectURL(value)
      : null;

  return (
    <div className="w-full max-w-40">
      <Label htmlFor={name}>{label}</Label>
      <div className="mt-1 w-full">
        {previewUrl ? (
          <ImagePreview
            url={previewUrl}
            onRemove={() => onChange(null)}
          />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                onChange(file);
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-none focus:border-primary",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} id={name} name={name} />
                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
