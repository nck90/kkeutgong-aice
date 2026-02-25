import re

with open('src/shared/data/curriculum.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace H2 tags starting with '## '
text = re.sub(r'## ([^\n]+)', r'\1', text)

# Replace H3 tags starting with '### '
text = re.sub(r'### ([^\n]+)', r'\1', text)

with open('src/shared/data/curriculum.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
