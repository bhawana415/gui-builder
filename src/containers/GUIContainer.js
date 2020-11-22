import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './GUIContainer.css';
import UIElementsContainer from './UIElementsContainer';
import Workspace from './Workspace';


const grid = 8;

const getElementStyle = (isDragging, draggableStyle) => ({
    
    userSelect: 'none',
    padding: grid * 2,
    margin: `0  0 ${grid}px 0`,
    border:'2px solid #f2ba5e',
    
    background: isDragging ? '#ffff80' : 'white',
    boxShadow: '5px 10px 18px #f2ba5e',

    
    ...draggableStyle
});

const getContainerStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#e6f4f5',
    padding: grid,
    width: "100%",
    height:"100%",
    margin: `0 40px  ${grid}px 0`,
    boxShadow: '5px 10px 18px #888888',
    
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


class GUIContainer extends Component {
    state = {
        workspaceItems:[],
        UIElements:["input","button","label"]
    };
    saveToLocalStorage=()=>{
      const local = this.state.workspaceItems;
      localStorage.setItem("workspaceItems", JSON.stringify(local));
      alert("Saved to Local");
    }
    componentDidMount() {
        const workspaceItems = JSON.parse( localStorage.getItem( "workspaceItems" ) );
        if(workspaceItems!== null){
        this.setState( { workspaceItems:workspaceItems } );
        }
    }
    onDragEnd = result => {
        const { source, destination } = result;

        
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            var workspaceItemsList=this.state.workspaceItems;
            const items = reorder(
                workspaceItemsList,
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { workspaceItems: items };
            }

            this.setState(state);
        } else {
            var workspaceItem={}
             workspaceItem["draggedEleType"] = result.draggableId;
             workspaceItem["id"]=Math.floor(Math.random() * 1000000) + 1;
             var workspaceItems=this.state.workspaceItems.concat(workspaceItem);
             this.setState({
                    workspaceItems: workspaceItems
                });
        }
    };

   
    render() {
        return (
            <div className="builderCont">
            <h2 className ="header">GUI Builder</h2>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
               <div className="formEleCont">
                 <h3 className="formEleLabel">Form Elements</h3>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getContainerStyle(snapshot.isDraggingOver)}>
                                {this.state.UIElements.map((item, index) => (
                                    <Draggable
                                        key={item}
                                        draggableId={item}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getElementStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                               <UIElementsContainer formEleType={item}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                   </div>
                    <div className="workspaceCont">
                      <div className="workspaceHeader">
                        <h3 className="workspaceLabel">Drag Element</h3>
                        <button className="saveLocalBtn" onClick={this.saveToLocalStorage}>Save to Local</button>
                      </div>
                        <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getContainerStyle(snapshot.isDraggingOver)}>
                                    {this.state.workspaceItems.length !== 0?
                                        (this.state.workspaceItems.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id.toFixed()}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getElementStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}>
                                                   <Workspace formEleConfig={item}/>
                                                </div>
                                            )}
                                        </Draggable>
                                        ))):<p className="DragDropMsg"><strong>Drag and Drop the form Elements here</strong></p>}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
        );
    }
}

export default GUIContainer;
