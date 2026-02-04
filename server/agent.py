import os
from dotenv import load_dotenv
from typing import TypedDict
import util

# langgraph/chain dependencies
from langgraph.graph import StateGraph, START, END
#from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate

# load env
load_dotenv()

# define state of the graph
class GraphState(TypedDict):
    image_data: bytes
    classification: str
    confidence: float
    explanation: str

# CNN node
@tool
def skin_lesion_classifier_tool(image_data: bytes)-> dict:
    """
    Analyzes an image of a skin lesion using a CNN model and
    returns a classification and confidence level.
    """
    return util.get_skin_lesion(image_data)

# LLM reasoning
def llm_reasoning_node(state: GraphState):
    try:
        # load LLM 
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0
        )
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

# create instance of StateGraph
mediskinai_graph_builder = StateGraph(GraphState)

# add the nodes of mediskin
mediskinai_graph_builder.add_node("image_processing", skin_lesion_classifier_tool)
mediskinai_graph_builder.add_node("llm_reasoning", llm_reasoning_node)

# add edges
mediskinai_graph_builder.add_edge(START, "image_processing")
mediskinai_graph_builder.add_edge("image_processing", "llm_reasoning")
mediskinai_graph_builder.add_edge("llm_reasoning", END)

mediskinai_graph_app = mediskinai_graph_builder.compile()