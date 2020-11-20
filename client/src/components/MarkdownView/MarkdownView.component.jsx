import React from 'react';
import MarkdownIt from 'markdown-it';
import ReactHtmlParser from "react-html-parser";


const MarkdownView = ({children}) => {
    const mdParser = new MarkdownIt()


    return(
        <div>        
            {ReactHtmlParser(mdParser.render(children))}
        </div>
    )
}

export default MarkdownView