import PostCard from '../../components/PostCard/PostCard'
import PostComposer from '../../components/PostComposer/PostComposer'

const Home = () => {
  return (
    <div className='mx-8 my-5'>
      <div className='bg-white p-4 rounded-xl shadow-md flex flex-col justify-between'>
        <PostComposer />
      </div>
      <PostCard />
    </div>
  )
}

export default Home
