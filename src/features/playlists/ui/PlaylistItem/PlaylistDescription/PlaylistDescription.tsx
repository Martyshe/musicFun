import type { PlaylistAttributes } from '@/features/playlists/api/playlistsApi.types';

type Props = {
  attributes: PlaylistAttributes;
};

export default function PlaylistDescription({ attributes }: Props) {
  return (
    <>
      <div>title: {attributes.title}</div>
      <div>description: {attributes.description}</div>
      <div>userName: {attributes.user.name}</div>
      
    </>
  );
}
