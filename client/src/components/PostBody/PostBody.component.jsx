import React from 'react';
import MarkdownView from '../MarkdownView/MarkdownView.component';

const PostBody = ({message, image}) => {
    return ( 
        <div>
            {
                image ?
                <img width="100%" className="my-1" src={image.url} alt="" />:
                <MarkdownView>{message}</MarkdownView>
            }
        </div>
     );
}
 
export default PostBody;