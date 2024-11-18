"use client"
import React, { useState } from 'react';

const App = () => {
    const [file, setFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setErrorMessage('');
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setErrorMessage('Por favor, selecione um arquivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setDownloadUrl(url);
            } else {
                const errorText = await response.text();
                setErrorMessage(`Erro no upload: ${errorText}`);
            }
        } catch (error) {
            setErrorMessage('Erro ao tentar se conectar ao servidor.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Conversão de Arquivos para Excel
                </h1>
                <form onSubmit={handleUpload} className="space-y-4">
                    <input
                        type="file"
                        accept=".pdf, .xml, .txt"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    >
                        Upload
                    </button>
                </form>
                {downloadUrl && (
                    <div className="mt-4 text-center">
                        <a
                            href={downloadUrl}
                            download="dados_espectrais.xlsx"
                            className="text-blue-500 hover:underline"
                        >
                            Baixar Excel
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
