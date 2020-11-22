import React, {Component} from 'react';
import './UIElementsContainer.css';

const UIElementsContainer=(props)=> 
{
    const getUIElement=()=>{
      
           var elementDom;
            switch(props.formEleType){
                case"input":
                elementDom = ( 
                        <input className="input" placeholder="text field"></input>);    
                 break;
                case"label":
                elementDom = ( 
                       <label className="label">Label</label>
                 );
                 break;
                 case"button":
               elementDom = ( 
                        <button className="button">Button</button>
                 );
                 break;
            }
            return  elementDom;           
       }
    
        return(
            <div className="element_cont">
               {getUIElement()}
               </div>
               )
           
        
}
export default UIElementsContainer;
