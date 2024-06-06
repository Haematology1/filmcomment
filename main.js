
function uploadFiles() {
    const fileInput = document.getElementById("fileInput");
    const selectedFiles = fileInput.files;
    if (selectedFiles.length === 0) {
    alert("Please select at least one file to upload.");
    return;
  }
    uploading(selectedFiles);
  }

  function uploading(selectedFiles) {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files[]", selectedFiles[i]);
      }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.github.com/repos/:owner/:repo/contents/:path', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + your_personal_access_token);    
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
             // Handle successful response from the server
            console.log('Files uploaded successfully!');
            alert("Files uploaded successfully!");
          } else {
             // Handle error response from the server
            console.error('Failed to upload files.');
           alert("Error occurred during file upload. Please try again.");
          }
        }
      };
      xhr.send(formData);
      
  }





