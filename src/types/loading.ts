export interface UserLoadingState {
  getMe: boolean
  getListUser: boolean
  getProfile: boolean
  checkUserFollowStatus: boolean
  unfollowUser: boolean
  registerUser: boolean
  loginUser: boolean
  logoutUser: boolean
  followUser: boolean
  changePassword: boolean
  getFollowSuggestions: boolean
  getUserFollowing: boolean
  getUserFollowers: boolean
  getMyFriend: boolean
  updateMe: boolean
}

export interface PostLoadingState {
  getPostsByAuthorId: boolean
  createPost: boolean
}

export interface ReactionLoadingState {
  reactionPost: boolean
  unReactionPost: boolean
  getReactionByPost: boolean
}

export interface MediaLoadingState {
  createImage: boolean
}

export interface CommentLoadingState {
  getComments: boolean
  createComment: boolean
  deleteComment: boolean
}

export interface BookmarkLoadingState {
  getStatusBookmark: boolean
}
