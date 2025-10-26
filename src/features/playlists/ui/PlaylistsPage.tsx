import { useState, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import type { PlaylistData, UpdatePlaylistArgs } from '../api/playlistsApi.types';
import { CreatePlaylistForm } from './CreatePlaylistForm/CreatePlaylistForm';
import s from './Playlists.module.css';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import EditPlaylistForm from './EditPlaylistForm/EditPlaylistForm';
import { useDeletePlaylistMutation, useFetchPlaylistsQuery, useUpdatePlaylistMutation } from '../api/playlistsApi';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components/Pagination/Pagination';
import PlaylistList from './PlaylistList/PlaylistList';

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(32);

  const debouncedSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery(
    {
      search: debouncedSearch,
      pageNumber: currentPage,
      pageSize,
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      pollingInterval: 300000,
      skipPollingIfUnfocused: true,
    },
  );

  const setPageSizeHandler = (size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearch(e.currentTarget.value);
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input type="search" placeholder={'Search playlist by title'} onChange={(e) => searchPlaylistHandler(e)} />
      <PlaylistList playlistsIsLoading={isLoading} playlists={data?.data || []} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        setPageSize={setPageSizeHandler}
      />
    </div>
  );
};
