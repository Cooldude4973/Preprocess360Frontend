from flask import Flask, request, jsonify , json , send_file
from flask_cors import CORS  # Import CORS
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
import io
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# If you want to restrict CORS to specific origins, you can do this:
# CORS(app, origins="http://localhost:3000")

global df

# df = pd.DataFrame({
#     'Column1': [1, 2, 100000],
#     'Column2': [1, 5, 6321],
#     'Column3': [1, 8, 9321]
# })


@app.route('/upload', methods=['POST'])
def upload_file():
    global df
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.csv'):
        file_path = 'uploads/' + file.filename
        file.save(file_path)
        df = pd.read_csv(file_path)
        print("The file is successfully uploaded .")
        return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200
    
    return jsonify({"error": "Invalid file type. Only CSV files are allowed."}), 400


@app.route('/removeduplicates', methods=['POST'])
def removeDuplicates():
    global df  # Ensure 'df' is globally accessible
    if df is not None:
        duplicate_count = int(df.duplicated().sum())
        df.drop_duplicates(inplace=True)
        return jsonify({'duplicate_count': duplicate_count}), 200
    else:
        return jsonify({'error': 'No data available to process.'}), 400


@app.route('/analyze', methods=['POST'])
def analyze_file():
    global df
    print(df.head())
    try:
        # Log dataframe for debugging purposes
        print(df.head())
        
        # Extract headers
        headers = df.columns.to_list()
        return jsonify(headers)
    except Exception as e:
        # Handle errors gracefully
        return jsonify({'error': str(e)}), 500




@app.route('/impute', methods=['POST'])
def replaceMissing():
    global df
    mval = request.form.get('mval')
    strategy = request.form.get('strategy')
    selected_columns = request.form.get('columns')  # JSON string from the frontend
    selected_columns = json.loads(selected_columns)  # Deserialize JSON string to a Python list
    if(strategy == 'mean'):
        for column in selected_columns:
            df[column] = df[column].replace(mval , np.nan)
        imputerNumeric = SimpleImputer(strategy='mean' , missing_values=np.nan)
        for column in selected_columns:
            df[column] = imputerNumeric.fit_transform(df[[column]]).ravel()
        
        print(df.head())    
        return jsonify({"message": "Data imputation completed"})
            
    imputer = SimpleImputer(strategy=strategy, missing_values=mval)            
    for column in selected_columns:
        df[column] = imputer.fit_transform(df[[column]]).ravel()
    
    print(df.head())

    return jsonify({"message": "Data imputation completed"})


@app.route('/standardize' , methods = ['POST'])
def labelEncode():
    global df
    selected_columns = request.form.get('columns')  # JSON string from the frontend
    selected_columns = json.loads(selected_columns) 

    lbl_encoder=LabelEncoder()
    for column in selected_columns:
        df[column]=lbl_encoder.fit_transform(df[column])
    
    print(df.head())
        
    return jsonify({"message": "Label encoding completed"})

@app.route('/removeoutlier' ,  methods = ['POST'])
def removeoutlier():
    global df
    Q1 = df.quantile(0.25)
    Q3 = df.quantile(0.75)
    IQR = Q3- Q1
    outliers = ((df<(Q1-1.5*IQR))| df>(Q3+1.5*IQR)).any(axis=1)
    print(outliers)
    outliers_count = outliers.sum()
    print(outliers_count)
    df = df[~outliers]
    print(df.head())
    return jsonify({'Outliers Count': int(outliers_count)}), 200


@app.route('/download' , methods = ['GET'])
def download_file():
    print('downloading...')
    global df
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)
    
    # Send the CSV file to the user
    return send_file(
        io.BytesIO(csv_buffer.getvalue().encode()),
        mimetype='text/csv',
        as_attachment=True,
        download_name='data.csv'
    )


if __name__ == '__main__':
    app.run(debug=True)
