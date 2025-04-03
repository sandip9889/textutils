import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [textColor, setTextColor] = useState('black');
    const [textSize, setTextSize] = useState('16px');
    const [textAlign, setTextAlign] = useState('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [highlightColor, setHighlightColor] = useState('transparent');
    const [lineSpacing, setLineSpacing] = useState('1.5');
    const [indentation, setIndentation] = useState('0');
    const [showWordFrequency, setShowWordFrequency] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [showEmoji, setShowEmoji] = useState(false);
    const [validationType, setValidationType] = useState('none');
    const [validationResult, setValidationResult] = useState('');

    const handleUpClick = () =>{
        let newText = text.toUpperCase();
        setText(newText)
    }

    const handleLowClick = () =>{
        let newText = text.toLowerCase();
        setText(newText)
    }

    const handleClearClick = () =>{
        let newText = ""
        setText(newText)
    }

    const handleCopyClick = () =>{
        var newText = document.getElementById("myBox");
        newText.select();
        navigator.clipboard.writeText(newText.value);
    }

    const handleSpaceClick = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
    }

    const handleFindReplace = () => {
        let newText = text.replace(new RegExp(findText, 'g'), replaceText);
        setText(newText);
    }

    const handleTextColorChange = (color) => {
        setTextColor(color);
    }

    const handleTextSizeChange = (size) => {
        setTextSize(size);
    }

    const handleTextAlignChange = (alignment) => {
        setTextAlign(alignment);
    }

    const handleTextToSpeech = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    const handleEncrypt = () => {
        let newText = text.split('').map(char => 
            String.fromCharCode(char.charCodeAt(0) + 1)
        ).join('');
        setText(newText);
    }

    const handleDecrypt = () => {
        let newText = text.split('').map(char => 
            String.fromCharCode(char.charCodeAt(0) - 1)
        ).join('');
        setText(newText);
    }

    const handleOnChange = (event) =>{
        setText(event.target.value);
    }

    const handleTitleCase = () => {
        let newText = text.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
        setText(newText);
    }

    const handleAlternatingCase = () => {
        let newText = text.split('').map((char, index) => 
            index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        ).join('');
        setText(newText);
    }

    const handleHighlightColor = (color) => {
        setHighlightColor(color);
    }

    const handleLineSpacing = (spacing) => {
        setLineSpacing(spacing);
    }

    const handleIndentation = (indent) => {
        setIndentation(indent);
    }

    const getWordFrequency = () => {
        const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        return Object.entries(frequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
    }

    const handleTranslate = async () => {
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`);
            const data = await response.json();
            setText(data.responseData.translatedText);
        } catch (error) {
            console.error('Translation error:', error);
        }
    }

    const handleTextToEmoji = () => {
        const emojiMap = {
            'happy': '😊',
            'sad': '😢',
            'love': '❤️',
            'laugh': '😂',
            'angry': '😠',
            'cool': '😎',
            'heart': '❤️',
            'star': '⭐',
            'fire': '🔥',
            'thumbs up': '👍'
        };
        
        let newText = text;
        Object.entries(emojiMap).forEach(([word, emoji]) => {
            const regex = new RegExp(word, 'gi');
            newText = newText.replace(regex, emoji);
        });
        setText(newText);
    }

    const handleSummarize = () => {
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.length > 0);
        const summary = sentences.slice(0, 3).join('. ') + '.';
        setText(summary);
    }

    const validateText = () => {
        let result = '';
        switch(validationType) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                result = emailRegex.test(text) ? 'Valid email' : 'Invalid email';
                break;
            case 'phone':
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                result = phoneRegex.test(text) ? 'Valid phone number' : 'Invalid phone number';
                break;
            case 'url':
                const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                result = urlRegex.test(text) ? 'Valid URL' : 'Invalid URL';
                break;
        }
        setValidationResult(result);
    }

    const handleExport = (format) => {
        switch(format) {
            case 'txt':
                const blob = new Blob([text], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'textutils.txt';
                a.click();
                window.URL.revokeObjectURL(url);
                break;
            case 'pdf':
                // You would need to add a PDF library like jsPDF for this
                console.log('PDF export would be implemented here');
                break;
        }
    }

    const getTextStyle = () => {
        return {
            color: textColor,
            fontSize: textSize,
            textAlign: textAlign,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            backgroundColor: highlightColor,
            lineHeight: lineSpacing,
            paddingLeft: `${indentation}px`
        };
    }

    return (
        <>
        <div className="container">
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea 
                    className="form-control" 
                    value={text} 
                    onChange={handleOnChange} 
                    style={{
                        backgroundColor: props.mode === 'dark' ? 'Grey' : 'white',
                        color: props.mode === 'dark' ? 'white' : 'black',
                        ...getTextStyle()
                    }} 
                    id="myBox" 
                    rows="8"
                ></textarea>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h4>Text Formatting</h4>
                    <button className={`btn btn-${isBold ? 'success' : 'primary'} mx-1`} onClick={() => setIsBold(!isBold)}>Bold</button>
                    <button className={`btn btn-${isItalic ? 'success' : 'primary'} mx-1`} onClick={() => setIsItalic(!isItalic)}>Italic</button>
                    <button className={`btn btn-${isUnderline ? 'success' : 'primary'} mx-1`} onClick={() => setIsUnderline(!isUnderline)}>Underline</button>
                </div>
                <div className="col-md-6">
                    <h4>Text Alignment</h4>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextAlignChange('left')}>Left</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextAlignChange('center')}>Center</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextAlignChange('right')}>Right</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h4>Text Color</h4>
                    <button className="btn btn-danger mx-1" onClick={() => handleTextColorChange('red')}>Red</button>
                    <button className="btn btn-success mx-1" onClick={() => handleTextColorChange('green')}>Green</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextColorChange('blue')}>Blue</button>
                </div>
                <div className="col-md-6">
                    <h4>Text Size</h4>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextSizeChange('12px')}>Small</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextSizeChange('16px')}>Medium</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleTextSizeChange('20px')}>Large</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h4>Text Highlighting</h4>
                    <button className="btn btn-warning mx-1" onClick={() => handleHighlightColor('yellow')}>Yellow</button>
                    <button className="btn btn-info mx-1" onClick={() => handleHighlightColor('lightblue')}>Blue</button>
                    <button className="btn btn-success mx-1" onClick={() => handleHighlightColor('lightgreen')}>Green</button>
                </div>
                <div className="col-md-6">
                    <h4>Line Spacing</h4>
                    <button className="btn btn-primary mx-1" onClick={() => handleLineSpacing('1')}>Single</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleLineSpacing('1.5')}>1.5</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleLineSpacing('2')}>Double</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h4>Case Variations</h4>
                    <button className="btn btn-primary mx-1" onClick={handleTitleCase}>Title Case</button>
                    <button className="btn btn-primary mx-1" onClick={handleAlternatingCase}>Alternating Case</button>
                    <button className="btn btn-primary mx-1" onClick={handleUpClick}>UpperCase</button>
                    <button className="btn btn-primary mx-1" onClick={handleLowClick}>LowerCase</button>
                </div>
                <div className="col-md-6">
                    <h4>Indentation</h4>
                    <button className="btn btn-primary mx-1" onClick={() => handleIndentation('20')}>Indent</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleIndentation('0')}>Unindent</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h4>Advanced Features</h4>
                    <button className="btn btn-primary mx-1" onClick={handleTextToSpeech}>Text to Speech</button>
                    <button className="btn btn-primary mx-1" onClick={handleEncrypt}>Encrypt</button>
                    <button className="btn btn-primary mx-1" onClick={handleDecrypt}>Decrypt</button>
                    <button className="btn btn-primary mx-1" onClick={handleTextToEmoji}>Text to Emoji</button>
                </div>
                <div className="col-md-6">
                    <h4>Translation</h4>
                    <select className="form-select d-inline-block w-auto mx-2" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                    </select>
                    <button className="btn btn-primary" onClick={handleTranslate}>Translate</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h4>Text Validation</h4>
                    <select className="form-select d-inline-block w-auto mx-2" value={validationType} onChange={(e) => setValidationType(e.target.value)}>
                        <option value="none">Select Type</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="url">URL</option>
                    </select>
                    <button className="btn btn-primary" onClick={validateText}>Validate</button>
                    {validationResult && <span className="ms-2">{validationResult}</span>}
                </div>
                <div className="col-md-6">
                    <h4>Export Options</h4>
                    <button className="btn btn-primary mx-1" onClick={() => handleExport('txt')}>Export as TXT</button>
                    <button className="btn btn-primary mx-1" onClick={() => handleExport('pdf')}>Export as PDF</button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <h4>Find and Replace</h4>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Find text" 
                            value={findText} 
                            onChange={(e) => setFindText(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Replace with" 
                            value={replaceText} 
                            onChange={(e) => setReplaceText(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleFindReplace}>Replace</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="container my-3">
            <h2>Text Statistics</h2>
            <p>Words: {text.split(/\s+/).filter(word => word.length > 0).length}</p>
            <p>Characters: {text.length}</p>
            <p>Sentences: {text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length}</p>
            <p>Paragraphs: {text.split(/\n\s*\n/).filter(para => para.length > 0).length}</p>
            <p>Reading Time: {0.008 * text.split(/\s+/).filter(word => word.length > 0).length} minutes</p>
            
            <button className="btn btn-primary mb-2" onClick={() => setShowWordFrequency(!showWordFrequency)}>
                {showWordFrequency ? 'Hide' : 'Show'} Word Frequency
            </button>
            
            {showWordFrequency && (
                <div className="mt-2">
                    <h4>Top 10 Most Used Words:</h4>
                    <ul>
                        {getWordFrequency().map(([word, count]) => (
                            <li key={word}>{word}: {count} times</li>
                        ))}
                    </ul>
                </div>
            )}
            
            <h2>Preview</h2>
            <p style={getTextStyle()}>{text}</p>
        </div>
        </>
    )
}
