import re

with open('project.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix indentation for project entries
content = re.sub(r'^\s{24}"([a-z-]+)":', r'            "\1":', content, flags=re.MULTILINE)

with open('project.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed indentation")
