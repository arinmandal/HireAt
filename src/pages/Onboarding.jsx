import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useCallback } from 'react'
import { BarLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Onbording = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()

  // useEffect MUST be called before any early returns to follow React hooks rules
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user?.unsafeMetadata?.role === 'recruiter' ? "/post-jobs" : "/jobs")
    }
  }, [user, navigate])

  const selectRole = useCallback(async (role) => {
    if (!user) return
    try {
      await user.update({
        unsafeMetadata: { role },
      })
      navigate(role === 'recruiter' ? "/post-jobs" : "/jobs")
    } catch (err) {
      console.error("Error updating user role:", err)
    }
  }, [user, navigate])

  // Early return AFTER all hooks have been called
  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#4a5cff' />
  }

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>
        I am a ...
      </h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button
          className="h-20 text-2xl cursor-pointer"
          variant="teal"
          onClick={() => selectRole('candidate')}
        >
          Candidate
        </Button>

        <Button
          variant="blue"
          className="h-20 text-2xl cursor-pointer"
          onClick={() => selectRole('recruiter')}
        >
          Recruiter
        </Button>
      </div>
    </div>
  )
}

export default Onbording