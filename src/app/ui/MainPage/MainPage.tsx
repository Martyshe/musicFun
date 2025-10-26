import { useGetMeQuery } from "@/features/auth/ui/ProfilePage/api/authApi"

export const MainPage = () => {
  const { data } = useGetMeQuery()
 
  return (
    <div>
      <h1>Main page</h1>
      <div>login: {data?.login} </div>
    </div>
  )
}