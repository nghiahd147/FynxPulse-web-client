export interface UserLoadingState {
  getMe: boolean;
  getListUser: boolean;
  getProfile: boolean;
  checkUserFollowStatus: boolean;
  unfollowUser: boolean;
  registerUser: boolean;
  loginUser: boolean;
  logoutUser: boolean;
  followUser: boolean;
  changePassword: boolean;
  getFollowSuggestions: boolean;
  getUserFollowing: boolean;
  getUserFollowers: boolean;
  getMyFriend: boolean;
}

export interface PostLoadingState {
  getPostsByAuthorId: boolean;
  createPost: boolean;
}
