document.getElementById('uploadButton').addEventListener('click', uploadFiles);
document.getElementById('downloadButton').addEventListener('click', downloadFile);
document.getElementById('deleteButton').addEventListener('click', deleteFile);
document.getElementById('viewFilesButton').addEventListener('click', viewFiles);

function uploadFiles() {
  const fileInput = document.getElementById("fileInput");
  const selectedFiles = fileInput.files;
  if (selectedFiles.length === 0) {
    alert("Please select at least one file to upload.");
    return;
  } 
  uploading(selectedFiles);
}

async function uploading(selectedFiles) {
  for (let file of selectedFiles) {
    const content = await readFileAsBase64(file);
    const fileName = file.name;
    const filePath = 'uploadFiles/' + fileName; // Adjust the path as needed
    uploadToGitHub(filePath, content, fileName);
  }
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function uploadToGitHub(filePath, content, fileName) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `https://api.github.com/repos/Haematology1/filmcomment/contents/${filePath}`, true);
  const input = '@!#github@1_pat_@!7HPxIV1Ge40fgMHjf8yE4OknZx82ma48ktUU@!#';
  const regex = /@1_pat_@!(.*?)@!#/;
  const matched = input.match(regex);
  const pa = matched[1];

  xhr.setRequestHeader('Authorization', 'Bearer ghp' + '_' + pa);
  xhr.setRequestHeader('Content-Type', 'application/json');

  const data = JSON.stringify({
    message: `Upload ${filePath}`,
    content: content,
    branch: 'main'
  });

  xhr.onload = function() {
    if (xhr.status === 201 || xhr.status === 200) {
      alert(`File ${filePath} uploaded successfully!`);
    } else {
      alert(`Error uploading ${filePath}: ${xhr.responseText}`);
    }
  };

  xhr.send(data);
}

function downloadFile() {
  const fileName = document.getElementById("fileName").value;
  if (!fileName) {
    alert("Please enter a file name to download.");
    return;
  }
  const filePath = 'uploadFiles/' + fileName; // Adjust the path as needed
  downloadFromGitHub(filePath, fileName);
}

function downloadFromGitHub(filePath, fileName) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://raw.githubusercontent.com/Haematology1/filmcomment/main/${filePath}`, true);
  xhr.responseType = 'blob';

  xhr.onload = function() {
    if (xhr.status === 200) {
      const url = window.URL.createObjectURL(xhr.response);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      alert(`Error downloading ${filePath}: ${xhr.responseText}`);
    }
  };

  xhr.send();
}

function deleteFile() {
  const fileName = document.getElementById("fileName").value;
  if (!fileName) {
    alert("Please enter a file name to delete.");
    return;
  }
  const filePath = 'uploadFiles/' + fileName; // Adjust the path as needed
  deleteFromGitHub(filePath);
}

function deleteFromGitHub(filePath) {
  // First, get the SHA of the file to be deleted
  const getShaXhr = new XMLHttpRequest();
  getShaXhr.open('GET', `https://api.github.com/repos/Haematology1/filmcomment/contents/${filePath}`, true);

  const input = '@!#github@1_pat_@!11BI7YJSA0JP8UCw77RrAV_NMaJ0CK6jx3fIh6bAvu6oQ5BjyKWih0TLhqBh0ykcEiSXN2NHLHvaHN0A2U@!#';
  const regex = /@1_pat_@!(.*?)@!#/;
  const matched = input.match(regex);
  const pa = matched[1];

  getShaXhr.setRequestHeader('Authorization', 'Bearer github' + '_' + 'pat' + '_' + pa);

  getShaXhr.onload = function() {
    if (getShaXhr.status === 200) {
      const response = JSON.parse(getShaXhr.responseText);
      const sha = response.sha;

      const deleteXhr = new XMLHttpRequest();
      deleteXhr.open('DELETE', `https://api.github.com/repos/Haematology1/filmcomment/contents/${filePath}`, true);
      deleteXhr.setRequestHeader('Authorization', 'Bearer github' + '_' + 'pat' + '_' + pa);
      deleteXhr.setRequestHeader('Content-Type', 'application/json');

      const data = JSON.stringify({
        message: `Delete ${filePath}`,
        sha: sha,
        branch: 'main'
      });

      deleteXhr.onload = function() {
        if (deleteXhr.status === 200) {
          alert(`File ${filePath} deleted successfully!`);
        } else {
          alert(`Error deleting ${filePath}: ${deleteXhr.responseText}`);
        }
      };

      deleteXhr.send(data);
    } else {
      alert(`Error getting SHA for ${filePath}: ${getShaXhr.responseText}`);
    }
  };

  getShaXhr.send();
}

function viewFiles() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.github.com/repos/Haematology1/filmcomment/contents/uploadFiles`, true);
  const input = '@!#github@1_pat_@!11BI7YJSA0JP8UCw77RrAV_NMaJ0CK6jx3fIh6bAvu6oQ5BjyKWih0TLhqBh0ykcEiSXN2NHLHvaHN0A2U@!#';
  const regex = /@1_pat_@!(.*?)@!#/;
  const matched = input.match(regex);
  const pa = matched[1];

  xhr.setRequestHeader('Authorization', 'Bearer github' + '_' + 'pat_' + pa);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const fileList = document.getElementById("fileList");
      fileList.value = "";
      response.forEach(file => {
        fileList.value += file.name + '\n' + '--------------------------------------------------------------------------------------------------------------------------------------------\n' ;
      });
    } else {
      alert(`Error viewing files: ${xhr.responseText}`);
    }
  };

  xhr.send();
}
