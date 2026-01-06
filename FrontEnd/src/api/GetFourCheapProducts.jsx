import axios from "axios";

export async function GetFourCheapProducts() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/products/get-four-cheap-products");
        
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