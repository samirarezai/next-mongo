import React, {FC, useState} from 'react';
import axios from "axios";

const Add:FC<{
    callback:()=>void
}> = ({callback}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: 0
    });

    const handleSubmit = async (e : any) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users', {...formData , age: +formData.age });

            if (response.status === 201) {
                const newUser = response.data;
                console.log('New user created:', newUser);
                // Optionally, reset the form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    age: 0
                });
                callback();
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleChange = (e : any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={formData.name}
                       onChange={handleChange}/>
            </div>
            <div className="mb-4">

                <label htmlFor="email">Email
                </label>
                <input id="email" name="email" type="text" value={formData.email}
                       onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" value={formData.age}
                       onChange={handleChange}/>
            </div>

            <button type="submit">Add</button>
        </form>
    );
};

export default Add;