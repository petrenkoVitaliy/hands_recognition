import pickle
import matplotlib.pyplot as plt
import numpy

IMG_SIZE = 120
VERSION = "synthphotos1_gray_120-0"
CROPPING = [0, 0]

INDEX = 1006


def parseData():
    filename = "./pickle/X_" + VERSION + ".pickle"
    pickle_in = open(filename, "rb")
    X = pickle.load(pickle_in)

    filename = "./pickle/y_" + VERSION + ".pickle"
    pickle_in = open(filename, "rb")
    y = pickle.load(pickle_in)

    return [X, y]


[X, y] = parseData()

X_init = X.reshape(
    -1,
    1,
    IMG_SIZE-2*CROPPING[0],
    IMG_SIZE-2*CROPPING[1],
)[INDEX]

image = X_init[0]


plt.imshow(image, cmap="gray")
plt.show()
