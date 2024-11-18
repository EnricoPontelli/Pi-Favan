from flask import Flask, request, send_file
from flask_cors import CORS
import pdfplumber
import pandas as pd
import os
import xml.etree.ElementTree as ET
import locale

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "Nenhum arquivo enviado.", 400

    file = request.files['file']
    if file.filename == '':
        return "Nenhum arquivo selecionado.", 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    if file.filename.endswith('.pdf'):
        spectral_data = process_pdf(file_path)
    elif file.filename.endswith('.xml'):
        spectral_data = process_xml(file_path)
    elif file.filename.endswith('.txt'):
        spectral_data = process_txt(file_path)
    else:
        return "Tipo de arquivo não suportado. Envie .pdf, .xml ou .txt.", 400

    if not spectral_data:
        return "Nenhum dado válido encontrado no arquivo.", 400

    excel_path = os.path.join(UPLOAD_FOLDER, 'dados_espectrais.xlsx')
    df = pd.DataFrame(spectral_data)
    df.to_excel(excel_path, index=False)

    return send_file(excel_path, as_attachment=True)

def process_pdf(pdf_path):
    data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                for line in text.split('\n'):
                    if "Wavelength:" in line and "Intensity:" in line:
                        parts = line.split()
                        try:
                            wavelength = float(parts[1])
                            intensity = float(parts[3])
                            data.append({"Wavelength": wavelength, "Intensity": intensity})
                        except (IndexError, ValueError):
                            continue
    return data

def process_xml(xml_path):
    data = []
    tree = ET.parse(xml_path)
    root = tree.getroot()

    for data_element in root.findall('data'):
        try:
            wavelength = float(data_element.find('wavelength').text)
            intensity = float(data_element.find('intensity').text)
            data.append({"Wavelength": wavelength, "Intensity": intensity})
        except (AttributeError, ValueError):
            continue

    return data

def process_txt(txt_path):
    locale.setlocale(locale.LC_NUMERIC, 'pt_BR.UTF-8')
    data = []
    with open(txt_path, 'r') as file:
        lines = file.readlines()
        spectral_start = False

        for line in lines:
            if ">>>>>Begin Spectral Data<<<<<" in line:
                spectral_start = True
                continue

            if spectral_start:
                try:
                    parts = line.strip().split()
                    if len(parts) == 2:
                        wavelength = locale.atof(parts[0])
                        intensity = locale.atof(parts[1])
                        data.append({"Wavelength": wavelength, "Intensity": intensity})
                except ValueError:
                    pass

    return data

if __name__ == '__main__':
    app.run(port=5000)
