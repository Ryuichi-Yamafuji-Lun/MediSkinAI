# 🧠 MediSkinAI

## 🔗 Live Demo  
👉 [https://mediskinai.vercel.app/](https://mediskinai.vercel.app/)

---

## 🩺 Overview

**MediSkinAI** is a full-stack AI-powered web application that classifies user-submitted dermoscopic skin lesion images as **benign or malignant**. Inspired by my family’s history with skin cancer, I built MediSkinAI to explore how AI can aid early melanoma detection for underserved populations.

---

## 👨‍💻 My Role (AI Engineer, Sept 2024 – Jan 2025)

- **Fine-tuned** an ImageNet-pretrained **ResNet50** in **PyTorch** on the **ISIC 2020 Challenge Dataset** (33,126 images).
- Applied **class-weighted loss** to counter severe class imbalance (**32,542 benign / 584 malignant — a 56:1 ratio**), achieving **91% test accuracy**.
- Built a responsive frontend using **React + Vite + TailwindCSS**.
- Developed a secure backend using **FastAPI**, with automatic deletion of uploaded images post-inference for user privacy.
- Deployed to production on **Google Cloud Run (backend)** and **Vercel (frontend)**.
- Collected feedback from **27+ early users**, iterating on UI and mobile accessibility.

---

## 🧠 Tech Stack

| Layer         | Technology |
|---------------|------------|
| Frontend      | React, Vite, TailwindCSS |
| Backend       | FastAPI (Python) |
| AI Model      | PyTorch (ResNet50 CNN) |
| Dataset       | ISIC 2020 Challenge Dataset (~33K dermoscopic images) |
| Deployment    | Vercel (frontend), Google Cloud Run (backend) |

---

## 📊 Model Performance

- **Architecture**: ResNet50 (PyTorch)  
- **Training Device**: MacBook Pro with **Apple M3 Pro chip** (no discrete GPU)  
- **Training Time**: ~3 days using **PyTorch MPS backend** (mixed precision)  
- **Dataset**: ISIC 2020 (research-grade, widely used in academic publications)  
- **Class balance**: 32,542 benign / 584 malignant — **1.8% positive rate (56:1)**  
- **Test split**: 6,626 images, 120 malignant  
- **Test Accuracy**: **91%**  
- **Imbalance Handling**: Applied **class-weighted loss** to boost malignant classification

> **On reading the accuracy number:** a trivial classifier that always predicts "benign" scores **98.2%** on this split. Accuracy is therefore *not* a meaningful metric for this dataset — class-weighted loss intentionally trades overall accuracy for malignant sensitivity, which is the correct tradeoff for a screening tool. **Malignant recall and ROC-AUC are the metrics that matter here, and are pending re-evaluation.**

---

## 🔐 Privacy & Ethics

- **No data is stored.**
- Uploaded images are **deleted immediately** after inference on both frontend and backend.
- Clear disclaimers emphasize that this tool is for **educational and awareness purposes only** — **not a clinical diagnostic tool**.

---

## 🧠 Why the ISIC 2020 Dataset?

The **ISIC 2020 Challenge Dataset** is a gold-standard benchmark in skin lesion classification research. It contains expertly annotated images, is widely used in machine learning competitions, and closely mirrors real-world diagnostic scenarios with class imbalance and image variability.

---

## 🚀 Challenges & Solutions

| Challenge                      | Solution |
|-------------------------------|----------|
| Imbalanced classes (56:1)     | Used class-weighted loss during training to emphasize malignant cases |
| Real-world image diversity    | Applied data augmentation: rotations, flips, lighting changes |
| User data privacy             | Implemented automatic deletion of all uploaded images post-inference |
| Generalization performance    | Tested against multiple CNNs (EfficientNet, ResNet); selected ResNet50 for consistent results |

---

## 🔭 Planned Improvements (v2 Roadmap)

> I plan to rebuild and scale MediSkinAI with production-grade tools and cloud infrastructure:

- [ ] **Backend Migration** to **Spring Boot** for improved maintainability and type safety
- [x] **Dockerization** of the backend — multi-stage build on a `distroless` base image
- [ ] **Dockerization** of the frontend
- [ ] **CI/CD + HTTPS deployment** on **AWS EC2 or ECS**
- [ ] **UI Refresh** for improved UX and accessibility
- [ ] **Analytics Integration** to measure engagement and prediction trends

---

## 📬 Contact

If you'd like to learn more, collaborate, or request access to the dataset/model:

- 📧 Email: ryuichi.y.lun@gmail.com 
- 💼 LinkedIn: [linkedin.com/in/ryulun/](https://www.linkedin.com/in/ryulun/)  

---

## ⚠️ Disclaimer

> **MediSkinAI is not a diagnostic tool.** It is intended solely for educational and exploratory purposes.  
> For medical concerns, please consult a board-certified dermatologist.
