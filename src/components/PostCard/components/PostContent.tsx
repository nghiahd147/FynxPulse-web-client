import { useEffect, useRef, useState } from 'react'

interface PostContentProps {
  content?: string
}

const PostContent = ({ content }: PostContentProps) => {
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    setExpanded(false)
  }, [content])

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const checkOverflow = () => setIsOverflowing(element.scrollHeight > element.clientHeight + 1)
    checkOverflow()

    const observer = new ResizeObserver(checkOverflow)
    observer.observe(element)
    return () => observer.disconnect()
  }, [content, expanded])

  if (!content) return null

  return (
    <div className='mt-3'>
      <p
        ref={contentRef}
        className={`whitespace-pre-wrap wrap-break-word text-[22px] leading-tight font-normal ${expanded ? '' : 'line-clamp-3'}`}
      >
        {content}
      </p>
      {(isOverflowing || expanded) && (
        <button
          type='button'
          className='mt-1 cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-900 hover:underline'
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  )
}

export default PostContent
