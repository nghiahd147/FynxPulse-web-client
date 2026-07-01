const ProfilePreviewEmptyState = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center px-6 py-16 text-center animate-fade-in-up'>
      <img src='/friends-bro.svg' alt='' className='mb-6 h-48 w-48 object-contain' />
      <p className='max-w-md text-base font-semibold text-gray-700'>
        Chọn tên của người mà bạn muốn xem trước trang cá nhân.
      </p>
      <p className='mt-2 max-w-sm text-sm text-gray-500'>Bấm vào tên người theo dõi ở danh sách bên trái để bắt đầu.</p>
    </div>
  )
}

export default ProfilePreviewEmptyState
