import pickle
import matplotlib.pyplot as plt

VERSION = "spoke_gray_white120_20-20"
IMG_SIZE = 120
CROPPING = [20, 20]


INDEX = 1


def parseData():
    filename = "X_" + VERSION + ".pickle"
    pickle_in = open(filename, "rb")
    X = pickle.load(pickle_in)

    filename = "y_" + VERSION + ".pickle"
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

plt.imshow(X_init[0], cmap="gray")
plt.show()
