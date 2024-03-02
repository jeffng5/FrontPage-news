import React from 'react'
import './css/App.css'

const ArchiveArticleCard = ({title, url, description, author}) => {


// returning the passed data thru structured html     
return (
    <>
    <h6 className= 'divider-card'>
<h6 className='archive-card'>Title: {title} </h6>
<h6 className='archive-card'>Description: {description}</h6>
<h6 className = 'archive-card'><a href={url}>{url}</a></h6> 
<h6 className='archive-card-1'>By : {author}</h6>
</h6>
</>
)
}

export default ArchiveArticleCard