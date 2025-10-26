import { useState } from 'react';
import EditPlaylistForm from '../EditPlaylistForm/EditPlaylistForm';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import s from './PlaylistList.module.css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { PlaylistData, UpdatePlaylistArgs } from '../../api/playlistsApi.types';
import { useDeletePlaylistMutation, useUpdatePlaylistMutation } from '../../api/playlistsApi';

type Props = {
    playlistsIsLoading: boolean
    playlists: PlaylistData[] 
}

export default function PlaylistList( { playlistsIsLoading, playlists, }: Props ) {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [updatePlaylist] = useUpdatePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!playlistId) return;
    updatePlaylist({ playlistId, body: data }).then(() => {
      setPlaylistId(null);
    });
  };

  return (
    <div className={s.items}>
      {!playlistsIsLoading && !playlists?.length && <h3>Playlists not found</h3>}

      {playlists?.map((playlist) => {
        // 2
        const isEditing = playlistId === playlist.id;

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                onSubmit={onSubmit}
                editPlaylistHandler={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylistHandler={deletePlaylistHandler}
                editPlaylistHandler={editPlaylistHandler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
