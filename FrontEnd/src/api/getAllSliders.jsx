import React from 'react'
import axios from "axios";

export async function GetAllSliders() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/sliders");
                
        if (response.data && response.data.data) {
            return response.data.data;
        } 
        else if (Array.isArray(response.data)) {
            return response.data;
        }
        else {
            console.warn("ساختار پاسخ غیرمنتظره:", response.data);
            return [];
        }
    } catch (error) {
        console.error("خطا در دریافت اسلایدر ها:", error);
        throw error; 
    }
}