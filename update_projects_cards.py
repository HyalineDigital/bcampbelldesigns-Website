#!/usr/bin/env python3
"""
Update projects.html project cards to match homepage structure with actual images
"""

import re

# Project data mapping (project_id -> {title, category, description, image})
projects_data = {
    "caesars-palace-online-casino": {
        "title": "Caesars Palace Online Casino",
        "category": "Product & UX Design",
        "description": "Caesars Palace Online Casino is a world-class, endlessly rewarding gaming experience delivered from Las Vegas to wherever you play.",
        "image": "public/images/projects/caesars-palace-online-casino/cpo-headerpng.png"
    },
    "icyveins": {
        "title": "Icy Veins",
        "category": "Product & User Experience Design",
        "description": "Icy Veins is an online gaming website that offers guides, resources, and tools for various Blizzard Entertainment titles. It features class guides written by a team of over 100 writers for World of Warcraft, reviewed by experienced players and theorycrafters, as well as guides for Final Fantasy XIV, Diablo IV, Heroes of the Storm, and WoW Classic.",
        "image": "public/images/projects/icyveins/icy-veins-headerpng.png"
    },
    "the-national-forest-foundation": {
        "title": "The National Forest Foundation Mobile App",
        "category": "Case Study",
        "description": "The National Forest Foundation works on behalf of the American public to inspire personal and meaningful connections to America's National Forests. NFF focuses on driving donations and gathering communities together to help with the preservation of the Nation's Forests.",
        "image": "public/images/projects/the-national-forest-foundation/ux-design-processpng.png"
    },
    "tabstats-dashboard": {
        "title": "Stats Dashboard & In-Game Companion App",
        "category": "Dashboard & In-Game Companion",
        "description": "Tabstats is a website and statistics dashboard system founded in 2019. This particular product highlighted below was a downloadable dashboard & in-game companion app that featured a large amount of features to improve and enhance the gameplay experience for \"Rainbow Six Siege\" players including cheater detection, in-depth stat breakdowns, player profiles and more.",
        "image": "public/images/projects/tabstats-dashboard/tabstats-r6png.png"
    },
    "tabstats-design-system": {
        "title": "Website UI/UX Design",
        "category": "UI/UX & Product Design",
        "description": "Tabstats is a website and dashboard system founded in 2019. This product was focused around a large scale website created around an API integration with \"Ubisoft Connect\" and the video game \"Rainbow Six Siege\". The website portion was made to integrate with adownloaded dashboard applicationused to track player data, giving deep insights to their gameplay and how they could improve.",
        "image": "public/images/projects/tabstats-design-system/gnhd9nzetuxyjpg.png"
    },
    "addicting-games-mobile": {
        "title": "Mobile Application Design",
        "category": "Mobile Application",
        "description": "In the current state, the Addicting Games website served as our only limited mobile solution, albeit not providing a native experience. With over 1 million monthly active users, the current mobile solution was not satisfactory and led to a lot of unwanted experiences.The ideal state envisioned a mobile solution that enhances discoverability, ensuring user engagement and fostering a high retention rate. Addicting Games possess a massive library of 1000+ games; however, users encountered difficulty in finding games aligning with their preferences or those similar to their favorites.",
        "image": "public/images/projects/addicting-games-mobile/ag_bgpng.png"
    },
    "steam-mobile-app-redesign": {
        "title": "Steam Mobile Redesign Concept",
        "category": "Case Study",
        "description": "Steam is a video game digital distribution service and storefront by Valve. It was launched as a standalone software client in September 2003 as a way for Valve to provide automatic updates for their games, and expanded to distributing and offering third-party game publishers' titles.",
        "image": "public/images/projects/steam-mobile-app-redesign/steam-headerjpg.png"
    },
    "overlayed": {
        "title": "In-Game Overlay & Dashboard",
        "category": "In-Game Overlay & Dashboard",
        "description": "Passion project built with previous members from the Tabstats team after it was acquired. This product was built from the ground up for the video game \"Escape From Tarkov\" for in and out-of-game use, alleviating redundant tasks and improving overall accessibility for new and veteran players.This project expands upon my work previously done for Tabstats as we were expanding into Tarkov previously. Project details are limited due to the project being potentially integrated with Battleye Anti-Cheat and Battlestate Games.",
        "image": "public/images/projects/overlayed/escape_from_tarkov_wallpaper_2560jpg.png"
    },
    "mathgames": {
        "title": "Product: Gamified Learning",
        "category": "Product: Gamified Learning",
        "description": "Teachers and parents have reached out saying their students/children are logging in just to play the games they like with no real direction on the platform. This was further reinforced through research via Google Analytics page session duration, page views and other data. Shortly after data analysis was completed, one on one teacher interviews were conducted to find the correct direction.",
        "image": "public/images/projects/mathgames/81ky7xbcgwljpg.png"
    },
    "addicting-games-dev-portal": {
        "title": "Product Design: Developer Portal",
        "category": "Product: Developer Portal",
        "description": "This project stemmed from the feedback of developers and a lack of quality submissions that led to long QA times for submitted games to the Addicting Games website. Additionally the finalized product was to be used for further monetization with other game platforms within our network.",
        "image": "public/images/projects/addicting-games-dev-portal/ag_bgpng.png"
    },
    "lcs-web-app-2022": {
        "title": "LCS Web App",
        "category": "Esports",
        "description": "",
        "image": "public/images/projects/lcs-web-app-2022/lcsredesignjpg.png"
    },
    "valorant-dashboard": {
        "title": "Valorant Dashboard Concept",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/valorant-dashboard/valorant-dashbaordjpg.png"
    },
    "enthusiast-gaming": {
        "title": "Ad Graphic Creation",
        "category": "Ad Graphics",
        "description": "",
        "image": "public/images/projects/enthusiast-gaming/christopher-farrugia-2yqtqbqzdro-unsplashjpg.png"
    },
    "rocket-stream-concept": {
        "title": "Rocket Stream Dashboard Concept",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/rocket-stream-concept/stream-dashboardjpg.png"
    },
    "ableton-learning-platform": {
        "title": "Ableton Learning Platform Concept",
        "category": "Case Study",
        "description": "Ableton AGis a German music software company that produces and distributes the production and performance program Ableton Live and a collection of related instruments and sample libraries, as well as their own hardware controller Ableton Push.",
        "image": "public/images/projects/ableton-learning-platform/pexels-tstudio-7173392jpg.png"
    },
    "amazon-luna-concept": {
        "title": "Amazon Luna Homepage Redesign",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/amazon-luna-concept/amazonlunaconceptpcpng.png"
    },
    "hertz-car-rental": {
        "title": "Hertz Car Rental - Vehicle Price Comparison",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/hertz-car-rental/jake-blucker-tmzcrbkm99y-unsplash1jpg.png"
    },
    "aidium-first-aid": {
        "title": "Aidium First Aid Training Responsive Application",
        "category": "Application",
        "description": "Aidium is a responsive website, mobile, and tablet app that helps users learn first-aid.",
        "image": "public/images/projects/aidium-first-aid/aidium-headerpng.png"
    },
    "chat-application": {
        "title": "Chat Application",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/chat-application/chat-conceptpng.png"
    },
    "paypal-redesign": {
        "title": "Paypal Redesign Concept",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/paypal-redesign/paypal-lightjpg.png"
    },
    "nft-concept-site": {
        "title": "NFT Marketplace Concept",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/nft-concept-site/nftconceptpcpng.png"
    },
    "cloud-mining-concept": {
        "title": "Cloud Mining Site Concept",
        "category": "Concept",
        "description": "",
        "image": "public/images/projects/cloud-mining-concept/cloudminingconceptpcpng.png"
    },
    "other-digital-art": {
        "title": "Other Digital Art",
        "category": "Art",
        "description": "Digital art and illustrations including 3D work.",
        "image": "public/images/projects/other-digital-art/other-digital-artjpg.png"
    }
}

# Button color gradients
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

def escape_html(text):
    """Escape HTML special characters."""
    if not text:
        return ""
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

# Read projects.html
with open('projects.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find project grid section
grid_start = html.find('<!-- Project Grid -->')
grid_end = html.find('</section>', grid_start)

if grid_start == -1 or grid_end == -1:
    print("Could not find project grid section")
    exit(1)

# Generate new grid HTML
new_grid = '''            <!-- Project Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
'''

for idx, (project_id, data) in enumerate(projects_data.items()):
    color_from, color_to, color_name = button_colors[idx % len(button_colors)]
    accent = 'text-accent-purple' if idx % 2 == 0 else 'text-accent-blue'
    
    # Use description or fallback, truncate to 100 characters
    desc = data['description'] if data['description'] else f"{data['category']} project."
    if len(desc) > 100:
        desc = desc[:100].rsplit(' ', 1)[0] + '...'
    
    new_grid += f'''                <!-- {data['title']} -->
                <div class="project-card glass-card rounded-2xl overflow-hidden group">
                    <div class="relative aspect-[8/3] project-placeholder overflow-hidden">
                        <img src="{data['image']}" alt="{escape_html(data['title'])}" class="project-image absolute inset-0 w-full h-full object-cover">
                        <div class="project-overlay absolute inset-0 flex items-end justify-center p-8">
                            <a href="project.html?id={project_id}" class="view-button bg-gradient-to-r {color_from} {color_to} text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:{color_from.replace('600', '500')} hover:{color_to.replace('600', '500')} transition-all shadow-lg shadow-{color_name}-500/30">
                                View Case Study
                            </a>
                        </div>
                    </div>
                    <div class="p-6 md:p-8">
                        <span class="text-xs font-bold {accent} uppercase tracking-widest">{escape_html(data['category'])}</span>
                        <h3 class="text-[1.05rem] md:text-[1.3125rem] font-black text-white mt-4 mb-3 leading-tight">{escape_html(data['title'])}</h3>
                        <p class="text-gray-400 text-sm md:text-base leading-relaxed font-light">{escape_html(desc)}</p>
                    </div>
                </div>

'''

new_grid += '            </div>'

# Replace grid section
updated_html = html[:grid_start] + new_grid + html[grid_end:]

# Write updated file
with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(updated_html)

print(f"Updated projects.html with {len(projects_data)} project cards!")
print("All cards now use:")
print("  - aspect-[8/3] (same as homepage)")
print("  - Actual cover images")
print("  - Same button styling (px-10 py-4 text-sm)")
print("  - Updated descriptions from scraped data")
