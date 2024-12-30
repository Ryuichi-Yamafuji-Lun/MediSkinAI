# MediSkinAI

## Link  
(Link will be added once deployed)  

## Built with  
- **Frontend**: React + Vite, styled with TailwindCSS  
- **Backend**: FastAPI  
- **AI Model**: PyTorch (ResNet50 with torchvision)  
- **Dataset**: ISIC 2020 Challenge Dataset  

## About the Project  
MediSkinAI is a full-stack web application designed to provide users with an initial assessment of their skin lesions, identifying them as benign or malignant. By leveraging AI, the platform aims to empower individuals to take the first step in understanding their skin health.  

### Why Skin Cancer?  
Skin cancer is one of the most common cancers worldwide, and early detection can significantly improve treatment outcomes. However, many individuals delay professional consultations due to a lack of awareness or confidence. MediSkinAI bridges this gap, encouraging users to seek professional advice when necessary.

### Highlights:  
- **AI Model**:  
  - MediSkinAI uses ResNet50, a reliable and widely-used convolutional neural network (CNN).  
  - Achieved **91% accuracy** on the ISIC 2020 dataset during testing.  
  - Performed consistently well on real-world data compared to other models like EfficientNet and other CNN architectures.  
  - Weighted adjustments were applied during training to address data imbalance between benign and malignant samples.  

- **Dataset**:  
  - The ISIC 2020 Challenge dataset was chosen for its reputation and extensive size.  
  - Challenges included managing imbalanced classes and ensuring the model generalized well on unseen data.  

- **User-Friendly Approach**:  
  - The app simplifies results to "Benign" or "Malignant," focusing on clear, actionable information.  
  - Includes disclaimers to remind users that AI predictions are not a substitute for professional diagnosis, reinforcing the importance of consulting a dermatologist for accurate assessments.  

- **Responsive Design**:  
  - The frontend is built with React and styled using TailwindCSS to ensure a seamless user experience across devices.

## Deployment  
Deployment plans include:  
- **Frontend**: (Pending decision – Vercel, Netlify, or another service)  
- **Backend**: (Pending decision – Render, AWS, or similar)  

## Challenges and Solutions  
1. **Dataset Availability**:  
   - Publicly available, reliably labeled datasets for skin cancer detection are limited.  
   - The ISIC 2020 dataset was chosen for its balance of quality and size.  

2. **Class Imbalance**:  
   - The dataset contained significantly more benign samples than malignant ones.  
   - To address this, weighted loss functions were applied during training to prioritize malignant data.

3. **Real-World Performance**:  
   - While the model performed well on the dataset, testing against real-world data revealed areas for improvement.  
   - ResNet50 demonstrated superior reliability compared to alternatives, justifying its selection.  

4. **Building Confidence**:  
   - The project’s goal is to empower users to take the first step toward consulting a dermatologist.  
   - This influenced the decision to focus on straightforward predictions and prominently highlight disclaimers.  

## Key Statistics  
- **Model**: ResNet50 (PyTorch)  
- **Dataset**: ISIC 2020 Challenge Dataset  
  - **Total Samples**: ~33,000 images  
  - **Accuracy**: 91%  
  - **Test Dataset Distribution**: Benign (~85%), Malignant (~15%)  

## Disclaimer
MediSkinAI is for educational purposes and is not intended as a substitute for professional advice.
If you are concerned about a skin lesion, consult a dermatologist immediately. 

## Contact  
If you have questions about this project, feel free to reach out.  

---
