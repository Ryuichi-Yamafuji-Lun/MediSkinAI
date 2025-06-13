# 🧠 MediSkinAI

## 🔗 Live Demo  
👉 [https://mediskinai.vercel.app/](https://mediskinai.vercel.app/)

---

## 🩺 Overview

**MediSkinAI** is a full-stack AI-powered web application that classifies user-submitted dermoscopic skin lesion images as **benign or malignant**. Inspired by my family’s history with skin cancer, I built MediSkinAI to explore how AI can aid early melanoma detection for underserved populations.

---

## 👨‍💻 My Role (AI Engineer, Sept 2024 – Jan 2025)

- **Trained from scratch** a custom **ResNet50** model using **PyTorch** on the **ISIC 2020 Challenge Dataset** (~33K images).
- Applied **class-weighted loss** to counter dataset imbalance (~85% benign, ~15% malignant), achieving **91% test accuracy**.
- Built a responsive frontend using **React + Vite + TailwindCSS**.
- Developed a secure backend using **FastAPI**, with automatic deletion of uploaded images post-inference for user privacy.
- Deployed to production on **Render (backend)** and **Vercel (frontend)**.
- Collected feedback from **27+ early users**, iterating on UI and mobile accessibility.

---

## 🧠 Tech Stack

| Layer         | Technology |
|---------------|------------|
| Frontend      | React, Vite, TailwindCSS |
| Backend       | FastAPI (Python) |
| AI Model      | PyTorch (ResNet50 CNN) |
| Dataset       | ISIC 2020 Challenge Dataset (~33K dermoscopic images) |
| Deployment    | Vercel (frontend), Render (backend) |

---

## 📊 Model Performance

- **Architecture**: ResNet50 (PyTorch)  
- **Training Device**: MacBook Pro with **Apple M3 Pro chip** (no discrete GPU)  
- **Training Time**: ~3 days using **PyTorch MPS backend** (mixed precision)  
- **Dataset**: ISIC 2020 (research-grade, widely used in academic publications)  
- **Test Accuracy**: **91%**  
- **Imbalance Handling**: Applied **class-weighted loss** to boost malignant classification

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
| Imbalanced classes            | Used weighted loss during training to emphasize malignant cases |
| Real-world image diversity    | Applied data augmentation: rotations, flips, lighting changes |
| User data privacy             | Implemented automatic deletion of all uploaded images post-inference |
| Generalization performance    | Tested against multiple CNNs (EfficientNet, ResNet); selected ResNet50 for consistent results |

---

## 🔭 Planned Improvements (v2 Roadmap)

> I plan to rebuild and scale MediSkinAI with production-grade tools and cloud infrastructure:

- [ ] **Backend Migration** to **Spring Boot** for improved maintainability and type safety
- [ ] **Dockerization** of frontend and backend
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
