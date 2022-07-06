import React, {useState} from 'react'


export default function TextForm(props) {
    const handleUpClick = () =>{
        // console.log("upperCase was clicked: "+text)
        let newText =text.toUpperCase();
        setText(newText)
    }

    const handleLowClick = () =>{
        
        let newText =text.toLowerCase();
        setText(newText)
    }
    const handleClearClick = () =>{
        
        let newText =""
        setText(newText)
    }
    const handleCopyClick = () =>{
        
        var newText =document.getElementById("myBox");
        newText.select();
        navigator.clipboard.writeText(newText.value);
        
    }
    const handleSpaceClick = () =>{
        
        let newText =text.split(/[ ]+/);
        setText(newText.join(" "))
    }
    

    
    
    const handleOnChange = (event) =>{
        // console.log("On Change")
        setText(event.target.value);
    }

    const [text, setText] = useState('');
    // text = "new text" //wrong way to do this
    // setText("new text")  //correct way to do this
  return (
    <>
    <div className="container">
        <h1>{props.heading}</h1>
<div className="mb-3">

  <textarea className="form-control" value={text} onChange = {handleOnChange} style={{backgroundcolour: props.mode==='dark'?'Grey':'white',color:props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
</div>
<button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert To Upper case </button>
<button className="btn btn-primary mx-2 " onClick={handleLowClick}>Convert To Lower case </button>
<button className="btn btn-primary mx-2 " onClick={handleClearClick}>Clear </button>
<button className="btn btn-primary mx-2 " onClick={handleCopyClick}>Copy </button>
<button className="btn btn-primary mx-2 " onClick={handleSpaceClick}>Remove Extra Line</button>


    </div>
    <div className="container my-3" >
        <h2>Your Text Summary</h2>
        <p>{text.split(" " ).length} Words and {text.length} character</p>
        <p>{0.008 *text.split(" " ).length} Minutes </p>
        <h2>Preview</h2>
        <p>{text}</p>
   
   
    </div>
    </>
  )
}
