import React from "react";

export default class ProfileStatus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            status:this.props.status
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.status!==this.props.status){
            this.setState({status:this.props.status});
        }
    }
    handleActivateDoubleClick=()=>{
        this.setState({editMode:true});
    }
    handleDeactivateDoubleClick=(e)=>{
        this.setState({editMode:false});
         this.props.updateStatus(this.state.status);
    }
    handleChange=(e)=>{
        this.setState({
            status:e.currentTarget.value
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <span onDoubleClick={this.handleActivateDoubleClick}>{this.props.status || '----'}</span> :
                    <input autoFocus={true} value={this.state.status} onBlur={this.handleDeactivateDoubleClick} onChange={this.handleChange}/>
                }
            </div>
        );
    }
}