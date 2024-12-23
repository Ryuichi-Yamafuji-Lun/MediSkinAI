# Handle user image and use of AI model
import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image

__dx_mapping = None
__model = None


def load_artifacts():
    print("Loading artifact data")
    global __dx_mapping
    global __model

    if __model is None:
        __model = torch.load("./model/efficientnet_b0_skin_cancer.pth")
        __model.eval() # Lets model know it is doing an evaluation

    with open("./model/dx_mapping.json") as f:
        __dx_mapping = json.load(f)

    print("Loading artifact is done")

def get_skin_lesion(file: UploadFile = File(...)):
    pass