import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Logo() {

    const navigate = useNavigate();

    useEffect(() => {
        const downloadLogo = async () => {
            // download the file Logo.png from public folder
            const response = await fetch('/Logo.png');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = 'Logo.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        try {
            downloadLogo();
        } catch (error) {
            console.log(error);
        }

        navigate('/home');
    }, []);


    return (<div>
        
    </div>);
};    