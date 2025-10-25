import type { Images } from '@/common/types';
import type { CreatePlaylistArgs, PlaylistData, PlaylistsResponse, UpdatePlaylistArgs } from './playlistsApi.types';
import { baseApi } from '@/app/api/baseApi';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, {search: string}>({
      query: ({search}) => `playlists?search=${search}`,
      providesTags: ['Playlists'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => {
        return {
          url: `playlists`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Playlists'],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Playlists'],
    }),
    updatePlaylist: build.mutation<void, { body: UpdatePlaylistArgs; playlistId: string }>({
      query: ({ body, playlistId }) => ({
        url: `playlists/${playlistId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Playlists'],
    }),
    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ file, playlistId }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Playlists'],
    }),
    deletePlaylistCover: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => ({ url: `playlists/${playlistId}/images/main`, method: 'DELETE' }),
      invalidatesTags: ['Playlists'],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;
