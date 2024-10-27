import React from 'react'
import { useFilePicker } from 'use-file-picker';
import './FilePicker.css'

//  http://localhost:3000/api/v1/upload/verify

const Filepicker = () => {
  const handleUpload = async()=>{
    const formdata = new FormData();
    formdata.append('image' , )
  }
  const { openFilePicker, filesContent, loading, errors, plainFiles, clear } = useFilePicker({
    multiple: false,
    readAs: 'DataURL', 
    accept: ['.jpeg','.jpg','.png'],
  });

  if (errors.length) {
    return (
      <div>
        <button onClick={() => openFilePicker()}>Something went wrong, retry! </button>
        {errors.map(err => (
          <div>
            {err.name}: {err.reason}
            /* e.g. "name":"FileAmountLimitError", "reason":"MAX_AMOUNT_OF_FILES_EXCEEDED" */
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-[100vh] flex justify-center items-center background'>
    <div className='flex flex-col items-center p-3 backdrop-blur-[40px] rounded-[15px] w-[350px] sm:mx-1 md:w-[43vw] lg:w[40vw] '>
      <div className=' my-4'><h1 className='text-blue-700 font-extrabold text-3xl md:text-3xl '>File Upload</h1></div>
      <div className=' my-3'><p className='text-slate-700'>Click <strong>Browse</strong>, to select a file, and then click <strong>Upload</strong></p></div>
      <div className=' w-[300px] flex  justify-between my-3 md:w-[340px]'>
        <button className='bg-blue-600 rounded-md py-1 px-3 text-white' onClick={() => openFilePicker()}>Browse... </button>
        <button className='bg-blue-600 rounded-md py-1 px-3 text-white' onClick={() => clear()}>Clear</button>
      </div>
      {!!filesContent.length && <img className='max-h-[60vh] w-[300px] my-2 md:w-[340px]' src={filesContent[0].content} />}
      {plainFiles.map((file,index)=>{
        return(
        <div key={index}>
            <div>{file.name}</div>
            {index === 0 && <div className='flex justify-center'><button className='bg-blue-600 rounded-md py-1 px-3 text-white mt-2' onClick={() => handleUpload()}>Upload</button></div>}
        </div>)
      })}
    </div>
    </div>
  );
}
export default Filepicker