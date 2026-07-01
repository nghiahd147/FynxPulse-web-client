import { Outlet, useParams } from 'react-router-dom'
import EmptyFollowSuggestions from '../../../components/EmptyFollowSuggestions/EmptyFollowSuggestions'
import useUserStore from '../../../store/useUserStore'
import ProfilePreviewEmptyState from '../../../components/ProfilePreviewEmptyState/ProfilePreviewEmptyState'

const Suggestions = () => {
  const { user_name } = useParams()
  const { listFriends } = useUserStore()

  return (
    <>{listFriends.length <= 0 ? <EmptyFollowSuggestions /> : !user_name ? <ProfilePreviewEmptyState /> : <Outlet />}</>
  )
}

export default Suggestions
