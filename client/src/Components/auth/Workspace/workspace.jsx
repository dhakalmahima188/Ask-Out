import "./workspace.css";
import Add from "@material-ui/icons/Add";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Workspace() {
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), email: '' },
      ]);
    
     
      const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setInputFields(newInputFields);
      }
      const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(),  email: '' }])
      }
    

    
    
  

  return (
    <div className="register">
      <div className="login_container">
        <div className="login_desc">
          <p>Register Your Workplace</p>
        </div>

        <div className="login_authOptions">
          <h3>Enter the name of your Workplace</h3>

          <div className="login_inputFields">

          <input
              name="workplace"
            
            
            />
          </div>
          
        </div>
        <div className="login_emailPass">
          <h3>Enter the email of Colllaborators.</h3>

          <div className="login_inputField">
        
          
           
        { inputFields.map(inputField => (
          <div className="login_inputField" key={inputField.id}>
            <input
              name="email"
              placeholder="Email"
              variant="filled"
              value={inputField.email}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
           
          
          </div>
        )) }
       
    
          
          </div>
          <button onClick={handleAddFields}>
            <Add />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Workspace;