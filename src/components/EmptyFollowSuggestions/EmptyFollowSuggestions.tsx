import { UserRoundPlus } from 'lucide-react'

const EmptyFollowSuggestions = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center animate-fade-in-up'>
      <div className='mb-4 rounded-full bg-gray-100 p-5'>
        <UserRoundPlus className='w-10 h-10 text-gray-400' strokeWidth={1.5} />
      </div>
      <p className='text-base font-semibold text-gray-700'>Chưa có gợi ý người theo dõi</p>
      <p className='mt-2 max-w-sm text-sm text-gray-500'>Hiện tại chưa có ai phù hợp để gợi ý. Hãy quay lại sau nhé!</p>
    </div>
  )
}

export default EmptyFollowSuggestions
