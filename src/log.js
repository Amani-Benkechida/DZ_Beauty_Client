<div className ='flex ' >
        <div className ='w-1/2 h-screen'>
        <img className='w-full h-screen' src={image}/></div>
        <div  className ='w-1/2 items-center'>
        <div className ="w-1/2">
        <h1>
        Create an account
        </h1>
        <h5>Already have an ccount? Log in  </h5>
        <div className =''>
            <div >
                <p style={{color:"#6F6F6F"}}>user name</p>
              <input className ="border-solid border-2 w-full h-10 mt-2  mb-2 " type='text' />
            </div>
            <div>
                <p style={{color:"#6F6F6F"}}>Email address</p>
              <input className ="border-solid border-2 w-full h-10 mt-2  mb-2" type='text' />
            </div>
            <div>
                <p style={{color:"#6F6F6F"}}>Password</p>
              <input className ="border-solid border-2 w-full h-10  mt-2 mb-2 " style={{borderRadius:"3px"}} type='text' />
             < div>
              Use 8 or more characters with a mix of letters, numbers & symbols</div>
            </div>
            <div>
                <p style={{color:"#6F6F6F"}}>Confirm Password</p>
              <input className ="border-solid border-2  w-full h-10 mt-2  mb-2" type='text' />
            </div>
        </div>
        <div>
            <p>By creating an account, you agree to our<br/>
            Terms of use and Privacy Policy </p>
        </div>
        <div className ='flex'>
         <input style={{borderRadius:"10px"}}  type='checkbox' className =' text-white font-bold py-2 px-4 rounded'></input>
            <p  >i'm not a robot</p>
        </div>
        <div>
            <button style={{backgroundColor:'#323232',borderRadius:"10px" }} className ='h-10 text-white w-1/2'>
            Create an accrount
            </button>
        </div>
        <p>Already have an ccount? Log in  </p>
       </div>
        </div>



    </div>