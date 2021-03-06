import numpy
import os
import matplotlib.pyplot as plt
import cv2
import random
import pickle
import skimage

IMG_SIZE = 120
VERSION = "synthphotos2_gray_gaussian_120-0"
CROPPING = [0, 0]

IS_GENERATE = True

# run .py from current folder
DATADIR = '../synthetic_photos_2'
CATEGORIES = ["spoke", "default"]


def create_training_data():
    training_data = []
    ind = 0
    for category in CATEGORIES:
        path = DATADIR + '/' + category
        class_num = CATEGORIES.index(category)
        print('----category', category)
        for img in os.listdir(path):

            img_array = cv2.imread(
                os.path.join(path, img),
                cv2.IMREAD_GRAYSCALE
            )

            resized_image_array = cv2.resize(
                img_array,
                (IMG_SIZE, IMG_SIZE)
            )

            crop_img_array = resized_image_array[CROPPING[0]:IMG_SIZE - CROPPING[0],
                                                 CROPPING[1]:IMG_SIZE - CROPPING[1]]

            # gimg = skimage.util.random_noise(
            #     crop_img_array, mode="gaussian", var=0.0005)

            training_data.append([crop_img_array, class_num])
            ind += 1

            # var=0.0005  0.01
            # plt.imshow(gimg, cmap="gray")
            # plt.show()
            # break
        # break

    random.shuffle(training_data)
    return training_data


def parse_training_data(training_data):
    X = []
    y = []

    for features, label in training_data:
        X.append(features)
        y.append(label)

    X = numpy.array(X).reshape(-1,
                               IMG_SIZE-2*CROPPING[0],
                               IMG_SIZE-2*CROPPING[1],
                               1
                               )

    return [X, y]


def create_dump_files(version, X, y):
    pickle_out = open("./pickle/X_" + version + ".pickle", "wb")
    pickle.dump(X, pickle_out)
    pickle_out.close()

    pickle_out = open("./pickle/y_" + version + ".pickle", "wb")
    pickle.dump(y, pickle_out)
    pickle_out.close()

# ---------------------


training_data = create_training_data()
[X, y] = parse_training_data(training_data)
if IS_GENERATE:
    create_dump_files(VERSION, X, y)

print(len(training_data))
