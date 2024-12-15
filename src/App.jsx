import React from 'react'
import {Route, 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './pages/HomePage';
import JobsPages from './pages/JobsPages';
import AddJobs from './pages/AddJobs';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  //add new job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };
  //delete any job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',    
    });
    console.log("Deleting:", id);
  }
  //update any job
  const updateJob = async (updatedJob) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });
    return;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPages />} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSumit={updateJob} />} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobs addJobSumit={addJob} />}/>
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />}/>
    </Route>  
    )
  );
  return (
    <RouterProvider router={router}/>
)
}
export default App
