import React, { useState } from 'react';
import axios from  "../axiosConfig";


const SubZakazTodoList = () => {
    const [subZakaz, setSubZakaz] = useState({
        material: '',
        width: 0,
        height: 0,
        cena: 0,
        total: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubZakaz(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateTotal = () => {
        const { width, height, cena } = subZakaz;
        const total = width * height * cena;
        setSubZakaz(prevState => ({
            ...prevState,
            total: total
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/subzakaz', subZakaz);
            console.log('SubZakaz created:', response.data);
            // Reset form after successful submission
            setSubZakaz({
                material: '',
                width: 0,
                height: 0,
                cena: 0,
                total: 0
            });
        } catch (error) {
            console.error('Error creating sub zakaz:', error);
        }
    };

    return (
        <div>
            <h1>SubZakaz Todo List</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Material:</label>
                    <input
                        type="text"
                        name="material"
                        value={subZakaz.material}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Width:</label>
                    <input
                        type="number"
                        name="width"
                        value={subZakaz.width}
                        onChange={handleInputChange}
                        onBlur={calculateTotal}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type="number"
                        name="height"
                        value={subZakaz.height}
                        onChange={handleInputChange}
                        onBlur={calculateTotal}
                    />
                </div>
                <div>
                    <label>Cena:</label>
                    <input
                        type="number"
                        name="cena"
                        value={subZakaz.cena}
                        onChange={handleInputChange}
                        onBlur={calculateTotal}
                    />
                </div>
                <div>
                    <label>Total:</label>
                    <input
                        type="number"
                        name="total"
                        value={subZakaz.total}
                        readOnly
                    />
                </div>
                <button type="submit">Add SubZakaz</button>
            </form>
        </div>
    );
};

export default SubZakazTodoList;