#!/usr/bin/env python3
"""
Generate placeholder images for Manforest Graphics website
Uses the official brand colors
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Brand Colors
COLORS = {
    'red': '#d63946',
    'orange': '#f77f00',
    'gold': '#ffc93c',
    'teal': '#20b2aa',
    'dark': '#1a1a1a',
    'gray': '#666666',
    'light_gray': '#f5f5f5',
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_placeholder_image(width, height, bg_color, title, filename, text_color='#ffffff'):
    """Create a placeholder image with text"""
    # Create image
    img = Image.new('RGB', (width, height), hex_to_rgb(bg_color))
    draw = ImageDraw.Draw(img)
    
    # Try to use a system font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/San Francisco.ttf", 36)
        small_font = ImageFont.truetype("/System/Library/Fonts/San Francisco.ttf", 24)
    except:
        font = ImageFont.load_default()
        small_font = font
    
    # Add title text
    text_rgb = hex_to_rgb(text_color)
    
    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), title, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 30
    
    draw.text((x, y), title, fill=text_rgb, font=font)
    
    # Add dimensions text
    dims_text = f"{width}x{height}"
    bbox = draw.textbbox((0, 0), dims_text, font=small_font)
    dims_width = bbox[2] - bbox[0]
    dims_x = (width - dims_width) // 2
    dims_y = y + text_height + 20
    draw.text((dims_x, dims_y), dims_text, fill=text_rgb, font=small_font)
    
    # Save image
    img.save(filename, 'JPEG', quality=85)
    print(f"✓ Created: {filename}")

def main():
    """Generate all placeholder images"""
    
    # Create images directory if it doesn't exist
    os.makedirs('images', exist_ok=True)
    os.makedirs('images/portfolio', exist_ok=True)
    os.makedirs('images/clients', exist_ok=True)
    os.makedirs('images/services', exist_ok=True)
    os.makedirs('images/types', exist_ok=True)
    
    print("\n🎨 Generating Manforest Graphics Placeholder Images\n")
    print("=" * 50)
    
    # Portfolio Images (12 files, 600x400px)
    print("\n📸 Portfolio Images (600x400):")
    portfolio_items = [
        ('Wedding Signage 1', COLORS['red']),
        ('Wedding Signage 2', COLORS['orange']),
        ('Business Signs 1', COLORS['gold']),
        ('Business Signs 2', COLORS['teal']),
        ('Outdoor Signage 1', COLORS['red']),
        ('Outdoor Signage 2', COLORS['orange']),
        ('Indoor Displays 1', COLORS['gold']),
        ('Indoor Displays 2', COLORS['teal']),
        ('Vehicle Wraps 1', COLORS['red']),
        ('Vehicle Wraps 2', COLORS['orange']),
        ('Digital Displays 1', COLORS['gold']),
        ('Digital Displays 2', COLORS['teal']),
    ]
    
    for idx, (name, color) in enumerate(portfolio_items, 1):
        filename = f'images/portfolio/project-{idx}.jpg'
        create_placeholder_image(600, 400, color, name, filename)
    
    # Client Photos (10 files, 150x150px - square for avatars)
    print("\n👥 Client Photos (150x150 - Square):")
    client_names = [
        'Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5',
        'Client 6', 'Client 7', 'Client 8', 'Client 9', 'Client 10'
    ]
    client_colors = [COLORS['red'], COLORS['orange'], COLORS['gold'], COLORS['teal'], COLORS['dark']] * 2
    
    for idx, (name, color) in enumerate(zip(client_names, client_colors), 1):
        filename = f'images/clients/client-{idx}.jpg'
        create_placeholder_image(150, 150, color, f'Client {idx}', filename)
    
    # Service Images (4 files, 400x300px)
    print("\n🔧 Service Images (400x300):")
    service_items = [
        ('Fabrication', COLORS['red'], 'images/services/fabrication.jpg'),
        ('Printing', COLORS['orange'], 'images/services/printing.jpg'),
        ('Installation', COLORS['gold'], 'images/services/installation.jpg'),
        ('Delivery', COLORS['teal'], 'images/services/delivery.jpg'),
    ]
    
    for name, color, filename in service_items:
        create_placeholder_image(400, 300, color, name, filename)
    
    # Signage Types (6 files, 500x400px)
    print("\n🏷️ Signage Types (500x400):")
    type_items = [
        ('Wedding Signage', COLORS['red']),
        ('Business Signs', COLORS['orange']),
        ('Outdoor Signage', COLORS['gold']),
        ('Indoor Displays', COLORS['teal']),
        ('Vehicle Wraps', COLORS['red']),
        ('Custom Signage', COLORS['orange']),
    ]
    
    for idx, (name, color) in enumerate(type_items, 1):
        filename = f'images/types/signage-type-{idx}.jpg'
        create_placeholder_image(500, 400, color, name, filename)
    
    print("\n" + "=" * 50)
    print("\n✨ All placeholder images created successfully!\n")
    print("📁 Image Summary:")
    print("   • Portfolio: 12 images (600x400)")
    print("   • Clients: 10 images (150x150 - avatars)")
    print("   • Services: 4 images (400x300)")
    print("   • Signage Types: 6 images (500x400)")
    print("\n💡 Tip: Replace these with real images later!")
    print("📸 Save your images with the same filenames to replace placeholders\n")

if __name__ == '__main__':
    main()
