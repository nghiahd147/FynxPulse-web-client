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
  getMyFriend: boolean;
}
