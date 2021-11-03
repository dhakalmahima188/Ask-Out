import React from 'react';
import Add from '@material-ui/icons/Add'

import './sidebar.css'

function Sidebar() {
    return (
        
<div>



        <div className="sidebar">

 <div className="sidebarOptions">
     
            <div className="sidebarOption"> 
            {/* <button type="button" className="close" aria-label="Close" onClick={closeNav}><span aria-hidden="true">&times;</span>
</button> */}
           
          

            </div>
            <div className="sidebarOption"> 
            <p>IT</p>
            
            </div>

            <div className="sidebarOption"> 
                
                <p>HR</p>
            </div>
            <div className="sidebarOption"> 
            <p>Account</p>
            </div>
            
         
        </div>

        </div>
        </div>
    )
  
      
    
}

export default Sidebar