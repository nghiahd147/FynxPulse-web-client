import { Eye } from 'lucide-react'

const PostViewButton = ({ count = 0 }: { count?: number }) => {
  return (
    <>
      <div className='flex items-center gap-1'>
        <button
          type='button'
          className='cursor-pointer flex items-center rounded-md px-1.5 py-1 text-[#65676B] transition-colors hover:bg-[#F2F2F2]'
        >
          <Eye className='h-5 w-5' strokeWidth={2} />
        </button>
        <span className='text-sm font-medium text-[#65676B]'>{count}</span>
      </div>
    </>
  )
}

export default PostViewButton
