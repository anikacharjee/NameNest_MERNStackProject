// import React, { useState } from 'react';
// import axios from 'axios';

// const NameForm = () => {
//     const [name, setName] = useState('');
//     const [response, setResponse] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3001/api/data', { name });
//             setResponse(res.data);
//             setName('');
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter name"
//                     required
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             {response && (
//                 <div>
//                     <p>Added: {response.name} (ID: {response.id})</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NameForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const NameForm = () => {
//     const [name, setName] = useState('');
//     const [namesList, setNamesList] = useState([]);

//     // Fetch all names on component mount
//     useEffect(() => {
//         fetchNames();
//     }, []);

//     const fetchNames = async () => {
//         try {
//             const res = await axios.get('http://localhost:3001/api/data');
//             setNamesList(res.data);
//         } catch (err) {
//             console.error('Error fetching names:', err);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3001/api/data', { name });
//             setNamesList(prev => [...prev, res.data]); // Add new name to list
//             setName('');
//         } catch (err) {
//             console.error('Error adding name:', err);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter name"
//                     required
//                 />
//                 <button type="submit">Submit</button>
//             </form>

//             <h3>All Submitted Names:</h3>
//             <ul>
//                 {namesList.map((item) => (
//                     <li key={item.id}>
//                         {item.id}. {item.name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default NameForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const NameForm = () => {
    const [name, setName] = useState('');
    const [namesList, setNamesList] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchNames();
    }, []);

    const fetchNames = async () => {
        const res = await axios.get('http://localhost:3001/api/data');
        setNamesList(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId !== null) {
            const res = await axios.put(`http://localhost:3001/api/data/${editId}`, { name });
            setNamesList(prev =>
                prev.map(item => (item.id === editId ? res.data : item))
            );
            setEditId(null);
        } else {
            const res = await axios.post('http://localhost:3001/api/data', { name });
            setNamesList(prev => [...prev, res.data]);
        }
        setName('');
    };

    const handleEdit = (item) => {
        setName(item.name);
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/api/data/${id}`);
        setNamesList(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="container">
            <h1>NameNest 🐣</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                />
                <button type="submit">{editId ? 'Update' : 'Submit'}</button>
            </form>

            <h3>All Submitted Names</h3>
            <ul className="name-list">
                {namesList.map((item) => (
                    <li key={item.id} className="name-item">
                        <span>{item.id}. {item.name}</span>
                        <span className="name-actions">
                            <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NameForm;


