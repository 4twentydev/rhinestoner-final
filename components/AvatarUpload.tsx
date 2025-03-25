import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarUpload({
  url,
  onUpload,
}: {
  url: string | null;
  onUpload: (url: string) => void;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload(filePath);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {avatarUrl ? (
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt="Avatar" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="h-20 w-20">
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      )}
      <div>
        <Button variant="outline" className="relative" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Avatar"}
          <input
            type="file"
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </Button>
      </div>
    </div>
  );
}
