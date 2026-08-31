import PostCard from '../../components/PostCard/PostCard'
import PostComposer from '../../components/PostComposer/PostComposer'
import usePostStore from '../../store/usePostStore'

const Home = () => {
  const { newPosts, getNewPosts } = usePostStore()
  return (
    <div className='mx-8 my-5'>
      <div className='bg-white p-4 rounded-xl shadow-md flex flex-col justify-between'>
        <PostComposer />
      </div>
      <PostCard getPosts={getNewPosts} postData={newPosts} />
    </div>
  )
}

export default Home
