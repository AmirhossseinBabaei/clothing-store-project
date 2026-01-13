import React from 'react'

export async function getAllSliders() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/dashboard/sliders");
                
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
        console.error("خطا در دریافت محصولات:", error);
        throw error; 
    }
}