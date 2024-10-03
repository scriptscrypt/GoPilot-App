import axios from 'axios';
import { GP_API_URL_DEV } from '../apiConfig/apiConstants';

export const apiUploadBase64ImageKit = async (base64Image: string, fileName: string): Promise<{ success: boolean; url?: string; fileId?: string; error?: string }> => {
    try {
        const response = await axios.post(`${GP_API_URL_DEV}/upload`, {
            image: base64Image,
            fileName: fileName,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            success: true,
            url: response.data.url,
            fileId: response.data.fileId,
        };
    } catch (error) {
        console.error('Error uploading image:', error);

        if (axios.isAxiosError(error)) {
            return {
                success: false,
                error: error.response?.data?.error || error.message || 'An error occurred during the upload',
            };
        } else {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unknown error occurred',
            };
        }
    }
};