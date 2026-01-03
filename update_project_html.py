#!/usr/bin/env python3
"""
Update project.html with all scraped project data
"""

import json
import re

# Read scraped data
with open('all_projects_scraped.json', 'r', encoding='utf-8') as f:
    scraped_data = json.load(f)

# Read current project.html to get existing project structure
with open('project.html', 'r', encoding='utf-8') as f:
    project_html = f.read()

# Generate JavaScript project data
def generate_project_js(project_id, data):
    """Generate JavaScript object for a project."""
    content = data['content']
    images = data['images']
    
    js = f'            "{project_id}": {{\n'
    js += f'                title: "{content["title"].replace('"', '\\"')}",\n'
    
    if content.get('subtitle'):
        js += f'                subtitle: "{content["subtitle"].replace('"', '\\"')}",\n'
    
    js += f'                category: "{data.get("category", "Unknown").replace('"', '\\"')}",\n'
    js += f'                description: "{content["description"].replace('"', '\\"')}",\n'
    js += f'                image: "{data.get("image", "public/images/projects/placeholder.png")}",\n'
    
    # Tags
    tags = data.get('tags', [])
    if tags:
        js += f'                tags: {json.dumps(tags)},\n'
    
    # Timeline
    if content.get('timeline'):
        js += f'                timeline: "{content["timeline"].replace('"', '\\"')}",\n'
    
    # Role
    if content.get('role'):
        js += f'                role: "{content["role"].replace('"', '\\"')}",\n'
    
    # Outcome
    if content.get('outcome'):
        js += f'                outcome: "{content["outcome"].replace('"', '\\"')}",\n'
    
    # Goals
    if content.get('goals') and len(content['goals']) > 0:
        goals_js = '[\n'
        for goal in content['goals']:
            goals_js += f'                    "{goal.replace('"', '\\"')}",\n'
        goals_js += '                ]'
        js += f'                goals: {goals_js},\n'
    
    # Research
    research = content.get('research', {})
    if research.get('method') or research.get('findings') or images.get('oldVersion'):
        js += '                research: {\n'
        if research.get('method'):
            js += f'                    method: "{research["method"].replace('"', '\\"')}",\n'
        if research.get('findings') and len(research['findings']) > 0:
            findings_js = '[\n'
            for finding in research['findings']:
                findings_js += f'                        "{finding.replace('"', '\\"')}",\n'
            findings_js += '                    ]'
            js += f'                    findings: {findings_js},\n'
        if images.get('oldVersion'):
            js += f'                    oldVersion: "{images["oldVersion"]}",\n'
        js += '                },\n'
    
    # Images
    if images.get('detailed') and len(images['detailed']) > 0:
        images_js = '[\n'
        for img in images['detailed']:
            images_js += f'                    "{img}",\n'
        images_js += '                ]'
        js += f'                images: {images_js},\n'
    
    # Design System
    if images.get('designSystem') and len(images['designSystem']) > 0:
        ds_js = '[\n'
        for img in images['designSystem']:
            ds_js += f'                    "{img}",\n'
        ds_js += '                ]'
        js += f'                designSystem: {ds_js}\n'
    
    js += '            }'
    return js

# Find the projects object in the HTML
projects_start = project_html.find('const projects = {')
if projects_start == -1:
    print("ERROR: Could not find projects object")
    exit(1)

# Find the end of the projects object (before the closing script tag)
projects_end = project_html.find('        // Load project on page load', projects_start)
if projects_end == -1:
    projects_end = project_html.find('        window.addEventListener', projects_start)

# Get existing project data to preserve structure
# We'll replace the entire projects object

# Generate new projects JavaScript
new_projects_js = '        const projects = {\n'

# Get existing project IDs and their basic info from the current file
# We'll merge scraped data with existing structure

for project_id, data in scraped_data.items():
    # Get category and tags from existing data if available
    # For now, use defaults
    project_data = {
        "category": "Product & UX Design",  # Default, will be updated
        "tags": [],
        "image": f"public/images/projects/{project_id}.png"
    }
    
    # Try to extract from existing HTML
    pattern = f'"{project_id}":\\s*{{[^}}]*category:\\s*"([^"]+)"'
    match = re.search(pattern, project_html)
    if match:
        project_data["category"] = match.group(1)
    
    pattern = f'"{project_id}":\\s*{{[^}}]*tags:\\s*\\[([^\\]]+)\\]'
    match = re.search(pattern, project_html)
    if match:
        tags_str = match.group(1)
        project_data["tags"] = [t.strip('"') for t in re.findall(r'"([^"]+)"', tags_str)]
    
    # Merge with scraped data
    data.update(project_data)
    
    new_projects_js += generate_project_js(project_id, data) + ',\n\n'

# Remove trailing comma
new_projects_js = new_projects_js.rstrip(',\n\n') + '\n        };\n'

# Replace the projects object
updated_html = project_html[:projects_start] + new_projects_js + project_html[projects_end:]

# Write updated file
with open('project.html', 'w', encoding='utf-8') as f:
    f.write(updated_html)

print("Updated project.html with all scraped project data!")
