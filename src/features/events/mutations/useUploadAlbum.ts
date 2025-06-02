import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils";
import { useMutation } from "@tanstack/react-query"

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  })
}

export const useUploadAlbum = () => {
  return useMutation({
    mutationFn: async ({ file, id }: { file: File, id: number }) => {
      const url = '/events/album/'

      const encoded = await toBase64(file)

      await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({
          event_id: id,
          file: encoded
        }),
        headers: getDefaultHeaders(),
        credentials: 'include',
      })
    }
  })
}
