import { useFetchTracksInfiniteQuery } from "../api/tracksApi"

export const TracksPage = () => {
  const { data } = useFetchTracksInfiniteQuery()
 
  console.log(data)
 
  return (
    <div>
      <h1>Tracks page</h1>
    </div>
  )
}