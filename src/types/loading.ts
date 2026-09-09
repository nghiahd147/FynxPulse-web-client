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

export interface GlobalSearchLoadingState {
  globalSearchLoading: boolean
}

export interface PostLoadingState {
  getNewPostsLoading: boolean
  getPostsByAuthorId: boolean
  createPost: boolean
  repostLoading: boolean
  qouteLoading: boolean
  deletePostLoading: boolean
  undoRepostLoading: boolean
  undoQouteLoading: boolean
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
  addBookmark: boolean
  unBookmark: boolean
}
