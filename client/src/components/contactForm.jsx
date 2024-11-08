import React, { useState } from 'react';
import './css/contact.css';
 


 const ContactForm  =  ()=>{



   return <div className="form-container" > <h3>Contact US</h3>
                <form>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Send Us A Message" required></textarea>
                <button type="submit">Submit</button>
                </form>
       </div>
      



 }
    
       
    

    

 
export default ContactForm;