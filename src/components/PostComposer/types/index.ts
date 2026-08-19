import type { LucideIcon } from 'lucide-react'
import type { Posts } from '../../../types/post.types'

export type Audience = 'every_one' | 'fynx_circle'

export type ModalView = 'compose' | 'audience'

export interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  parent_post_id?: string
  parentPost?: Posts
}
export type AudienceInfo = {
  label: string
  icon: LucideIcon
  description?: string
}

export type AudienceRecord = Record<Audience, AudienceInfo>
