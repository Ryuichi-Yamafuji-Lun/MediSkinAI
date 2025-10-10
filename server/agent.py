import os
from dotenv import load_dotenv
from typing import TypedDict
import util

# langgraph/chain dependencies
from langgraph.graph import StateGraph, START, END
from langchain.chat_models import init_chat_model
from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate

# load env
load_dotenv()

# define state of the graph
class GraphState(TypedDict):
    image: bytes
    classification: str
    confidence: float
    explanation: str

# CNN node
@tool
def skin_lesion_detection_tool(image_data: bytes)-> dict:
    return util.get_skin_lesion(image_data)

# LLM reasoning
def llm_reasoning_node(state: GraphState):
    try:
        # load LLM 
        llm = init_chat_model("openai:gpt-4.1")
    except Exception as e:
        print(f"LLM initialization failed: {e}")
        return {"explanation": "I'm sorry, an issue occurred with our AI model. Please try again later."}
    
    # Begin Reasoning
    # get classification and confidence
    classification = state.get("classification")
    confidence = state.get("confidence")

    # construct prompt
    template = ChatPromptTemplate.from_messages([
        (
            "system",
            (
                "You are a compassionate and highly specialized AI health assistant that explains "
                "skin lesion classifications in a clear and concise way. Your goal is to explain "
                "the provided classification and recommend appropriate next steps in a professional "
                "conversational tone. Do not provide medical advice or use overly complex medical jargon. "
                "Remind the user to always consult a qualified healthcare professional."
            )
        ),
        (
            "human",
            (
                "Based on a computer vision analysis, the image was classified as a '{classification}' with "
                "'{confidence:.2f}%' confidence. Explain what this means and what a patient should do next."
            )
        )
    ])

    prompt = template.format_prompt(classification=classification, confidence=confidence)
    explanation = llm.invoke(prompt)
    return {"explanation": explanation.content}


