import defaultCover from '@/assets/images/default-playlist-cover.png';
import type { ChangeEvent } from 'react';
import { useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi';
import s from './PlaylistCover.module.css';
import type { Images } from '@/common/types';
import { toast } from 'react-toastify';

type Props = {
  playlistId: string;
  images: Images
};

export default function PlaylistCover({ playlistId, images }: Props) {
  const uploadedImage = images.main.find((image) => image.type === 'original');
  const src = uploadedImage ? uploadedImage.url : defaultCover;
  const allowdedTYpes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 1024 * 1024;
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.length && e.target.files[0];
    if (!file) return;
    if (!allowdedTYpes.includes(file.type)) {
      toast('only jpeg, gif, png', {type: 'error', theme: 'colored'});
    }
    if (file.size > maxSize) {
      toast(`The image is too large. Max size is ${maxSize / 1024} Mb`, {type: 'error', theme: 'colored'});
    }

    uploadPlaylistCover({ playlistId, file });
  };

  const deletePlaylistCoverHandler = () => deletePlaylistCover({ playlistId });

  return (
    <>
      <img className={s.cover} src={src} alt="cover" width={'240px'} />
      <input type="file" accept={'image/jpeg,image/png,image/gif'} onChange={uploadCoverHandler} />
      {uploadedImage && <button onClick={deletePlaylistCoverHandler}>delete image</button>}
    </>
  );
}
