import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase'; 
import { storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id,
        }));
        setMovieList(filteredData)
      }catch(error){
        console.error(error);
      }
    };
    getMovieList();
  }, []);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle})
  };


  const onSubmitMovie = async () => {
    try{
    await addDoc(moviesCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
    });
    }catch(error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    }catch(error){
      console.error(error)
    }
  }

 
  return (
    <div className="App">
      <Auth />

      <div className='mt-5'>
        <input type="text" placeholder='Movie Title' className='me-2'onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input type="number" placeholder='Release Date' onChange={(e) => setNewReleaseDate (Number(e.target.value))}/>
        <input type="checkbox" className='ms-2' checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie} type="submit" className='btn btn-secondary text-white ms-2'>Submit Movie</button>
      </div>

      <div className='mt-4'>
        {movieList.map((movie) =>(
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)} className='btn btn-danger text-white me-1'>Delete Movie</button>
            <input type="text" placeholder='New Title' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)} className='btn btn-secondary ms-2' >Update Title</button>
          </div>
        ))}
      </div>

      <div className='my-5 '>
          <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
          <button onClick={uploadFile} className='btn btn-primary'>Upload File</button>
      </div>
    </div>
  );
}

export default App;
