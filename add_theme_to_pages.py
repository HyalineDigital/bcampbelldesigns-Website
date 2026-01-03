#!/usr/bin/env python3
"""
Add theme toggle functionality to all HTML pages
"""

import re

# Theme CSS to add
THEME_CSS = """
        :root {
            /* Dark mode (default) */
            --bg-primary: #0d0d0d;
            --bg-secondary: #151515;
            --bg-card: rgba(20, 20, 20, 0.7);
            --bg-card-hover: rgba(25, 25, 25, 0.75);
            --text-primary: #ededed;
            --text-secondary: #9ca3af;
            --text-tertiary: #6b7280;
            --border-color: rgba(255, 255, 255, 0.5);
            --border-hover: rgba(168, 85, 247, 0.5);
            --nav-bg: rgba(13, 13, 13, 0.85);
            --nav-border: rgba(255, 255, 255, 0.5);
            --shadow: rgba(0, 0, 0, 0.4);
        }

        [data-theme="light"] {
            /* Light mode */
            --bg-primary: #fafafa;
            --bg-secondary: #f5f5f5;
            --bg-card: rgba(255, 255, 255, 0.9);
            --bg-card-hover: rgba(255, 255, 255, 0.95);
            --text-primary: #1a1a1a;
            --text-secondary: #4b5563;
            --text-tertiary: #6b7280;
            --border-color: rgba(0, 0, 0, 0.5);
            --border-hover: rgba(168, 85, 247, 0.5);
            --nav-bg: rgba(255, 255, 255, 0.9);
            --nav-border: rgba(0, 0, 0, 0.5);
            --shadow: rgba(0, 0, 0, 0.1);
        }
"""

THEME_TOGGLE_CSS = """
        /* Theme Toggle Button */
        .theme-toggle {
            width: 48px;
            height: 28px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 14px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            padding: 2px;
        }

        .theme-toggle:hover {
            border-color: var(--border-hover);
        }

        .theme-toggle-slider {
            width: 22px;
            height: 22px;
            background: linear-gradient(135deg, #a855f7, #3b82f6);
            border-radius: 50%;
            position: absolute;
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px var(--shadow);
        }

        [data-theme="light"] .theme-toggle-slider {
            transform: translateX(20px);
        }

        .theme-toggle-icon {
            width: 14px;
            height: 14px;
            color: white;
            transition: opacity 0.3s ease;
        }

        .theme-toggle-icon.sun {
            opacity: 0;
        }

        [data-theme="light"] .theme-toggle-icon.sun {
            opacity: 1;
        }

        [data-theme="light"] .theme-toggle-icon.moon {
            opacity: 0;
        }
"""

THEME_TOGGLE_HTML = """                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
                    <div class="theme-toggle-slider">
                        <svg class="theme-toggle-icon moon w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg class="theme-toggle-icon sun w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </button>"""

THEME_JS = """
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        // Get saved theme or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', currentTheme);

        // Update text colors based on theme
        function updateTextColors() {
            const isLight = html.getAttribute('data-theme') === 'light';
            const textElements = document.querySelectorAll('.text-white, .text-gray-300, .text-gray-400, .text-gray-500');
            textElements.forEach(el => {
                if (isLight) {
                    if (el.classList.contains('text-white')) {
                        el.classList.remove('text-white');
                        el.classList.add('text-gray-900');
                    } else if (el.classList.contains('text-gray-300')) {
                        el.classList.remove('text-gray-300');
                        el.classList.add('text-gray-700');
                    } else if (el.classList.contains('text-gray-400')) {
                        el.classList.remove('text-gray-400');
                        el.classList.add('text-gray-600');
                    } else if (el.classList.contains('text-gray-500')) {
                        el.classList.remove('text-gray-500');
                        el.classList.add('text-gray-500');
                    }
                } else {
                    if (el.classList.contains('text-gray-900')) {
                        el.classList.remove('text-gray-900');
                        el.classList.add('text-white');
                    } else if (el.classList.contains('text-gray-700')) {
                        el.classList.remove('text-gray-700');
                        el.classList.add('text-gray-300');
                    } else if (el.classList.contains('text-gray-600')) {
                        el.classList.remove('text-gray-600');
                        el.classList.add('text-gray-400');
                    }
                }
            });
        }

        // Toggle theme
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateTextColors();
            });
        }

        // Initialize text colors on load
        updateTextColors();
"""

def update_file(filepath):
    """Update a single HTML file with theme functionality"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if theme already added
    if ':root' in content and '--bg-primary' in content:
        print(f"  {filepath} already has theme CSS, skipping...")
        return False
    
    # Add CSS variables after <style> tag
    if '<style>' in content:
        content = content.replace('<style>', '<style>' + THEME_CSS, 1)
    
    # Update body background to use CSS variable
    content = re.sub(
        r'background:\s*#0d0d0d;',
        'background: var(--bg-primary);\n            transition: background-color 0.3s ease, color 0.3s ease;',
        content
    )
    content = re.sub(
        r'color:\s*#ededed;',
        'color: var(--text-primary);',
        content
    )
    
    # Update bg-dark-primary to use CSS variable
    content = re.sub(
        r'\.bg-dark-primary\s*\{[^}]*background:\s*#0d0d0d;',
        '.bg-dark-primary {\n            background: var(--bg-primary);\n            transition: background-color 0.3s ease;',
        content
    )
    
    # Update bg-dark-secondary
    content = re.sub(
        r'\.bg-dark-secondary\s*\{[^}]*background:\s*#151515;',
        '.bg-dark-secondary {\n            background: var(--bg-secondary);\n            transition: background-color 0.3s ease;',
        content
    )
    
    # Add theme toggle CSS before closing </style>
    if '</style>' in content and '.theme-toggle' not in content:
        content = content.replace('</style>', THEME_TOGGLE_CSS + '\n    </style>', 1)
    
    # Add theme toggle button before LinkedIn link
    linkedin_pattern = r'(<a href="https://linkedin\.com[^>]*aria-label="LinkedIn">)'
    if re.search(linkedin_pattern, content) and 'theme-toggle' not in content:
        content = re.sub(
            linkedin_pattern,
            THEME_TOGGLE_HTML + '\n                \\1',
            content
        )
    
    # Add theme JS before closing </script>
    if '</script>' in content and 'themeToggle' not in content:
        # Find the last </script> before </body>
        script_end = content.rfind('</script>', 0, content.rfind('</body>'))
        if script_end != -1:
            content = content[:script_end] + THEME_JS + '\n    ' + content[script_end:]
    
    # Add data-theme attribute to html tag if not present
    if '<html' in content and 'data-theme' not in content:
        content = re.sub(r'<html([^>]*)>', r'<html\1>', content)
    
    # Add data-theme to body if html doesn't have it
    if '<body' in content and 'data-theme' not in content[:content.find('<body')]:
        # We'll set it via JS, but ensure html tag can have it
        pass
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

# Update all HTML files
files = ['about.html', 'projects.html', 'project.html']

for file in files:
    print(f"Updating {file}...")
    if update_file(file):
        print(f"  [OK] {file} updated successfully")
    else:
        print(f"  - {file} skipped (already updated or no changes needed)")

print("\nAll files processed!")
