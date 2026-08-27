import { Input, Modal, Form, Tooltip } from 'antd'
import useUserStore from '../../store/useUserStore'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LockOutlined,
  LogoutOutlined,
  HomeFilled,
  HomeOutlined,
  PlaySquareFilled,
  PlaySquareOutlined,
  TeamOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { ListIndentIncrease } from 'lucide-react'
import { notificationError, notificationSuccess } from '../../config/notify'
import { useState, useEffect, useRef } from 'react'
import type { ChangePasswordPayload } from '../../types/user.types'
import { REGEX_PASSWORD } from '../../utils/regex'

const Header = (props: { setTabOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setTabOpen } = props
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const location = useLocation()
  const {
    logoutUser,
    changePassword,
    me,
    loading: { changePassword: loadingChangePassword }
  } = useUserStore()
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAvatarMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogoutUser = async () => {
    const result = await logoutUser({
      refresh_token: localStorage.getItem('refresh_token') || ''
    })
    if (result.success) {
      notificationSuccess(result.message as string)
      navigate('/login', { replace: true })
    } else {
      notificationError(result.message as string)
    }
  }

  const handleCancel = () => {
    setChangePasswordOpen(false)
  }

  const onFinish = async (values: ChangePasswordPayload) => {
    const result = await changePassword(values)
    if (result.success) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      notificationSuccess(result.message as string)
      navigate('/login', { replace: true })
    } else {
      notificationError(result.message as string)
    }
  }

  return (
    <div className='relative h-16 sm:mx-6 flex items-center justify-between'>
      {/* mobile */}
      <div className='flex items-center gap-2 sm:w-72'>
        <div
          className='block mx-2 mt-1 sm:hidden'
          onClick={() => {
            setTabOpen(true)
          }}
        >
          <ListIndentIncrease color='red' size={20} />
        </div>
        <Link to={'/'} className='flex shrink-0 items-center'>
          <img src='/icons8-yelp.png' alt='logo_home' className='w-10 h-10 rounded-full object-cover' />
        </Link>
        <div className='flex h-10 w-44 items-center gap-2 rounded-full bg-[#f0f2f5] px-3 transition-colors hover:bg-[#e4e6e9] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 sm:w-60'>
          <SearchOutlined className='shrink-0 text-[17px] text-[#65676b]' />
          <input
            type='text'
            placeholder='Tìm kiếm trên Fynx'
            className='min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#050505] outline-none placeholder:text-[#65676b]'
          />
        </div>
      </div>
      <div className='relative h-full flex items-center justify-center'>
        <div
          className={`absolute bottom-0 h-0.75 bg-blue-600 rounded-t-md transition-all duration-300 ease-in-out w-28 sm:w-32
            ${
              location.pathname === '/'
                ? 'left-0'
                : location.pathname.startsWith('/reels')
                  ? 'left-28 sm:left-32'
                  : location.pathname.startsWith('/friends')
                    ? 'left-56 sm:left-64'
                    : 'opacity-0 scale-0'
            }`}
        />
        <Tooltip title='Trang chủ'>
          <Link to={'/'} className='group cursor-pointer w-28 sm:w-32 h-full flex items-center justify-center z-10'>
            <div
              className={`w-11/12 h-4/5 rounded-lg flex items-center justify-center transition-all duration-300 ease-out active:scale-95 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {location.pathname === '/' ? <HomeFilled className='text-3xl' /> : <HomeOutlined className='text-3xl' />}
            </div>
          </Link>
        </Tooltip>
        <Tooltip title='Thước phim'>
          <Link
            to={'/reels'}
            className='group cursor-pointer w-28 sm:w-32 h-full flex items-center justify-center z-10'
          >
            <div
              className={`w-11/12 h-4/5 rounded-lg flex items-center justify-center transition-all duration-300 ease-out active:scale-95 ${location.pathname.startsWith('/reels') ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {location.pathname.startsWith('/reels') ? (
                <PlaySquareFilled className='text-3xl' />
              ) : (
                <PlaySquareOutlined className='text-3xl' />
              )}
            </div>
          </Link>
        </Tooltip>
        <Tooltip title='Bạn bè'>
          <Link
            to={'/friends'}
            className='group cursor-pointer w-28 sm:w-32 h-full flex items-center justify-center z-10'
          >
            <div
              className={`w-11/12 h-4/5 rounded-lg flex items-center justify-center transition-all duration-300 ease-out active:scale-95 ${location.pathname.startsWith('/friends') ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <TeamOutlined className='text-3xl' />
            </div>
          </Link>
        </Tooltip>
      </div>
      {/* desktop, tablet */}
      <div className='hidden sm:flex sm:w-72 sm:justify-end'>
        <div className='relative w-9 h-9 rounded-full border' ref={menuRef}>
          <img
            src={me.avatar || '/avatar-mac-dinh.jpg'}
            className='w-full h-full rounded-full cursor-pointer'
            alt='avatar-icon'
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
          />

          <div
            className={`absolute w-90 top-[calc(100%+8px)] right-0 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.2)] z-50 p-4 transition-all duration-200 origin-top-right ${avatarMenuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}
          >
            {/* Top Profile Card */}
            <div className='w-full shadow-[0_1px_4px_rgba(0,0,0,0.15)] rounded-xl p-4 mb-3 flex flex-col border border-gray-100'>
              <Link
                to={`/profile/${me.user_name}`}
                className='flex items-center gap-x-3 mb-3 cursor-pointer'
                onClick={() => setAvatarMenuOpen(false)}
              >
                <img
                  src={me.avatar || '/avatar-mac-dinh.jpg'}
                  className='w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0'
                  alt='avatar-icon'
                />
                <span className='font-bold text-[17px] text-black'>{me.first_name + ' ' + me.last_name}</span>
              </Link>
              <div className='h-px bg-[#E3E5E7] w-full mb-3'></div>
              <Link to={`/profile/${me.user_name}`} onClick={() => setAvatarMenuOpen(false)} className='w-full'>
                <div className='w-full font-semibold text-[15px] text-[#050505] flex items-center justify-center py-1.5 bg-[#E4E6E9] rounded-md hover:bg-[#D8DADF] transition-all'>
                  Xem tất cả trang cá nhân
                </div>
              </Link>
            </div>

            {/* Menu Items */}
            <div
              className='w-full flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all'
              onClick={() => {
                setChangePasswordOpen(true)
                setAvatarMenuOpen(false)
              }}
            >
              <div className='w-9 h-9 flex items-center justify-center rounded-full bg-[#E4E6E9] shrink-0'>
                <LockOutlined className='text-black text-[18px]' />
              </div>
              <span className='ml-3 font-semibold text-[15px] text-black'>Thay đổi mật khẩu</span>
            </div>

            <div
              className='w-full flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all mt-1'
              onClick={() => {
                handleLogoutUser()
                setAvatarMenuOpen(false)
              }}
            >
              <div className='w-9 h-9 flex items-center justify-center rounded-full bg-[#E4E6E9] shrink-0'>
                <LogoutOutlined className='text-black text-[18px]' />
              </div>
              <span className='ml-3 font-semibold text-[15px] text-black'>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Đổi mật khẩu'
        open={changePasswordOpen}
        onOk={() => form.submit()}
        confirmLoading={loadingChangePassword}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Mật khẩu cũ'
            name='old_password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password placeholder='Nhập mật khẩu cũ' />
          </Form.Item>
          <Form.Item
            label='Mật khẩu mới'
            name='password'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              {
                pattern: REGEX_PASSWORD,
                message: 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('old_password') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu mới giống mật khẩu cũ!'))
                }
              })
            ]}
          >
            <Input.Password placeholder='Nhập mật khẩu mới' />
          </Form.Item>
          <Form.Item
            label='Xác nhận mật khẩu mới'
            name='confirm_password'
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                }
              })
            ]}
          >
            <Input.Password placeholder='Xác nhận mật khẩu mới' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Header
