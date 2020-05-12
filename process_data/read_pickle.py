import pickle
import matplotlib.pyplot as plt

IMG_SIZE = 120
VERSION = "synth_gray_120-0"
CROPPING = [0, 0]

INDEX = 100


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

plt.imshow(X_init[0], cmap="gray")
plt.show()
