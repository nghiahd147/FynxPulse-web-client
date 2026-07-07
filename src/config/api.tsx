import type { createPostPayload } from '../types/post.types'
import type { ReactionPostPayload, UnReactionPostPayload } from '../types/reaction.types'
import type { ChangePasswordPayload, FollowUserPayload, LoginPayload, ParamsUser, UpdateMePayload, Users } from '../types/user.types'

export const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/json'
  },
  HEADER: () => ({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Authorization: localStorage.getItem('access_token')
  }),
  JSON_HEADER: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  }),
  FILE_HEADER: () => ({
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  })
}

export const API_URLS = {
  USERS: {
    register: (payload: Users) => ({
      endPoint: '/api/user/register',
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
      payload
    }),
    login: (payload: LoginPayload) => ({
      endPoint: '/api/user/login',
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
      payload
    }),
    logout: (payload: { refresh_token: string }) => ({
      endPoint: '/api/user/logout',
      method: 'POST',
      headers: HEADERS.JSON_HEADER(),
      payload
    }),
    updateMe: (payload: UpdateMePayload) => ({
      endPoint: '/api/user/me',
      method: 'PATCH',
      headers: HEADERS.JSON_HEADER(),
      payload
    }),
    changePassword: (payload: ChangePasswordPayload) => ({
      endPoint: '/api/user/change-password',
      method: 'PUT',
      headers: HEADERS.JSON_HEADER(),
      payload
    }),
    getListUser: (params: ParamsUser) => ({
      endPoint: '/api/user/',
      method: 'GET',
      headers: HEADERS.JSON_HEADER(),
      params
    }),
    getMe: () => ({
      endPoint: '/api/user/me',
      method: 'GET',
      headers: HEADERS.JSON_HEADER()
    }),
    getProfile: (username: string) => ({
      endPoint: `/api/user/${username}`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER()
    }),
    followUser: (payload: FollowUserPayload) => ({
      endPoint: '/api/user/follow',
      method: 'POST',
      headers: HEADERS.JSON_HEADER(),
      payload
    }),
    unfollowUser: (follower_user_id: string) => ({
      endPoint: `/api/user/unfollow/${follower_user_id}`,
      method: 'DELETE',
      headers: HEADERS.JSON_HEADER()
    }),
    getFollowSuggestions: (user_id: string) => ({
      endPoint: `/api/user/${user_id}/follow-suggestions`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER()
    }),
    checkUserFollowStatus: (follower_user_id: string) => ({
      endPoint: `/api/user/follow-status/${follower_user_id}`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER()
    }),
    getUserFollowing: (user_id: string, last_name: string) => ({
      endPoint: `/api/user/${user_id}/following`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER(),
      params: last_name && { last_name }
    }),
    getMyFollowing: (last_name: string) => ({
      endPoint: `/api/user/my-following`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER(),
      params: last_name && { last_name }
    }),
    getMyFollowers: (user_id: string, last_name: string) => ({
      endPoint: `/api/user/${user_id}/followers`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER(),
      params: last_name && { last_name }
    }),
    refreshToken: (refresh_token: string) => ({
      endPoint: '/api/user/refresh-token',
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
      payload: { refresh_token }
    })
  },
  POSTS: {
    getPostsByAuthorId: (author_id: string) => ({
      endPoint: `api/post/${author_id}`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER()
    }),
    createPost: (payload: createPostPayload) => ({
      endPoint: '/api/post',
      method: 'POST',
      headers: HEADERS.JSON_HEADER(),
      payload
    }),
    deletePost: (id: string) => ({
      endPoint: `/api/post/${id}`,
      method: 'DELETE',
      headers: HEADERS.JSON_HEADER()
    })
  },
  REACTIONS: {
    reactionPost: (payload: ReactionPostPayload) => ({
      endPoint: '/api/reaction/',
      method: 'POST',
      headers: HEADERS.JSON_HEADER(),
      payload
    }),
    unReactionPost: (payload: UnReactionPostPayload) => ({
      endPoint: `/api/reaction/`,
      method: 'DELETE',
      headers: HEADERS.JSON_HEADER(),
      payload,
    })
  },
  COMMENTS: {
    getCommentByPost: (post_id: string) => ({
      endPoint: `/api/comment/post/${post_id}`,
      method: 'GET',
      headers: HEADERS.JSON_HEADER(),
    })
  },
  UPLOADS: {
    createImage: (file: FormData) => ({
      endPoint: `/api/media/upload-image`,
      method: 'POST',
      headers: HEADERS.FILE_HEADER(),
      payload: file,
    })
  }
}
