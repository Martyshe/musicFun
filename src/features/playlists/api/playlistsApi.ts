import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "./playlistsApi.types";
import { baseApi } from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => `playlists`,
      providesTags: ["Playlists"],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => {
        return {
          url: `playlists`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Playlists"],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlists"],
    }),
    updatePlaylist: build.mutation<
      void,
      { body: UpdatePlaylistArgs; playlistId: string }
    >({
      query: ({ body, playlistId }) => ({
        url: `playlists/${playlistId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Playlists"],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi;
