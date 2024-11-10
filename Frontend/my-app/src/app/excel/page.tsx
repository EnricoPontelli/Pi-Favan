

import React, { useState } from 'react';

function PdfToExcel() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = async () => {
    // Aqui você adicionaria a lógica para converter o arquivo PDF para Excel
    alert('Conversão em andamento...');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <header className="w-full bg-gray-700 text-white px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">SPECTRASYNC</div>
        <nav className="flex space-x-8">
          <a href="#ferramentas" className="text-white hover:text-gray-300">FERRAMENTAS</a>
          <a href="#conversao" className="text-white hover:text-gray-300">CONVERSÃO</a>
          <a href="#ajuda" className="text-white hover:text-gray-300">AJUDA</a>
        </nav>
      </header>

      
      <main className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800">CONVERSÃO DE PDF PARA EXCEL</h1>
        <p className="text-gray-600 mt-2 mb-8">Converta dados em PDF para uma tabela Excel.</p>
        
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
        >
          <span>SELECIONE O ARQUIVO</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {file && (
          <button
            onClick={handleConvert}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Converter para Excel
          </button>
        )}
      </main>
    </div>
  );
}

export default PdfToExcel;
