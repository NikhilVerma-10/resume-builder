// import React, { useEffect, useState } from 'react'
// import { FilePenIcon, PenIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
// import { dummyResumeData } from '../assets/assets'
// import {useNavigate} from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import api from '../configs/api'
// import toast from 'react-hot-toast'

// const Dashboard = () => {

//   const {user, token} = useSelector(state => state.auth)

//   const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

//   const [allResumes, setAllResumes] = useState([])
//   const [showCreateResume, setShowCreateResume] = useState(false)
//   const [showUploadResume, setShowUploadResume] = useState(false)
//   const [title, setTitle] = useState('')
//   const [resume, setResume] = useState(null)
//   const [editResumeId, setEditResumeId] = useState('')

//   const navigate = useNavigate()

//   const loadAllResumes = async () => {
//     setAllResumes(dummyResumeData)
//   }

//   const createResume = async (event) => {
//    try {
//      event.preventDefault()
//      const { data } = await api.post('/api/resumes/create',{title}, {headers: {
//       Authorization: token}})
//       setAllResumes([...allResumes, data.resume])
//       setTitle('')
//       setShowCreateResume(false)
//       navigate(`/app/builder/${data.resume._id}`)
//    } catch (error) {
//       toast.error(error?.resposnse?.data?.message || error.message)
//    }
//   }

//   const uploadResume = async (event) => {
//     event.preventDefault()
//     setShowUploadResume(false)
//     navigate(`/app/builder/resume123`)
//   }

//   const editTitle = async (event) => {
//     event.preventDefault()
//   }

//   const deleteResume = async (resumeId) => {
//     const confirm = window.confirm('Are you sure you want to delete this resume?')
//     if (confirm) {
//       setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
//     }
//   }

//   useEffect(() => {
//     loadAllResumes()
//   }, [])

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
//         Welcome, Nikhil Verma
//       </p>

//       {/* Create & Upload Buttons */}
//       <div className="flex gap-4">
//         {/* Create Resume Button (Indigo gradient icon) */}
//         <button onClick={()=> setShowCreateResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
//           <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-500 text-white rounded-full shadow-sm" />
//           <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
//             Create Resume
//           </p>
//         </button>

//         {/* Upload Existing Button (Purple gradient icon) */}
//         <button onClick={()=> setShowUploadResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
//           <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-full shadow-sm" />
//           <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
//             Upload Existing
//           </p>
//         </button>
//       </div>

//       <hr className="border-slate-300 my-6 sm:w-[305px]" />

//       {/* Resume Grid */}
//       <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
//         {allResumes.map((resume, index) => {
//           const baseColor = colors[index % colors.length]
//           return (
//             <button onClick={()=> navigate(`/app/builder/${resume._id}`)}
//               key={index}
//               className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
//               style={{
//                 background: `linear-gradient(135deg, ${baseColor}1A, ${baseColor}33)`,
//                 borderColor: `${baseColor}66`,
//               }}
//             >
//               <FilePenIcon
//                 className="size-7 group-hover:scale-105 transition-all"
//                 style={{ color: baseColor }}
//               />
//               <p
//                 className="text-sm group-hover:scale-105 transition-all px-2 text-center"
//                 style={{ color: baseColor }}
//               >
//                 {resume.title}
//               </p>
//               <p
//                 className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
//                 style={{ color: `${baseColor}99` }}
//               >
//                 Updated on {new Date(resume.updatedAt).toLocaleDateString()}
//               </p>
//               <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 hidden group-hover:flex items-center">
//                 <TrashIcon onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
//                 <PenIcon onClick={()=> (setEditResumeId(resume._id), setTitle(resume.title))} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
//               </div>
//             </button>
//           )
//         })}
//       </div>

//       {showCreateResume && (
//         <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
//           <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//             <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
//             <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
//             <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green -700 transition-colors'>Create Resume</button>
//             <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transtion-colors' onClick={()=>{setShowCreateResume(false); setTitle('')}}/>
//           </div>
//         </form>
//       )
//       }

//       {showUploadResume && (
//         <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
//           <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//             <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
//             <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
//             <div>
//               <label htmlFor="resume-input" className='block text-sm text-slate-700'>
//                 Select resume file
//                 <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
//                   {resume ? (
//                     <p className='text-green-700'>{resume.name}</p>
//                   ) : (
//                     <>
//                       <UploadCloud className='size-14 stroke-1'/>
//                       <p>Upload resume</p>
//                     </>
//                   )}
//                 </div>
//               </label>
//               <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e)=> setResume(e.target.files[0])}/>
//             </div>
//             <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green -700 transition-colors'>Upload Resume</button>
//             <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transtion-colors' onClick={()=>{setShowUploadResume(false); setTitle('')}}/>
//           </div>
//         </form>
//       )
//       }

//       {editResumeId && (
//         <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
//           <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//             <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
//             <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
//             <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green -700 transition-colors'>Update</button>
//             <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transtion-colors' onClick={()=>{editResumeId(''); setTitle('')}}/>
//           </div>
//         </form>
//       )
//       }
//     </div>
//   )
// }

// export default Dashboard


// import React, { useEffect, useState } from 'react'
// import { FilePenIcon, LoaderCircleIcon, PenIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
// import { dummyResumeData } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import api from '../configs/api'
// import toast from 'react-hot-toast'
// import pdfToText from 'react-pdftotext'

// const Dashboard = () => {
//   const { user, token } = useSelector(state => state.auth)

//   const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

//   const [allResumes, setAllResumes] = useState([])
//   const [showCreateResume, setShowCreateResume] = useState(false)
//   const [showUploadResume, setShowUploadResume] = useState(false)
//   const [title, setTitle] = useState('')
//   const [resume, setResume] = useState(null)
//   const [editResumeId, setEditResumeId] = useState('')

//   const [isLoading, setIsLoading] = useState(false)

//   const navigate = useNavigate()

//   const loadAllResumes = async () => {
//     try {
//       const { data } = await api.get('/api/users/resumes',{headers: {
//         Authorization: token}})
//         setAllResumes(data.resumes)
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message)
//     }
//     //setAllResumes(dummyResumeData)
//   }

//   const createResume = async (event) => {
//     try {
//       event.preventDefault()
//       const { data } = await api.post(
//         '/api/resumes/create',
//         { title },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       )

//       // Prefer server returning data.resume. Defensive fallback:
//       const created = data?.resume || data?.Resume || null
//       if (!created) {
//         toast.error('Unexpected server response when creating resume')
//         return
//       }

//       setAllResumes(prev => [...prev, created])
//       setTitle('')
//       setShowCreateResume(false)
//       navigate(`/app/builder/${created._id}`)
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message)
//     }
//   }

//   // Dashboard.jsx — uploadResume (client sends JSON { resumeText, title })
// const uploadResume = async (e) => {
//   e.preventDefault();
//   if (!resume) return toast.error('Select a PDF');

//   setIsLoading(true);
//   try {
//     // if you have client-side pdf parsing (pdfToText), use it:
//     const resumeText = await pdfToText(resume);
//     const { data } = await api.post('/api/ai/upload-resume',
//       { title, resumeText },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     navigate(`/app/builder/${data.resumeId}`);
//   } catch (err) {
//     toast.error(err?.response?.data?.message || err.message);
//   } finally {
//     setIsLoading(false);
//   }
// }


//   const editTitle = async (event) => {
//     try {
//       event.preventDefault()
//       const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: {title}} ,{headers: {
//           Authorization: token}})
//           setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume,
//             title } : resume))
//           setTitle('')
//           setEditResumeId('')
//           toast.success(data.message)
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error?.message)
//     }
    
//   }

//   const deleteResume = async (resumeId) => {
//     try {
//       const confirmDelete = window.confirm('Are you sure you want to delete this resume?')
//       if (confirm) {
//         const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {
//           Authorization: token}})
//           setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
//           toast.success(data.message)
//         //setAllResumes(prev => prev.filter(r => r?._id !== resumeId))
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error?.message)
//     }
    
//   }

//   useEffect(() => {
//     loadAllResumes()
//   }, [])

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
//         Welcome, Nikhil Verma
//       </p>

//       {/* Create & Upload Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setShowCreateResume(true)}
//           className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
//         >
//           <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-500 text-white rounded-full shadow-sm" />
//           <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">Create Resume</p>
//         </button>

//         <button
//           onClick={() => setShowUploadResume(true)}
//           className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
//         >
//           <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-full shadow-sm" />
//           <p className="text-sm group-hover:text-purple-600 transition-all duration-300">Upload Existing</p>
//         </button>
//       </div>

//       <hr className="border-slate-300 my-6 sm:w-[305px]" />

//       {/* Resume Grid */}
//       <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
//         {allResumes.map((resumeItem, index) => {
//           // defensive guard
//           const resumeObj = resumeItem || {}
//           const baseColor = colors[index % colors.length]
//           return (
//             <button
//               onClick={() => resumeObj._id && navigate(`/app/builder/${resumeObj._id}`)}
//               key={index}
//               className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
//               style={{
//                 background: `linear-gradient(135deg, ${baseColor}1A, ${baseColor}33)`,
//                 borderColor: `${baseColor}66`
//               }}
//             >
//               <FilePenIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
//               <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>
//                 {resumeObj.title ?? 'Untitled'}
//               </p>
//               <p
//                 className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
//                 style={{ color: `${baseColor}99` }}
//               >
//                 {resumeObj.updatedAt ? `Updated on ${new Date(resumeObj.updatedAt).toLocaleDateString()}` : '—'}
//               </p>

//               <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 hidden group-hover:flex items-center">
//                 <TrashIcon onClick={() => deleteResume(resumeObj._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
//                 <PenIcon
//                   onClick={() => {
//                     setEditResumeId(resumeObj._id)
//                     setTitle(resumeObj.title ?? '')
//                   }}
//                   className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
//                 />
//               </div>
//             </button>
//           )
//         })}
//       </div>

//       {showCreateResume && (
//         <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
//           <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
//             <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
//             <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
//             <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setShowCreateResume(false); setTitle('') }} />
//           </div>
//         </form>
//       )}

//       {showUploadResume && (
//         <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
//           <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
//             <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
//             <div>
//               <label htmlFor="resume-input" className="block text-sm text-slate-700">
//                 Select resume file
//                 <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
//                   {resume ? (
//                     <p className="text-green-700">{resume.name}</p>
//                   ) : (
//                     <>
//                       <UploadCloud className="size-14 stroke-1" />
//                       <p>Upload resume</p>
//                     </>
//                   )}
//                 </div>
//               </label>
//               <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])} />
//             </div>
//             <button disabled={isLoading} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
//               {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
//               {isLoading ? 'Uploading...' : 'Upload Resume'}
                  
//               </button>
//             <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setShowUploadResume(false); setTitle('') }} />
//           </div>
//         </form>
//       )}

//       {editResumeId && (
//         <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
//           <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
//             <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
//             <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
//             <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Update</button>
//             <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setEditResumeId(''); setTitle('') }} />
//           </div>
//         </form>
//       )}
//     </div>
//   )
// }

// export default Dashboard


import React, { useEffect, useState } from 'react'
import { FilePenIcon, LoaderCircleIcon, PenIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)

  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes',{headers: {
        Authorization: token}})
        setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    //setAllResumes(dummyResumeData)
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post(
        '/api/resumes/create',
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Prefer server returning data.resume. Defensive fallback:
      const created = data?.resume || data?.Resume || null
      if (!created) {
        toast.error('Unexpected server response when creating resume')
        return
      }

      setAllResumes(prev => [...prev, created])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${created._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // Dashboard.jsx — uploadResume (client sends JSON { resumeText, title })
const uploadResume = async (e) => {
  e.preventDefault();
  if (!resume) return toast.error('Select a PDF');

  setIsLoading(true);
  try {
    // if you have client-side pdf parsing (pdfToText), use it:
    const resumeText = await pdfToText(resume);
    const { data } = await api.post('/api/ai/upload-resume',
      { title, resumeText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate(`/app/builder/${data.resumeId}`);
  } catch (err) {
    toast.error(err?.response?.data?.message || err.message);
  } finally {
    setIsLoading(false);
  }
}


  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: {title}} ,{headers: {
          Authorization: token}})
          setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume,
            title } : resume))
          setTitle('')
          setEditResumeId('')
          toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message)
    }
    
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {
          Authorization: token}})
          setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
          toast.success(data.message)
        //setAllResumes(prev => prev.filter(r => r?._id !== resumeId))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message)
    }
    
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Nikhil Verma
      </p>

      {/* Create & Upload Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-400 to-indigo-500 text-white rounded-full shadow-sm" />
          <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">Create Resume</p>
        </button>

        <button
          disabled
          className="relative w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 opacity-50 cursor-not-allowed group"
        >
          <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-full shadow-sm" />
          <p className="text-sm">Upload Existing</p>
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Upcoming Feature
          </span>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* Resume Grid */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resumeItem, index) => {
          // defensive guard
          const resumeObj = resumeItem || {}
          const baseColor = colors[index % colors.length]
          return (
            <button
              onClick={() => resumeObj._id && navigate(`/app/builder/${resumeObj._id}`)}
              key={index}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${baseColor}1A, ${baseColor}33)`,
                borderColor: `${baseColor}66`
              }}
            >
              <FilePenIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
              <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>
                {resumeObj.title ?? 'Untitled'}
              </p>
              <p
                className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                style={{ color: `${baseColor}99` }}
              >
                {resumeObj.updatedAt ? `Updated on ${new Date(resumeObj.updatedAt).toLocaleDateString()}` : '—'}
              </p>

              <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 hidden group-hover:flex items-center">
                <TrashIcon onClick={() => deleteResume(resumeObj._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                <PenIcon
                  onClick={() => {
                    setEditResumeId(resumeObj._id)
                    setTitle(resumeObj.title ?? '')
                  }}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                />
              </div>
            </button>
          )
        })}
      </div>



      {showCreateResume && (
        <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
            <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setShowCreateResume(false); setTitle('') }} />
          </div>
        </form>
      )}

      {editResumeId && (
        <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
          <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Update</button>
            <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setEditResumeId(''); setTitle('') }} />
          </div>
        </form>
      )}
    </div>
  )
}

export default Dashboard