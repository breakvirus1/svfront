import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import './ZakazList.css'; // We'll create this CSS file next

const ZakazList = () => {
    const [zakazList, setZakazList] = useState([]);
    const [subZakazList, setSubZakazList] = useState({});
    const [newZakazSum, setNewZakazSum] = useState("");
    const [useridresponse, setUseridresponse] = useState("");
    const [usernameresponse, setUsernameresponse] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchZakazList = async () => {
            try {


                const useridresponse = await axios.get('api/user/me-id');
                const usernameresponse = await axios.get('api/user/me-name');
                setUseridresponse(useridresponse.data);
                setUsernameresponse(usernameresponse.data);
                const response = await axios.get('/api/users/zakaz/all', {

                    params: { id: parseInt(useridresponse.data) }
                });
                setZakazList(response.data.zakazList);
            } catch (error) {
                console.error('Error fetching zakaz list:', error);
                navigate("/subzakaztodolist");
            }
        };

        fetchZakazList();
    }, [navigate]);

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

    const handleAddZakaz = async () => {
        try {
            const response = await axios.post('/api/users/zakaz', {
                sum: parseInt(newZakazSum)
            });
            setZakazList([...zakazList, response.data]);
            setNewZakazSum("");
        } catch (error) {
            console.error('Error adding zakaz:', error);
        }
    };

    return (
        <div className="zakaz-list-container">
            <h1 className="zakaz-list-title">Список заказов</h1>
            <h2 className="zakaz-list-title">Твой id: {useridresponse}</h2>
            <h2 className="zakaz-list-title">Вошел как: {usernameresponse}</h2>

            <div className="add-zakaz-form">
                <input
                    type="number"
                    value={newZakazSum}
                    onChange={(e) => setNewZakazSum(e.target.value)}
                    placeholder="Enter order sum"
                    className="zakaz-input"
                />
                <button onClick={handleAddZakaz} className="add-zakaz-button">Add Order</button>
            </div>
            <ul className="zakaz-list">
                {zakazList.map(zakaz => (
                    <li key={zakaz.id} className="zakaz-item">
                        <div onClick={() => fetchSubZakazList(zakaz.id)} className="zakaz-header">
                            <h2 className="zakaz-id">Zakaz ID: {zakaz.id}</h2>
                            <p className="zakaz-sum">Sum: {zakaz.sum}</p>
                        </div>
                        {subZakazList[zakaz.id] && (
                            <ul className="sub-zakaz-list">
                                {subZakazList[zakaz.id].map(subZakaz => (
                                    <li key={subZakaz.id} className="sub-zakaz-item">
                                        <p className="sub-zakaz-material">Material: {subZakaz.material}</p>
                                        <p className="sub-zakaz-width">Width: {subZakaz.width}</p>
                                        <p className="sub-zakaz-height">Height: {subZakaz.height}</p>
                                        <p className="sub-zakaz-cena">Cena: {subZakaz.cena}</p>
                                        <p className="sub-zakaz-total">Total: {subZakaz.width * subZakaz.height * subZakaz.cena}</p>
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