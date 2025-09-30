import {
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from "../../api/playlistsApi.types";

type Props = {
  onSubmit: (data: UpdatePlaylistArgs) => void;
  editPlaylistHandler: (playlist: PlaylistData | null) => void;
  register: UseFormRegister<UpdatePlaylistArgs>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
};

export default function EditPlaylistForm({
  onSubmit,
  editPlaylistHandler,
  register,
  handleSubmit,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register("title")} placeholder={"title"} />
      </div>
      <div>
        <input {...register("description")} placeholder={"description"} />
      </div>
      <button type={"submit"}>save</button>
      <button type={"button"} onClick={() => editPlaylistHandler(null)}>
        cancel
      </button>
    </form>
  );
}
