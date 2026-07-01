import { Outlet, useParams } from 'react-router-dom'
import ProfilePreviewEmptyState from '../../../components/ProfilePreviewEmptyState/ProfilePreviewEmptyState'

const List = () => {
  const { user_name } = useParams()

  return <>{!user_name ? <ProfilePreviewEmptyState /> : <Outlet />}</>
}

export default List
