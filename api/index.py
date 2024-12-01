from flask import Flask
from flask import request, jsonify
from sklearn.pipeline import Pipeline
import pandas as pd
import os
from joblib import load

base_dir = os.path.dirname(os.path.abspath(__file__))

pipeline_path = os.path.join(base_dir, "models", "vertispine2CMLPipeline.pkl")

pipeline_model = load(pipeline_path)

app = Flask(__name__)

@app.route("/api/python", methods=['GET']) #, methods=['GET']
def hello_world():
    
    d = {'pelvic_incidence': [], 'pelvic_tilt': [], 'lumbar_lordosis_angle': [], 'sacral_slope': [], 'pelvic_radius': [], 'degree_spondylolisthesis': []}
    
    d['pelvic_incidence'] = [float(request.args.get('pelvic_incidence'))];
    d['pelvic_tilt'] = [float(request.args.get('pelvic_tilt'))];
    d['lumbar_lordosis_angle'] = [float(request.args.get('lumbar_lordosis_angle'))];
    d['sacral_slope'] = [float(request.args.get('sacral_slope'))];
    d['pelvic_radius'] = [float(request.args.get('pelvic_radius'))];
    d['degree_spondylolisthesis'] = [float(request.args.get('degree_spondylolisthesis'))];
    
    df = pd.DataFrame(data=d)
    
    prediction = pipeline_model.predict(df)
    prediction_list = prediction.tolist()
    
    return jsonify({'prediction': prediction_list})

if __name__ == '__main__':
    app.run(debug=True)