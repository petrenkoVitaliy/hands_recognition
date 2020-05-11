import numpy as np
import os
import matplotlib.pyplot as plt
import cv2
import random
import pickle

DATA_PATH = './hands_photos'  # From root

MALE_NAME = 'male'
FEMALE_NAME = 'female'
IMG_SIZE = 50

def get_filenames():
    femaleFilenames = []
    maleFilenames = []
    handInfoFile = open('HandInfo.txt', 'r')
    for line in handInfoFile.readlines():
        sex = line.strip().split(',')[2]
        filename = line.strip().split(',')[7]

        if sex == MALE_NAME:
            maleFilenames.append(filename)
        if sex == FEMALE_NAME:
            femaleFilenames.append(filename)

    return [femaleFilenames, maleFilenames]

def create_training_data():
    training_data = []
    [femaleFilenames, maleFilenames] = get_filenames()
    filenames_by_categories = [maleFilenames, femaleFilenames]

    for category_num in range(len(filenames_by_categories)):
        filenames = filenames_by_categories[category_num]
        print('--cat', category_num)
        for img in filenames:
            img_array = cv2.imread(os.path.join(DATA_PATH, img), cv2.IMREAD_GRAYSCALE)

            new_array  = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
            training_data.append([new_array, category_num])

    random.shuffle(training_data)
    
    return training_data

def parse_training_data(training_data):
    X = []
    y = []

    for features, label in training_data:
        X.append(features)
        y.append(label)

    X = np.array(X).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
    
    return [X, y]

##-------------

training_data = create_training_data()
[X, y] = parse_training_data(training_data)

pickle_out = open("X.pickle", "wb")
pickle.dump(X, pickle_out)
pickle_out.close()

pickle_out = open("y.pickle", "wb")
pickle.dump(y, pickle_out)
pickle_out.close()
 
pickle_in = open("X.pickle", "rb")
X = pickle.load(pickle_in)
