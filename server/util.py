# Handle user image and use of AI model
import torch
import torch.nn.functional as F
from torchvision.models import resnet50
from torchvision.transforms import v2 as T
from PIL import Image
import json

__class_mapping = None
__model = None


def load_artifacts():
    print("Loading artifact data")
    global __class_mapping
    global __model

    if __model is None:
        __model = resnet50(weights=None, num_classes=2)

        __model.load_state_dict(torch.load("model/resnet50_skin_cancer.pth", map_location=torch.device("cpu"), weights_only=True))
    
        __model.eval() # Lets model know it is doing an evaluation

    with open("model/class_mapping.json") as f:
        __class_mapping = json.load(f)

    print("Loading artifact is done")

def get_skin_lesion(image_file):
    try:
        image = Image.open(image_file).convert("RGB")

        # Define Transformation using v2
        transform = T.Compose([
            T.Resize((224, 224)),  # Resize image to 224x224
            T.ToImage(),
            T.ToDtype(torch.float32, scale=True),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize with ImageNet stats
        ])

        input_tensor = transform(image).unsqueeze(0)

        # Use the pretrained model to get highest probability skin lesion
        with torch.no_grad():
            result = __model(input_tensor)
            probabilities = F.softmax(result, dim=1)
            predicted_class = probabilities.argmax().item()

        # retrieve specific skin lesion and confidence level
        diagnosis = __class_mapping[str(predicted_class)]
        confidence = probabilities[0, predicted_class].item() * 100

        return {"diagnosis": diagnosis, "confidence": confidence}
    
    finally:
        image_file.close()  # Close the file
        del image  # Remove the image from memory
        del input_tensor  # Clear transformed data
