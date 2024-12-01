from flask import Flask
from flask import request, jsonify
import pandas as pd
import os
from joblib import load

# Get the absolute path of the current directory
base_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to the model
model_path = os.path.join(base_dir, "models", "vertispine3CML.pkl")

# Load the model
model = load(model_path)



#basedir = os.path.abspath(os.path.dirname(__file__))
#data_file = os.path.join(basedir, 'models/column_3C_weka.arff')

app = Flask(__name__)

@app.route("/api/python") #, methods=['GET']
def hello_world():
    
    d = {'pelvic_incidence': [], 'pelvic_tilt': [], 'lumbar_lordosis_angle': [], 'sacral_slope': [], 'pelvic_radius': [], 'degree_spondylolisthesis': []}
    
    d['pelvic_incidence'] = [float(request.args.get('pelvic_incidence'))];
    d['pelvic_tilt'] = [float(request.args.get('pelvic_tilt'))];
    d['lumbar_lordosis_angle'] = [float(request.args.get('lumbar_lordosis_angle'))];
    d['sacral_slope'] = [float(request.args.get('sacral_slope'))];
    d['pelvic_radius'] = [float(request.args.get('pelvic_radius'))];
    d['degree_spondylolisthesis'] = [float(request.args.get('degree_spondylolisthesis'))];
    
    #d = {'pelvic_incidence': pelvic_incidence, 'pelvic_tilt': pelvic_tilt, 'lumbar_lordosis_angle': lumbar_lordosis_angle, 'sacral_slope': sacral_slope, 'pelvic_radius': pelvic_radius, 'degree_spondylolisthesis': degree_spondylolisthesis}
    #d = {'pelvic_incidence': [53.854798, 74.433593, 70.952728], 'pelvic_tilt': [19.230643, 41.557331, 20.159931], 'lumbar_lordosis_angle': [32.779060, 27.700000, 62.859109], 'sacral_slope': [34.624155, 32.876262, 50.792797], 'pelvic_radius': [121.670915, 107.949304, 116.177932], 'degree_spondylolisthesis': [5.329843, 5.000089, 32.522331]}
    df = pd.DataFrame(data=d)
    prediction = model.predict(df)
    prediction_list = prediction.tolist()
    #knn_from_joblib = joblib.load(data_file) 
    #username = str(knn_from_joblib.predict(X_test))
    #arff_file = arff.loadarff(data_file)
    #df = pd.DataFrame(arff_file[0])
    #username = str(df.shape[0])
    
    
    #return {"pelvic_incidence": pelvic_incidence, "pelvic_tilt": pelvic_tilt, "lumbar_lordosis_angle": lumbar_lordosis_angle, "sacral_slope": sacral_slope, "pelvic_radius": pelvic_radius, "degree_spondylolisthesis": degree_spondylolisthesis}
    return jsonify({'prediction': prediction_list})