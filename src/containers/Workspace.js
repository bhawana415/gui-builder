import React, {Component} from 'react';
import classes from './Workspace.module.css';

const Workspace=(props)=> 
{
    const getUIElement=()=>{
      
           var elementDom;
            switch(props.formEleConfig.draggedEleType){
                case"input":
                elementDom = ( 
                     
                        <input className={classes.input}></input>);
                      
                 break;
                case"label":
                elementDom = ( 
                       <label className={classes.label}>Label</label>
                 );
                 break;
                 case"button":
               elementDom = ( 
                        <button className={classes.button}>Button</button>
                 );
                 break;
            }
            return  elementDom;           
       }
    
        return(
            <div className={classes.element_cont}>
               <p className={classes.eleId}>{props.formEleConfig.draggedEleType} Id: <strong>{props.formEleConfig.id}</strong></p>
               {getUIElement()}
               </div>
               )
           
        
}
export default Workspace;
