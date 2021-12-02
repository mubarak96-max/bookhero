//React component that that has an input field for files and a button to upload the file.
import { parse } from 'papa-parser';

const Upload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type='file' onChange={onChange} />
        <button type='submit'>Upload</button>
      </div>
    </form>
  );
};
