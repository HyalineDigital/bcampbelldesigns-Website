#!/usr/bin/env python3
"""
Update projects.html to match homepage structure with actual images
"""

import re
import json

# Read project.html to extract project data
with open('project.html', 'r', encoding='utf-8') as f:
    project_html = f.read()

# Extract projects object
projects_match = re.search(r'const projects = \{([^}]+(?:\{[^}]+\}[^}]*)*)\};', project_html, re.DOTALL)
if not projects_match:
    print("Could not find projects object")
    exit(1)

projects_js = projects_match.group(1)

# Parse projects (simple regex-based extraction)
projects = {}
project_pattern = r'"([^"]+)":\s*\{([^}]+(?:\{[^}]+\}[^}]*)*)\}'

for match in re.finditer(project_pattern, projects_js, re.DOTALL):
    project_id = match.group(1)
    project_data = match.group(2)
    
    # Extract key fields
    title_match = re.search(r'title:\s*"([^"]+)"', project_data)
    category_match = re.search(r'category:\s*"([^"]+)"', project_data)
    description_match = re.search(r'description:\s*"([^"]+)"', project_data)
    image_match = re.search(r'image:\s*"([^"]+)"', project_data)
    
    projects[project_id] = {
        'title': title_match.group(1) if title_match else '',
        'category': category_match.group(1) if category_match else '',
        'description': description_match.group(1) if description_match else '',
        'image': image_match.group(1) if image_match else f'public/images/projects/{project_id}.png'
    }

# Read projects.html
with open('projects.html', 'r', encoding='utf-8') as f:
    projects_html = f.read()

# Find the project grid section
grid_start = projects_html.find('<!-- Project Grid -->')
grid_end = projects_html.find('</section>', grid_start)

if grid_start == -1 or grid_end == -1:
    print("Could not find project grid section")
    exit(1)

# Generate new project grid HTML
new_grid_html = '''            <!-- Project Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
'''

# Color gradients for buttons (cycling through different colors)
button_colors = [
    ('from-purple-600', 'to-blue-600', 'purple'),
    ('from-blue-600', 'to-purple-600', 'blue'),
    ('from-emerald-600', 'to-teal-600', 'emerald'),
    ('from-purple-600', 'to-pink-600', 'purple'),
    ('from-indigo-600', 'to-purple-600', 'indigo'),
    ('from-orange-600', 'to-red-600', 'orange'),
    ('from-cyan-600', 'to-blue-600', 'cyan'),
    ('from-pink-600', 'to-rose-600', 'pink'),
    ('from-violet-600', 'to-purple-600', 'violet'),
    ('from-teal-600', 'to-cyan-600', 'teal'),
    ('from-amber-600', 'to-orange-600', 'amber'),
    ('from-green-600', 'to-emerald-600', 'green'),
    ('from-red-600', 'to-pink-600', 'red'),
    ('from-blue-600', 'to-cyan-600', 'blue'),
    ('from-purple-600', 'to-indigo-600', 'purple'),
    ('from-pink-600', 'to-purple-600', 'pink'),
    ('from-cyan-600', 'to-teal-600', 'cyan'),
    ('from-indigo-600', 'to-blue-600', 'indigo'),
    ('from-violet-600', 'to-pink-600', 'violet'),
    ('from-rose-600', 'to-pink-600', 'rose'),
    ('from-orange-600', 'to-amber-600', 'orange'),
    ('from-teal-600', 'to-green-600', 'teal'),
    ('from-blue-600', 'to-indigo-600', 'blue'),
]

for idx, (project_id, project_data) in enumerate(projects.items()):
    color_from, color_to, color_name = button_colors[idx % len(button_colors)]
    
    # Determine accent color for category badge
    accent_color = 'text-accent-purple' if idx % 2 == 0 else 'text-accent-blue'
    
    new_grid_html += f'''                <!-- {project_data['title']} -->
                <div class="project-card glass-card rounded-2xl overflow-hidden group">
                    <div class="relative aspect-[8/3] project-placeholder overflow-hidden">
                        <img src="{project_data['image']}" alt="{project_data['title']}" class="project-image absolute inset-0 w-full h-full object-cover">
                        <div class="project-overlay absolute inset-0 flex items-end justify-center p-8">
                            <a href="project.html?id={project_id}" class="view-button bg-gradient-to-r {color_from} {color_to} text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:{color_from.replace('600', '500')} hover:{color_to.replace('600', '500')} transition-all shadow-lg shadow-{color_name}-500/30">
                                View Case Study
                            </a>
                        </div>
                    </div>
                    <div class="p-6 md:p-8">
                        <span class="text-xs font-bold {accent_color} uppercase tracking-widest">{project_data['category']}</span>
                        <h3 class="text-[1.05rem] md:text-[1.3125rem] font-black text-white mt-4 mb-3 leading-tight">{project_data['title']}</h3>
                        <p class="text-gray-400 text-sm md:text-base leading-relaxed font-light">{project_data['description']}</p>
                    </div>
                </div>

'''

new_grid_html += '            </div>'

# Replace the grid section
updated_html = projects_html[:grid_start] + new_grid_html + projects_html[grid_end:]

# Write updated file
with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(updated_html)

print(f"Updated projects.html with {len(projects)} projects!")
print("All project cards now use:")
print("  - aspect-[8/3] (same as homepage)")
print("  - Actual cover images from project data")
print("  - Same structure and styling as homepage")
