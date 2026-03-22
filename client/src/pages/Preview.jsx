import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon } from 'lucide-react'
import Loader from '../components/Loader' 
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true) 
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    // const resume = dummyResumeData.find((resume) => resume._id === resumeId) || null
    // setResumeData(resume)
    // setIsLoading(false)
    try {
        const { data } = await api.get('/api/resumes/public/' + resumeId)
        setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume() 
  }, [resumeId]) 

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color} 
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-6xl text-slate-400 mb-4">Resume not found</p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 flex items-center gap-2 ring-offset-1 ring-1 ring-green-400 transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Go to Home Page
      </Link>
    </div>
  )
}

export default Preview
