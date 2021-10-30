
import './register.css';
import Add from '@material-ui/icons/Add'



function Register() {

    const addinput = () => {
     
                    
      };
       


    return (
        <div className="register">
            <div className="login_container">
                
                <div className="login_desc">
                    <p>Register Your Workplace</p>
                   
                </div>
               
                    <div className="login_authOptions">
                        <h3>Enter the name of your Workplace</h3>
                        
                        <div className="login_authOption">
                       
                        </div>

                    </div>
                    <div className="login_emailPass">
                      
                            
                            <h3>Enter the email of Colllaborators.</h3>
                      
                      
                            <div className="login_inputField">
                                <input                                 
                                    type="text"
                                    placeholder="Email"
                                />
                       
                                </div>
                <button onClick={addinput}><Add /> </button>   
                        </div>
                       
                    </div>
             
              
            </div>

    )
}

export default Register
