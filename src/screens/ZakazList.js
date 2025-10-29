import React, { useState, useEffect } from 'react';
import axios from  "../axiosConfig";


const ZakazList = () => {
    const [zakazList, setZakazList] = useState([]);
    const [subZakazList, setSubZakazList] = useState({});

    useEffect(() => {

        const fetchZakazList = async () => {
            
            try {
                const userId = await.get('/api/users/')
                const response = await axios.get('/api/users/zakaz/all', {
                    params: { id: 1} 
                });
                setZakazList(response.data.zakazList);
            } catch (error) {
                console.error('Error fetching zakaz list:', error);
                navigate("/subzakaztodolist");
            }
        };

        fetchZakazList();
    }, []);

    const fetchSubZakazList = async (zakazId) => {
        try {
            const response = await axios.get(`/api/subzakaz/${zakazId}`);
            setSubZakazList(prevState => ({
                ...prevState,
                [zakazId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching sub zakaz list:', error);
        }
    };

    return (
        <div>
            <h1>Zakaz List</h1>
            <ul>
                {zakazList.map(zakaz => (
                    <li key={zakaz.id}>
                        <div onClick={() => fetchSubZakazList(zakaz.id)}>
                            <h2>Zakaz ID: {zakaz.id}</h2>
                            <p>Sum: {zakaz.sum}</p>
                        </div>
                        {subZakazList[zakaz.id] && (
                            <ul>
                                {subZakazList[zakaz.id].map(subZakaz => (
                                    <li key={subZakaz.id}>
                                        <p>Material: {subZakaz.material}</p>
                                        <p>Width: {subZakaz.width}</p>
                                        <p>Height: {subZakaz.height}</p>
                                        <p>Cena: {subZakaz.cena}</p>
                                        <p>Total: {subZakaz.width * subZakaz.height * subZakaz.cena}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ZakazList;