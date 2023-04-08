import cv2
import numpy as np
# import tensorflow as tf

# Load the pre-trained CNN model for fruit freshness detection
# model = tf.keras.models.load_model('freshness_detector_model.h5')

# Define a function to capture images from the camera and perform barcode recognition and fruit freshness detection
def process_image():
    # Open the camera and capture an image
    camera = cv2.VideoCapture(0)
    print(camera.isOpened())
    ret, image = camera.read()
    
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Use OpenCV to detect and decode any barcodes in the image
    barcode_data = None
    barcode_rects = detect_barcodes(gray)
    for rect in barcode_rects:
        barcode_data = decode_barcode(gray, rect)
        if barcode_data is not None:
            break
    
    # Use the pre-trained CNN model to classify the fruit freshness
    freshness = classify_fruit_freshness(image)
    
    # Close the camera
    # camera.release()
    
    # Return the barcode data and fruit freshness classification
    return barcode_data, freshness

# Define a function to detect barcodes in an image using OpenCV
def detect_barcodes(image):
    # Create a barcode detector object using OpenCV
    detector = cv2.QRCodeDetector()
    
    # Detect the barcodes in the image
    data, bbox, _ = detector.detectAndDecode(image)
    
    # If no barcodes were detected, return an empty list
    if not bbox:
        return []
    
    # Convert the bounding box coordinates to integers
    bbox = bbox[0].astype(np.int32)
    
    # Create a list of bounding boxes for each barcode detected
    rects = [bbox]
    
    return rects

# Define a function to decode a barcode in an image using OpenCV
def decode_barcode(image, rect):
    # Extract the barcode region from the image
    x, y, w, h = rect
    barcode_roi = image[y:y+h, x:x+w]
    
    # Create a barcode decoder object using OpenCV
    decoder = cv2.QRCodeDetector()
    
    # Decode the barcode
    data, _, _ = decoder.decode(barcode_roi)
    print(data, "11111")
    
    # If the barcode was successfully decoded, return the data
    if data:
        return data
    
    # Otherwise, return None
    return None

# Define a function to classify the freshness of a fruit image using a pre-trained CNN model
def classify_fruit_freshness(image):
    # Convert the image to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define the ranges of colors for ripe and unripe fruit (in HSV space)
    ripe_min = np.array([10, 100, 100])
    ripe_max = np.array([30, 255, 255])
    unripe_min = np.array([30, 100, 100])
    unripe_max = np.array([60, 255, 255])
    
    # Create masks to filter the image based on color ranges
    ripe_mask = cv2.inRange(hsv, ripe_min, ripe_max)
    unripe_mask = cv2.inRange(hsv, unripe_min, unripe_max)
    
    # Count the number of pixels in each mask
    ripe_pixels = cv2.countNonZero(ripe_mask)
    unripe_pixels = cv2.countNonZero(unripe_mask)
    
    # Classify the fruit as ripe or unripe based on the number of pixels in each mask
    if ripe_pixels > unripe_pixels:
        print(ripe_pixels, unripe_pixels)
        return 'ripe'
    else:
        return 'unripe'
    
if __name__ == '__main__':
    def main():
        barcode_data, freshness = process_image()
        print("Barcode data:", barcode_data)
        print("Fruit freshness:", freshness) 
    main()
