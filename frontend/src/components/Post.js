// import React, { useState } from 'react'
import '../styles/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons'




// Import
import React, { useState } from 'react'
import axios from 'axios'

// Component
function Post() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [content, setContent] = useState('')
  const [attachement, setAttachement] = useState(null)

  // Initialisation de bouton
  const handleSubmit = (e) => {
    // e.preventDefault()
    let formData = new FormData();
    formData.append('content', content);
    formData.append('attachement', attachement);
    // const formData = {
    //     content: content, 
    //     attachement: attachement
    // }

    axios({
      method: 'post',
      url: 'http://localhost:3000/api/posts/',
      data: formData,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
        window.alert('Publication impossible')
      })
  }

  return (
    <>
            <div className="App-body">
              <form className="App-post">
              <h1 className="post-title">Exprimez-vous :</h1>
              <div>
              {attachement && (
                <div className="postimg-container">
                  <img className="post-img" alt="" src={URL.createObjectURL(attachement)}/>
                  <button onClick={() => setAttachement(null)} className="delete-img">
                  <FontAwesomeIcon icon={faTimesCircle} className="deleteimg-icon"></FontAwesomeIcon>  
                  </button>
                </div>
              )}
              </div>
              <div className="post-container">
              <textarea type="text" className="textarea" maxLength="250" placeholder={'Quoi de neuf, ' + user['firstName'] + ' ?'} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
              <input type="file" name="attachement" className="input-file" onChange={(e) => {setAttachement(e.target.files[0])}}/>
              <label className="file-cover">
                <FontAwesomeIcon icon={faImage} className="file-icon"></FontAwesomeIcon>
              </label>
              <button type="button" onClick={handleSubmit} className="login-button"> Publier </button>
            </div>
            </form>
            </div>
    </>
  )
}

export default Post






// function Post() {
//     const [shouldShowPreview, setshouldShowPreview] = useState(false)
//     let imagePreviewUrl = "";
//     const loadImage = e => {
//         const [file] = e.target.files
//         if (file) {
//             const fileUrl = URL.createObjectURL(file)
//             setshouldShowPreview(true);
//             setAttachement(file.src);
//             imagePreviewUrl = fileUrl;
//   }
//     } 
//     const user = JSON.parse(localStorage.getItem('user'))
//     const [content, setContent] = useState("")
//     const [attachement, setAttachement] = useState(false)

//     const handleSubmit = e => {
//         e.preventDefault()

//         const data = {  
//             content: content,
//             attachement: attachement, 
//         }



//         fetch('http://localhost:3000/api/posts', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//     })
//     .then(res => res.json())
//     .then(() => {
//         window.location.href = '/Home'
//     })
//         .catch( (error) => {
//             alert(error)
//         })
//     }

//     return (
//         <div className="App-body">
//             <form className="App-post" onSubmit={e => handleSubmit(e)}>
//                 <h1>Exprimez-vous :</h1>
//                 <label>
//                     <br/>
//                     <textarea type="text" name="message" placeholder={'Quoi de neuf, ' + user['firstName'] + ' ?'} className="textarea" maxLength="250" value={content} onChange={e => setContent(e.target.value)}></textarea>
//                 </label>
//                 <label htmlFor="attachement" className="file-cover"> 
//                 <input type="file" name="image" id="file"  accept=".jpg" placeholder="Image" className="input-file"  onChange={(e) => {setAttachement(e.target.files[0])}}></input>
//                 {/* {
//                     shouldShowPreview  ? 
//                     <img id="imagePreview" src={imagePreviewUrl} width="100px"/> :
//                     <FontAwesomeIcon icon={faImage} className="file-icon"></FontAwesomeIcon>
//                 } */}
//                     <FontAwesomeIcon icon={faImage} className="file-icon"></FontAwesomeIcon>
//                 </label>

//                 <button className="login-button">Publier</button>
//             </form>
//         </div>
//     )
// }



// export default Post; 