import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleChange= (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                setMovie({
                    id: '',
                    title: '',
                    director: '',
                    metascore: '',
                    stars: []
                })
                props.history.push(`/`)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <form onSubmit={handleSubmit}>

            <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange}/>

            <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange}/>

            <input type="number" name="metascore" placeholder="Metascore" value={movie.metascore} onChange={handleChange}/>

            {/* <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange}/> */}

            <button type='submit'>Submit</button>

        </form>
    )
}

export default UpdateMovie;