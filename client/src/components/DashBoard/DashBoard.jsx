import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom' 
import DashNav from '../DashNav/DashNav'
import { RiFile3Line,RiFileCheckLine,RiFileCloseLine,RiFileHistoryLine } from "react-icons/ri";

const DashSide = (props)=>{
    return(
        <div className='pt-8 pl-5'>
            <div className='flex w-[100%] items-center py-4'>
                <button onClick={props.handleDocPres} className={`flex w-[100%] items-center ${props.present?'bg-emerald-400':''} w-[80%] rounded-lg p-2 text-[12px]`}>
                    <RiFile3Line size={27} color='rgb(71 85 105)'/>
                    <p className='pl-[10px]'>Documents Present</p>
                </button>
            </div>
            <div className='flex w-[100%] items-center py-4'>
                <button onClick={props.handleDocVeri} className={`flex w-[100%] items-center ${props.verified?'bg-emerald-400':''} w-[80%] rounded-lg p-2 text-[12px]`}>
                    <RiFileCheckLine size={27} color='rgb(71 85 105)'/>
                    <p className='pl-[10px]'>Verified Docs</p>
                </button>   
            </div>
            <div className='flex w-[100%] items-center py-4'>
                <button onClick={props.handleDocPend} className={`flex w-[100%] items-center ${props.pending?'bg-emerald-400':''} w-[80%] rounded-lg p-2 text-[12px]`}>
                    <RiFileHistoryLine size={27} color='rgb(71 85 105)'/>
                    <p className='pl-[10px]'>Pending Verification</p>
                </button>
            </div>
            <div className='flex w-[100%] items-center py-4'>
                <button onClick={props.handleDocRejc} className={`flex w-[100%] items-center ${props.rejected?'bg-emerald-400':''} w-[80%] rounded-lg p-2 text-[12px]`}>
                    <RiFileCloseLine size={27} color='rgb(71 85 105)'/>
                    <p className='pl-[10px]'>Rejected Docs</p>
                </button>
            </div>
        </div>
    )
}
const DashBoard = () => {
    const navigate = useNavigate();
    const [present , SetPresent] = useState(true);
    const [verified , SetVerified] = useState(false);
    const [rejected , SetRejected] = useState(false);
    const [pending , SetPending] = useState(false);
    const [presentFiles , SetPresentFiles] = useState([{fileName:"Example"}]);
    const [verifiedFiles , SetVerifiedFiles] = useState([{fileName:"Example"}]);
    const [rejectedFiles , SetRejectedFiles] = useState([{fileName:"Example"}]);
    const [pendingFiles , SetPendingFiles] = useState([{fileName:"Example"}]);
    const requestData = async ()=>{
        // try{
        //     let res1 = await fetch("");
        //     let arr1 = res1.json();
        //     SetPresentFiles(arr1);
        //     let res2 = await fetch("");
        //     let arr2 = res2.json();
        //     SetVerifiedFiles(arr2);
        //     let res3 = await fetch("");
        //     let arr3 = res3.json();
        //     SetRejectedFiles(arr3);
        //     let res4 = await fetch("");
        //     let arr4 = res4.json();
        //     SetPendingFiles(arr4);

        // } catch(error){
        //     console.log(error.message);
        // }
    }
    useEffect(() => {
        requestData();
      });
    const handleVerDoc=()=>{
        navigate('/filepicker')
    }
    const handleDocPres = ()=>{
        SetPresent(true);SetVerified(false);SetRejected(false);SetPending(false);
    }
    const handleDocVeri = ()=>{
        SetPresent(false);SetVerified(true);SetRejected(false);SetPending(false);
    }
    const handleDocRejc = ()=>{
        SetPresent(false);SetVerified(false);SetRejected(true);SetPending(false);
    }
    const handleDocPend = ()=>{
        SetPresent(false);SetVerified(false);SetRejected(false);SetPending(true);
    }
  return (
    <>
        <DashNav heading="User Dashboard"/>
        <div className='flex h-[90vh]'>
            <div className='border-r-slate-400 border-r-4 w-[345px]'><DashSide handleDocPres={handleDocPres} handleDocVeri={handleDocVeri} handleDocRejc={handleDocRejc} handleDocPend={handleDocPend} present={present} verified={verified} rejected={rejected} pending={pending}/></div>
            <div className='w-full'>
                {present && <div className='p-4'>
                                <h1 className='font-bold text-xl text-slate-600'>Documents Present</h1>
                                {(presentFiles.length===0 && <p>Nothing to dsiplay</p>)}
                                {presentFiles.map((item,index)=>{
                                    return(<div key={index} className='m-8 rounded-md bg-slate-300 p-4 flex items-center justify-between'>{item.fileName}<button className='px-7 py-2 bg-gradient-text rounded-[25px] text-white' onClick={handleVerDoc}>Verify Docs</button></div>
                                    )
                                })}
                                
                            </div>}
                {verified && <div className='p-4'>
                                <h1 className='font-bold text-xl text-slate-600'>Verified Documents</h1>
                                {(verifiedFiles.length===0 && <p>Nothing to dsiplay</p>)}
                                {verifiedFiles.map((item,index)=>{
                                    return(<div key={index} className='m-8 rounded-md bg-slate-300 p-4 flex items-center'>{item.fileName}</div>)
                                })}
                            </div>}
                {rejected && <div className='p-4'>
                                <h1 className='font-bold text-xl text-slate-600'>Rejected Documents</h1>
                                {(rejectedFiles.length===0 && <p>Nothing to dsiplay</p>)}
                                {rejectedFiles.map((item,index)=>{
                                    return(<div key={index} className='m-8 rounded-md bg-slate-300 p-4 flex items-center'>{item.fileName}</div>
                                )})}
                            </div>}
                {pending && <div className='p-4'>
                                <h1 className='font-bold text-xl text-slate-600'>Pending Documents</h1>
                                {(pendingFiles.length===0 && <p>Nothing to dsiplay</p>)}
                                {pendingFiles.map((item,index)=>{
                                    return(<div key={index} className='m-8 rounded-md bg-slate-300 p-4 flex items-center'>{item.fileName}</div>)
                                })}
                            </div>}
            </div>
        </div>
    </>
  )
}

export default DashBoard