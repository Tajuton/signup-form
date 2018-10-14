/**
 * Sign up -form application
 * @author Tuukka Jurvakainen <tuukka.jurvakainen@gmail.com>
 * @version 1.0.0
 */
import React, { Component } from 'react';
import { IoMdCreate } from 'react-icons/io';
import { IoMdTrash } from 'react-icons/io';
import { IoMdArrowUp } from 'react-icons/io';
import { IoMdArrowDown } from 'react-icons/io'
import './App.css';

/**
 * Row for one participant. Function based component.
 * @param {{ id: number; name: string; email: string; phone: string; onClickRemove?: (e: React.SyntheticEvent) => void; onClickModify?: (e: React.SyntheticEvent) => void}} props
 */
function RowParticipant(props){
  return (
    <tr id={props.id} >
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td onClick={props.onClickModify} className="icon-cell">
          <IoMdCreate className="icon" />
        </td>
        <td onClick={props.onClickRemove} className="icon-cell">
          <IoMdTrash className="icon" />
        </td>
    </tr>
  );
}

/**
 * Modify row for one participant. Function based component.
 * @param {{ id: number; name: string; email: string; phone: string; onClickCancel?: (e: React.SyntheticEvent) => void; onClickSave?: (e: React.SyntheticEvent) => void;  onChangeName?: (e: React.SyntheticEvent) => void;  onChangeEmail?: (e: React.SyntheticEvent) => void;  onChangePhone?: (e: React.SyntheticEvent) => void;}} props
 */
function ModifyRowParticipant(props){
  return (
    <tr id={props.id} >
        <td>
          <input value={props.name} onChange={props.onChangeName}  type="text" 
            pattern="^[a-zA-Z\s\-äöåÄÖÅ]*$" maxLength="100" title="Only letters a-z-åäö allowed" placeholder="Full Name" />
        </td>
        <td>
          <input  value={props.email} onChange={props.onChangeEmail} type="email" 
            maxLength="100" title="Give an email address" placeholder="E-mail address" />
        </td>
        <td>
          <input value={props.phone} onChange={props.onChangePhone} type="text" 
            pattern="^[0-9]*$" maxLength="10" title="Only numbers allowed" placeholder="Phone number" />
        </td>
        <td className="icon-cell">
          <button className="cancel-button" disabled={false} onClick={props.onClickCancel}>
            Cancel
          </button>
        </td>
        <td className="icon-cell">
          <button className="save-button" disabled={false} onClick={props.onClickSave}>
            Save
          </button>
        </td>
    </tr>
  );
}

/**
 * Sign up -form application
 * @augments {React.Component<{ }, {
        participants: string[];
        textName: string;
        textEmail: string;
        textPhone: string;
        lastId: number;
        modifyParticipant: {};
        showErrors: boolean;
        sort: {by:string, type:number}
    }>}
 */
class App extends Component {

  /** LIFECYCLE METHODS *****************************************/

  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      textName: "",
      textEmail: "",
      textPhone: "",
      lastId: 0,
      modifyParticipant: {},
      showErrors: false,
      sort: { by: "" , type: -1 }
    };
  }

  componentDidMount() {
    //RANDOM PARTICIPANTS ARE GENERATED HERE:
    let names = [
      {name:"Erkki Esimerkki", email:"erkki.esimerkki@gmail.com", phone:"0441112222"},
      {name:"Some Guy", email:"some.guy@gmail.com", phone:"0441234567"},
      {name:"Donald Duck", email:"donald.duck@duckburg.com", phone:"0447654321"},
      {name:"Sauli Niinistö", email:"presidentti@tpk.fi", phone:"0401231234"},
      {name:"Doctor Who", email:"who@who.com", phone:"0503214321"},
      {name:"Arnold Schwarzenegger", email:"austrian@oak.com", phone:"0449999999"},
      {name:"Ash Ketchum", email:"ash@pikachu.jp", phone:"1231231234"}
      ];

    let list = [];
    let limit = 20; //change this, if you want to generate more participants
    for(let i=1; i<=limit; i++){
      let r = Math.floor(Math.random() * 7);
      list[i] = {id:i, name:names[r].name, email:names[r].email, phone:names[r].phone}
    }

    this.setState({
      participants: list,
      lastId: limit
    }); 
    
  }

  render() {
    let rows = this.state.participants;
    return (
      <div className="app">
        <header>
          <canvas className="logo"></canvas>
          <h1 className="header-text">Nord Software</h1>
        </header>
        <div className="main-content">
          <h1>List of participants</h1>
          <div className="add-form">
            <div className="row">
              <input className="add-input" type="text" pattern="^[a-zA-Z\s\-äöåÄÖÅ]*$" maxLength="100" value={this.state.textName}
                  onChange={this.onChangeName} title="Only letters a-z-åäö allowed" placeholder="Full Name"/>
              <input className="add-input" type="email" maxLength="100" value={this.state.textEmail}
                  onChange={this.onChangeEmail} title="Give an email address" placeholder="E-mail address" />
              <input className="add-input" type="text" pattern="^[0-9]*$" maxLength="10" value={this.state.textPhone}
                  onChange={this.onChangePhone} title="Only numbers allowed" placeholder="Phone number" />
              <button className="add-button" disabled={false} onClick={this.onClickAddRow}>
                Add new
              </button>
            </div>
            <div className={"errors " + (this.state.showErrors ? "show" : "not-show")} >
              Please fill out all fields with valid information
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th onClick={this.onClickColumnName}>
                  <span className="helper">Name </span> 
                  <IoMdArrowDown className={ "icon " + ((this.state.sort.by === "name") ? 
                    ((this.state.sort.type === -1 ) ? "show" : "not-show")
                     : "not-show") } /> 
                  <IoMdArrowUp className={ "icon " + ((this.state.sort.by === "name") ? 
                    ((this.state.sort.type === 1 ) ? "show" : "not-show")
                     : "not-show") } /> 
                </th>
                <th onClick={this.onClickColumnEmail}>
                  <span className="helper">E-mail address</span> 
                  <IoMdArrowDown className={ "icon " + ((this.state.sort.by === "email") ? 
                    ((this.state.sort.type === -1 ) ? "show" : "not-show")
                    : "not-show")}  /> 
                  <IoMdArrowUp className={ "icon " + ((this.state.sort.by === "email") ? 
                    ((this.state.sort.type === 1 ) ? "show" : "not-show")
                    : "not-show")}  /> 
                </th>
                <th onClick={this.onClickColumnPhone}>
                  <span className="helper">Phone number</span> 
                  <IoMdArrowDown className={ "icon " + ((this.state.sort.by === "phone") ? 
                    ((this.state.sort.type === -1 ) ? "show" : "not-show") 
                    : "not-show")}  /> 
                  <IoMdArrowUp className={ "icon " + ((this.state.sort.by === "phone") ? 
                    ((this.state.sort.type === 1 ) ? "show" : "not-show") 
                    : "not-show")}  />  
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead> 
            <tbody> 
              {rows.map( attr => {
                if(attr.id !== this.state.modifyParticipant.id){
                  return (<RowParticipant id={attr.id} name={attr.name} email={attr.email} phone={attr.phone} key={attr.id} 
                  onClickRemove={this.onClickRemove} onClickModify={this.onClickModify} />); 
                }else{
                  return (<ModifyRowParticipant id={this.state.modifyParticipant.id} name={this.state.modifyParticipant.name} 
                    email={this.state.modifyParticipant.email} phone={this.state.modifyParticipant.phone} key={attr.id} 
                    onClickCancel={this.onClickCancel} onClickSave={this.onClickSave} onChangeName={this.onChangeModName}
                    onChangeEmail={this.onChangeModEmail} onChangePhone={this.onChangeModPhone} />); 
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* EVENT HANDLERS *****************************************/

  /**
   * On click Name column header -listener
   */
  onClickColumnName = e =>{
    this.sortByName();
  }

  /**
   * On click Email column header -listener
   */
  onClickColumnEmail = e =>{
    this.sortByEmail();
  }

  /**
   * On click Phone column header -listener
   */
  onClickColumnPhone = e =>{
    this.sortByPhone();
  }

  /**
   * On click Remove row button-listener
   */
  onClickRemove = e =>{
    let id = +e.currentTarget.parentElement.id;
    this.removeRow(id); 
  };

  /**
   * On click Modify row button-listener
   */
  onClickModify = e =>{
    let id = +e.currentTarget.parentElement.id;
    this.modifyRow(id); 
  };

  /**
   * On click Add new row button-listener
   */
  onClickAddRow = e =>{
    if(e){ 
      e.preventDefault(); 
    }
    this.addRow(); 
  };

  /**
   * On Change textbox name -listener
   */
  onChangeName = e =>{
    this.setTextName(e.target.value);
  };

  /**
   * On change textbox email -listener
   */
  onChangeEmail= e =>{
    this.setTextEmail(e.target.value);
  };

  /**
   * On change textbox phone -listener
   */
  onChangePhone= e =>{
    this.setTextPhone(e.target.value);
  };

  /**
   * On click Cancel-listener
   */
  onClickCancel= e =>{
    if(e){ 
      e.preventDefault(); 
    }
    this.cancelModify(); 
  };

  /**
   * On click Save-listener
   */
  onClickSave= e =>{
    if(e){ 
      e.preventDefault(); 
    }
    this.saveModify(); 
  };

  /**
   * On Change textbox name -listener
   */
  onChangeModName = e =>{
    this.setModifyName(e.target.value);
  };

  /**
   * On change textbox email -listener
   */
  onChangeModEmail= e =>{
    this.setModifyEmail(e.target.value);
  };

  /**
   * On change textbox phone -listener
   */
  onChangeModPhone= e =>{
    this.setModifyPhone(e.target.value);
  };


  /* STATE HANDLERS ************************************************/

  /**
   * This method sorts this.states.partisipants by names
   */
  sortByName (){
    let copy = this.state.participants;
    let type = -1;
    if(this.state.sort.by === "name" && this.state.sort.type === -1){
      type = 1;
      copy.sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()){
          return -1;
        }else {
          return 1;
        }
      });
    }else{
      copy.sort(function(a, b){
        if (a.name.toLowerCase() > b.name.toLowerCase()){
          return -1;
        }else {
          return 1;
        }
      });
    }
    this.setState({
      sort : { by:"name", type:type},
      participants: copy
    });
  }
  
  /**
   * This method sorts this.states.partisipants by emails
   */
  sortByEmail (){
    let copy = this.state.participants;
    let type = -1;
    if(this.state.sort.by === "email" && this.state.sort.type === -1){
      type = 1;
      copy.sort(function(a, b){
        if (a.email.toLowerCase() < b.email.toLowerCase()){
          return -1;
        }else {
          return 1;
        }
      });
    }else{
      copy.sort(function(a, b){
        if (a.email.toLowerCase() > b.email.toLowerCase()){
          return -1;
        }else {
          return 1;
        }
      });
    }
    this.setState({
      sort : { by:"email", type:type},
      participants: copy
    });
  }

  /**
   * This method sorts this.states.partisipants by phone number
   */
  sortByPhone (){
    let copy = this.state.participants;
    let type = -1;
    if(this.state.sort.by === "phone" && this.state.sort.type === -1){
      type = 1;
      copy.sort(function(a, b){
        if (a.phone < b.phone){
          return -1;
        }else {
          return 1;
        }
      });
    }else{
      copy.sort(function(a, b){
        if (a.phone > b.phone){
          return -1;
        }else {
          return 1;
        }
      });
    }
    this.setState({
      sort : { by:"phone", type:type},
      participants: copy
    });
  }
  /**
   * This method removes the given participant from 
   * this.state.participants -list
   * @param {number} removeId the id of the participant
   */
  removeRow (removeId){
    let copy = this.state.participants.filter(
      p => p.id !== removeId
    );
    this.setState({
      participants: copy
    })
  }

   /**
   * This method sets modifyParticipant for state.modifyParicipant
   * @param {number} partId the id of the modified participant 
   */
  modifyRow (partId){
    let participant = this.state.participants.filter(
      p => p.id === partId
    );
    this.setState({
      modifyParticipant: participant[0]
    });
  }

  /**
   * This method adds new participant in state.participants.
   * It clears state.textName, state.textEmail and state.textPhone
   */
  addRow (){
    let name = this.state.textName;
    let email = this.state.textEmail;
    let phone = this.state.textPhone;

    let error = this.errorValues(name, email, phone); //validation
    if(error) {
      this.setState({
        showErrors: true
      });
      return;//return, if errors in values
    } 

    let id = this.state.lastId + 1;
    let copy =  this.state.participants;
    copy.push({id:id, name:name, email:email, phone:phone})
    this.setState({
      participants: copy,
      lastId: id,
      textName: "",
      textEmail: "",
      textPhone: "",
      showErrors: false
    });
  };

  /**
   * This method sets new value for state.textName
   * @param {string} name 
   */
  setTextName (name){
    this.setState({
      textName: name,
      showErrors: false
    });
  };

  /**
   * This method sets new value for state.textEmail
   * @param {string} email 
   */
  setTextEmail (email){
    this.setState({
      textEmail: email,
      showErrors: false 
    });
  };

  /**
   * This method sets new value for state.textPhone
   * @param {string} phone 
   */
  setTextPhone (phone){
    this.setState({
      textPhone: phone,
      showErrors: false 
    });
  };


  /**
   * This method sets modifyParticipant to {} for state.modifyParticipant
   */
  cancelModify (){
    this.setState({
      modifyParticipant: {}
    });
  }

  /**
   * This method sets modifyParticipant to state.participants
   */
  saveModify (){

    let name = this.state.modifyParticipant.name;
    let email = this.state.modifyParticipant.email;
    let phone = this.state.modifyParticipant.phone;

    let error = this.errorValues(name, email, phone); //validation
    if(error) {
      this.setState({
        showErrors: false
      });
      return;//return, if errors in values
    } 

    let id = this.state.modifyParticipant.id;
    let copy = this.state.participants.map( attr => {
      if(attr.id === id){
        return this.state.modifyParticipant;
      }else{
        return attr;
      }
    });
    this.setState({
      participants: copy,
      modifyParticipant: {},
      showErrors: false
    });
  }


    /**
   * This method sets new name for state.modifyParticipant
   * @param {string} name 
   */
  setModifyName (name){
    let copy = this.state.modifyParticipant;
    this.setState({
      modifyParticipant: {id:copy.id, name:name, email:copy.email, phone:copy.phone},
      showErrors: false
    });
  };

  /**
   * This method sets new email for state.modifyParticipant
   */
  setModifyEmail (email){
    let copy = this.state.modifyParticipant;
    this.setState({
      modifyParticipant: {id:copy.id, name:copy.name, email:email, phone:copy.phone},
      showErrors: false 
    });
  };

  /**
   * This method sets new email for state.modifyParticipant
   * @param {string} phone 
   */
  setModifyPhone (phone){
    let copy = this.state.modifyParticipant;
    this.setState({
      modifyParticipant: {id:copy.id, name:copy.name, email:copy.email, phone:phone},
      showErrors: false 
    });
  };

  /* OTHER METHODS ************************************************/

  /**
   * This method validates form values.
   * @param {string} name 
   * @param {string} email 
   * @param {string} phone 
   * @returns True, if error. False, if values are okay.
   */
  errorValues(name, email, phone){
    //remove spaces, before checking
    name = name.trim();
    email = email.trim();
    phone = phone.trim();

    //Check, if empty(or only spaces):
    if(name==="" || email==="" || phone===""){
      return true;
    }

    //Check, that the name contains only letters:
    if (!(/^[a-zA-Z\s\-äöåÄÖÅ]*$/.test(name))) {
      return true;
    } 

    //Check, that the phone number contains only numbers:
    if (!(/^\d+$/.test(phone))) {
      return true;
    } 

    //Check, that the email is in the right format(or almost):
    let arr = email.split("@");
    let atCount = arr.length;
    if( atCount < 2 ){
      return true;
    } else if(atCount > 2 || arr[0]==="" || arr[1]===""){
      return true;
    }
    if(/\s/.test(email)){
      return true;
    }

    return false;
  }

}
export default App;