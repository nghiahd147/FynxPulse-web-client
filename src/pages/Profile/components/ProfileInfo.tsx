import { Cake, Camera, MapPinHouse, PanelsTopLeft, Pencil, User } from 'lucide-react'
import { formatDate } from '../../../utils/date'
import { Button, DatePicker, Form, Input, Modal, Upload } from 'antd'
import type { UpdateMePayload } from '../../../types/user.types'
import { EditOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { REGEX_URL_WEBSITE, REGEX_USERNAME } from '../../../utils/regex'
import useUserStore from '../../../store/useUserStore'
import PostComposer from '../../../components/PostComposer/PostComposer'
import PostToolbar from '../../../components/PostToolbar/PostToolbar'
import PostCard from '../../../components/PostCard/PostCard'
import usePostStore from '../../../store/usePostStore'
import { notificationError, notificationSuccess } from '../../../config/notify'
import useMediaStore from '../../../store/useMediaStore'

const ProfileInfo = () => {
  const { openModalProfile, setOpenModalProfile, getMe } = useUserStore()
  const { getPostsByAuthorId, postByAuthor } = usePostStore()
  const [form] = Form.useForm()
  const avatar = Form.useWatch('avatar', form)
  const profile_picture_url = Form.useWatch('profile_picture_url', form)
  const { me, profileUser, updateMe } = useUserStore()
  const { createImage } = useMediaStore()

  useEffect(() => {
    getPostsByAuthorId(profileUser._id as string)
  }, [profileUser._id])

  useEffect(() => {
    form.setFieldsValue({
      first_name: profileUser.first_name,
      last_name: profileUser.last_name,
      user_name: profileUser.user_name,
      date_of_birth: dayjs(profileUser.date_of_birth),
      bio: profileUser.bio,
      location: profileUser.location,
      website: profileUser.website,
      avatar: profileUser.avatar,
      profile_picture_url: profileUser.profile_picture_url
    })
  }, [profileUser])

  const handleCancel = () => {
    setOpenModalProfile(false)
  }

  const uploadProfileImage = async (file: File, field: 'avatar' | 'profile_picture_url') => {
    try {
      const result = await createImage({ file })
      if (result.success) {
        form.setFieldValue(field, result.data?.[0]?.url as string)
      }
    } catch (error) {
      notificationError('Upload ảnh thất bại')
    }
  }

  const onFinish = async (values: UpdateMePayload) => {
    const result = await updateMe({
      ...values,
      date_of_birth: dayjs(values.date_of_birth)
    })
    if (result.success) {
      notificationSuccess(result.message as string)
      handleCancel()
      getMe()
    } else {
      notificationError(result.message as string)
    }
  }

  return (
    <div className='w-full flex gap-x-4'>
      <div className='w-[40%] h-55 flex flex-col py-2 px-3 rounded-md bg-white shadow-md'>
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl font-bold'>Thông tin cá nhân</h3>
          {me.user_name === profileUser.user_name && (
            <div
              onClick={() => setOpenModalProfile(true)}
              className='hover:bg-bgPrimary transition-all ease-in cursor-pointer p-3 rounded-[100%]'
            >
              <Pencil className='w-5 h-5' />
            </div>
          )}
        </div>
        <div className='flex flex-col gap-y-4 mt-3 ml-3'>
          {profileUser.location && (
            <div className='flex items-center gap-x-2'>
              <MapPinHouse />
              <span>{profileUser.location}</span>
            </div>
          )}
          {profileUser.first_name && profileUser.last_name && (
            <div className='flex items-center gap-x-2'>
              <User />
              <span>{profileUser.first_name + ' ' + profileUser.last_name}</span>
            </div>
          )}
          {profileUser.date_of_birth && (
            <div className='flex items-center gap-x-2'>
              <Cake />
              <span>{formatDate(profileUser.date_of_birth as Date)}</span>
            </div>
          )}
          {profileUser.website && (
            <div className='flex items-center gap-x-2'>
              <PanelsTopLeft />
              <span>{profileUser.website}</span>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-y-4'>
        {me._id === profileUser._id && (
          <div className=' bg-white p-4 rounded-xl shadow-md flex flex-col justify-between'>
            <PostComposer />
          </div>
        )}
        <PostToolbar />
        <PostCard postByAuthor={postByAuthor} />
      </div>

      {/* Modal */}
      <Modal
        title='Thông tin cá nhân'
        open={openModalProfile}
        onOk={() => form.submit()}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText='Xác nhận'
        cancelText='Đóng'
      >
        <Form form={form} name='basic' onFinish={onFinish} autoComplete='off'>
          <Form.Item name='avatar' hidden>
            <Input />
          </Form.Item>
          <Form.Item name='profile_picture_url' hidden>
            <Input />
          </Form.Item>
          {/* Photo */}
          <div className='w-full flex flex-col relative'>
            <div className='w-full h-70 relative overflow-hidden rounded-b-2xl'>
              <img
                src={profile_picture_url || '/nen-trang-mac-dinh.jpg'}
                alt='bg-user'
                className='w-full h-full inset-0 object-cover'
              />
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  uploadProfileImage(file, 'profile_picture_url')
                  return false
                }}
              >
                <span className='bg-[#ffffff] hover:bg-bgPrimary transition-all absolute bottom-8 right-0 mr-5 mb-0 shadow-md rounded-2xl flex items-center justify-center cursor-pointer gap-x-2 py-2 w-45'>
                  <Camera />
                  Chỉnh sửa ảnh bìa
                </span>
              </Upload>
            </div>
            <div className='absolute left-2 top-62 flex flex-col'>
              <div className='relative'>
                <img src={avatar || '/avatar-mac-dinh.jpg'} alt='avatar-user' className='w-25 h-25 rounded-[100%]' />
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    uploadProfileImage(file, 'avatar')
                    return false
                  }}
                >
                  <span className='z-10 absolute right-1 bottom-6 bg-[#e2e5e9] w-10 h-10 hover:bg-bgPrimary transition-all ease-in rounded-[100%] flex items-center justify-center cursor-pointer'>
                    <Camera />
                  </span>
                </Upload>
              </div>
            </div>
          </div>
          <Form.Item rules={[{ required: true, message: 'Vui lòng chọn ảnh avatar!' }]}>
            <div className='flex justify-end items-center mr-0'>
              <div className='flex flex-col items-center mr-4 mt-2'>
                <span className='font-bold'>Chỉnh sửa ảnh của bạn với Imagine</span>
                <span className='text-gray-400'>Tùy chỉnh chỉ trong vài giây</span>
              </div>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  uploadProfileImage(file, 'avatar')
                  return false
                }}
              >
                <Button icon={<EditOutlined />}>Đổi ảnh</Button>
              </Upload>
            </div>
          </Form.Item>
          {/* Info */}
          <Form.Item
            layout='vertical'
            label='Họ'
            name='first_name'
            rules={[{ required: true, message: 'Vui lòng điền họ!' }]}
          >
            <Input placeholder='Nhập họ' />
          </Form.Item>
          <Form.Item
            layout='vertical'
            label='Tên'
            name='last_name'
            rules={[{ required: true, message: 'Vui lòng điền tên!' }]}
          >
            <Input placeholder='Nhập tên' />
          </Form.Item>
          <Form.Item
            layout='vertical'
            label='Username'
            name='user_name'
            rules={[
              { required: true, message: 'Vui lòng điền username!' },
              {
                pattern: REGEX_USERNAME,
                message: 'Username phải có ít nhất 5 ký tự, chỉ gồm chữ cái, số và dấu chấm'
              }
            ]}
          >
            <Input placeholder='Nhập username' />
          </Form.Item>
          <Form.Item
            layout='vertical'
            label='Địa chỉ'
            name='location'
            rules={[{ required: true, message: 'Vui lòng điền địa chỉ!' }]}
          >
            <Input placeholder='Nhập địa chỉ' />
          </Form.Item>
          <Form.Item
            layout='vertical'
            label='Ngày sinh'
            name='date_of_birth'
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker format='DD-MM-YYYY' />
          </Form.Item>
          <Form.Item
            layout='vertical'
            label='Website'
            name='website'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền địa chỉ website!'
              },
              {
                pattern: REGEX_URL_WEBSITE,
                message: 'URL không hợp lệ! Vui lòng nhập URL hợp lệ.'
              }
            ]}
          >
            <Input placeholder='Nhập địa chỉ website' />
          </Form.Item>
          <Form.Item
            layout='vertical'
            label='Bio'
            name='bio'
            rules={[{ required: true, message: 'Vui lòng điền bio!' }]}
          >
            <Input placeholder='Nhập bio' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProfileInfo
