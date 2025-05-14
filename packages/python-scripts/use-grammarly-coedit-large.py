import sys
from transformers import AutoTokenizer, T5ForConditionalGeneration

def correct_grammar(input_text):
    tokenizer = AutoTokenizer.from_pretrained("grammarly/coedit-large")
    model = T5ForConditionalGeneration.from_pretrained("grammarly/coedit-large")
    input_ids = tokenizer(f'Fix grammatical errors in this sentence: {input_text}', return_tensors="pt").input_ids
    outputs = model.generate(input_ids, max_length=256)
    edited_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return edited_text

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python use-grammarly-coedit-large.py 'Your text here'")
    else:
        input_text = sys.argv[1]
        corrected_text = correct_grammar(input_text)
        print(corrected_text)
