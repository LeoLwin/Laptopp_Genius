import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Icon, useMediaQuery } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AdvCreate from './AdvCreate';
import AdvList from './AdvList';


const Advertising = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1024px)'); // Change the breakpoint as needed
  const isComputerScreen = useMediaQuery('(min-width: 1025px)');
  const [view, setView] = useState("adv"); // "adv" or "addAdv"  


  const toggleRightSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar)
  };

  const toggleLeftSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleView = (view) => {
    setView(view);
  };

  return (
    <>
      <Navbar />
      <div className={isComputerScreen ? `${!showSidebar ? 'grid grid-cols-4 gap-4 h-screen' : ' grid grid-cols-4 gap-4 h-screen'}` : 'grid grid-cols-4 gap-4 h-screen'}>
        <div className={isSmallScreen ? `${showSidebar ? '' : 'hidden'}` : ''}>
          <div className={isComputerScreen ? "hidden" : "text-center"} onClick={toggleRightSidebar} >
            <Icon component={ArrowLeftIcon} sx={{ fontSize: 45 }} />
          </div>
          <div className={"border-2 border-r-blue-600  h-full max-h-full text-center"}>
            <div className={view === "products" ? "hover:bg-white-300 bg-slate-300 mt-5 py-3 rounded shadow-lg" : "hover:bg-slate-300 mt-5 py-3 rounded shadow-lg"} onClick={() => toggleView("adv")}>
              <span className="font-medium">Advertising List</span>
            </div>

            <div className={view === "addProduct" ? "hover:bg-white-300 bg-slate-300 mt-5 py-3 rounded shadow-lg" : "hover:bg-slate-300 mt-5 py-3 rounded shadow-lg"} onClick={() => toggleView("addAdv")}>
              <span className="font-medium">Add New Advertise</span>
            </div>
          </div>
        </div>

        {view === "addAdv" && (
          <div className=' col-span-3 mt-5'>
            <div className={isComputerScreen ? "col-span-3 mt-5" : "mt-5 ml-5 pl-5"}>
              <div className={isComputerScreen ? "hidden" : `${showSidebar ? "hidden" : ""}`} onClick={toggleLeftSideBar}>
                <Icon component={ArrowRightIcon} sx={{ fontSize: 45 }} />
              </div >
              <AdvCreate />
            </div>
          </div>
        )}

        {view === "adv" && (
          <div className=' col-span-3 mt-5'>
            <div className={isComputerScreen ? "col-span-3 mt-5" : "mt-5 ml-5 pl-5"}>
              <div className={isComputerScreen ? "hidden" : `${showSidebar ? "hidden" : ""}`} onClick={toggleLeftSideBar}>
                <Icon component={ArrowRightIcon} sx={{ fontSize: 45 }} />
              </div >
              <AdvList />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Advertising