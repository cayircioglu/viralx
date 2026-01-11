import google.generativeai as genai

genai.configure(api_key="AIzaSyAz8wVqbGZluh3oMZFfO4pJSW8sRKKrtM0")

print("Kullanılabilir modeller:\n")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"Model: {model.name}")
        print(f"  - Display Name: {model.display_name}")
        print(f"  - Methods: {model.supported_generation_methods}")
        print()
