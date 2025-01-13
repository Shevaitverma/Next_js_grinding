import React from 'react'

// interface Params {
//   id: string
// }

// function UserProfile({params}: {params: Params}) {
//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen p-2'>
//         <h1 className='my-4'>Profile</h1>
//         <hr /> 
//         <p className='text-4xl'>Id:  
//             <span className='p-2 ml-2 rounded bg-orange-400 text-black'>{params.id}</span>
//         </p>
//     </div>
//   )
// }
function UserProfile() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-2'>
        <h1 className='my-4'>Profile</h1>
        <hr /> 
        <p className='text-4xl'>Id:  
            {/* <span className='p-2 ml-2 rounded bg-orange-400 text-black'>{params.id}</span> */}
        </p>
    </div>
  )
}

export default UserProfile