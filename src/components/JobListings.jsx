import React from 'react'
import JobListing from './JobListing'
import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { db } from "../config/firebase"
import { getDocs, collection } from 'firebase/firestore';

const JobListings = ({isHome=false}) => {
  const jobsRef = collection(db, "jobs")
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try{
  //       const res = await fetch('api/jobs');
  //       const data = await res.json();
  //       isHome ? setJobs(data.slice(0,3)) : setJobs(data);
  //       // setJobs(data);
  //     }
  //     catch(error){
  //       console.log("Cannot Fetch Data", error);
  //     }
  //     finally{
  //       setLoading(false);
  //     }
  //   }
  //   fetchJobs();
  // }, [])
  //firebase integration
  useEffect(()=>{
    const fetchFireJobs = async () => {
    try{
      const res = await getDocs(jobsRef);
      const data = res.docs.map((doc) => ({id: doc.id, ...doc.data()}))
      isHome ? setJobs(data.slice(0,3)) : setJobs(data);
    }
    catch(error){
      console.log("Cannot Fetch Firebase Data", error);
    }
    finally{
      setLoading(false);
    }}
    fetchFireJobs();
  }, [])

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
          {loading ? (<Spinner loading={loading}/>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job)=>(
                  <JobListing key={job.id} job={job} />
            ))}
          </div>)}
      </div>
    </section>
  )
}

export default JobListings
