# import base64
# from io import BytesIO

# from pyzbar import pyzbar
# from PIL import Image
# import socketio

# def handle_image(socket, image_data):
#     image_bytes = BytesIO(base64.b64decode(image_data.split(",")[1]))
#     image = Image.open(image_bytes)
#     barcodes = pyzbar.decode(image)
#     for barcode in barcodes:
#         print(barcode.data.decode("utf-8"))

# sio = socketio.Server()

# @sio.on("connect")
# def connect(sid, environ):
#     print("Connected to client")

# @sio.on("image")
# def image(sid, data):
#     handle_image(sio, data)

# app = socketio.WSGIApp(sio)

import cv2
from pyzbar.pyzbar import decode
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/scan', methods=['POST'])
def scan_barcode():
    # Get the video frame from the request
    frame_data = request.files['frame'].read()
    frame_array = np.fromstring(frame_data, np.uint8)
    frame = cv2.imdecode(frame_array, cv2.IMREAD_COLOR)

    # Scan for barcodes in the frame
    results = decode(frame)

    # Extract barcode data from the results
    data = []
    for result in results:
        data.append(result.data.decode('utf-8'))

    # Return the barcode data as a response
    return jsonify(data)

if __name__ == '__main__':
    app.run()
