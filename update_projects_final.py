#!/usr/bin/env python3
"""
Update project.html with scraped data, preserving structure
"""

import json
import re

# Read scraped data
with open('all_projects_scraped.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

# Read project.html
with open('project.html', 'r', encoding='utf-8') as f:
    html = f.read()

def escape_js_string(s):
    """Escape string for JavaScript."""
    if not s:
        return ""
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')

def update_project_in_html(html, project_id, scraped_data):
    """Update a single project in the HTML."""
    # Find the project entry
    pattern = f'"{project_id}":\\s*{{[^}}]*?(?="[a-z-]+":|}})'
    
    # More robust pattern - find from project_id to closing brace
    start_pattern = f'"{project_id}":\\s*{{'
    start_match = re.search(start_pattern, html)
    
    if not start_match:
        print(f"  Could not find {project_id}")
        return html
    
    start_pos = start_match.start()
    
    # Find the matching closing brace
    brace_count = 0
    pos = start_match.end() - 1
    end_pos = pos
    
    while pos < len(html):
        if html[pos] == '{':
            brace_count += 1
        elif html[pos] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_pos = pos + 1
                break
        pos += 1
    
    # Extract existing project to get category, tags, links
    existing_project = html[start_pos:end_pos]
    
    # Extract category
    category_match = re.search(r'category:\s*"([^"]+)"', existing_project)
    category = category_match.group(1) if category_match else "Product & UX Design"
    
    # Extract tags
    tags_match = re.search(r'tags:\s*\[([^\]]+)\]', existing_project)
    tags = []
    if tags_match:
        tags_str = tags_match.group(1)
        tags = [t.strip('"\'') for t in re.findall(r'"([^"]+)"', tags_str)]
    
    # Extract links
    links_match = re.search(r'links:\s*{([^}]+)}', existing_project)
    links = {}
    if links_match:
        links_str = links_match.group(1)
        live_match = re.search(r'live:\s*"([^"]+)"', links_str)
        if live_match:
            links['live'] = live_match.group(1)
    
    # Build new project entry
    content = scraped_data['content']
    images = scraped_data['images']
    
    new_project = f'            "{project_id}": {{\n'
    new_project += f'                title: "{escape_js_string(content["title"])}",\n'
    
    if content.get('subtitle'):
        new_project += f'                subtitle: "{escape_js_string(content["subtitle"])}",\n'
    
    new_project += f'                category: "{escape_js_string(category)}",\n'
    new_project += f'                description: "{escape_js_string(content["description"])}",\n'
    
    # Image - use first detailed image if available, otherwise existing
    image = f"public/images/projects/{project_id}.png"
    if images.get('detailed') and len(images['detailed']) > 0:
        image = images['detailed'][0]
    else:
        # Try to get from existing
        img_match = re.search(r'image:\s*"([^"]+)"', existing_project)
        if img_match:
            image = img_match.group(1)
    
    new_project += f'                image: "{image}",\n'
    
    if tags:
        tags_js = '[' + ', '.join([f'"{t}"' for t in tags]) + ']'
        new_project += f'                tags: {tags_js},\n'
    
    if links:
        links_js = '{ '
        if 'live' in links:
            links_js += f'live: "{links["live"]}"'
        links_js += ' }'
        new_project += f'                links: {links_js},\n'
    
    # Add rich content if available
    if content.get('timeline'):
        new_project += f'                timeline: "{escape_js_string(content["timeline"])}",\n'
    
    if content.get('role'):
        new_project += f'                role: "{escape_js_string(content["role"])}",\n'
    
    if content.get('outcome'):
        new_project += f'                outcome: "{escape_js_string(content["outcome"])}",\n'
    
    if content.get('goals') and len(content['goals']) > 0:
        goals_js = '[\n'
        for goal in content['goals']:
            goals_js += f'                    "{escape_js_string(goal)}",\n'
        goals_js += '                ]'
        new_project += f'                goals: {goals_js},\n'
    
    research = content.get('research', {})
    if research.get('method') or research.get('findings') or images.get('oldVersion'):
        new_project += '                research: {\n'
        if research.get('method'):
            new_project += f'                    method: "{escape_js_string(research["method"])}",\n'
        if research.get('findings') and len(research['findings']) > 0:
            findings_js = '[\n'
            for finding in research['findings']:
                findings_js += f'                        "{escape_js_string(finding)}",\n'
            findings_js += '                    ]'
            new_project += f'                    findings: {findings_js},\n'
        if images.get('oldVersion'):
            new_project += f'                    oldVersion: "{images["oldVersion"]}",\n'
        new_project += '                },\n'
    
    if images.get('detailed') and len(images['detailed']) > 0:
        images_js = '[\n'
        for img in images['detailed']:
            images_js += f'                    "{img}",\n'
        images_js += '                ]'
        new_project += f'                images: {images_js},\n'
    
    if images.get('designSystem') and len(images['designSystem']) > 0:
        ds_js = '[\n'
        for img in images['designSystem']:
            ds_js += f'                    "{img}",\n'
        ds_js += '                ]'
        new_project += f'                designSystem: {ds_js}\n'
    
    new_project += '            }'
    
    # Replace in HTML
    updated_html = html[:start_pos] + new_project + html[end_pos:]
    return updated_html

# Update each project
print("Updating projects in project.html...")
for project_id, data in scraped.items():
    print(f"  Updating {project_id}...")
    html = update_project_in_html(html, project_id, data)

# Write updated file
with open('project.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("\nDone! Updated project.html with all scraped data.")
