import re

def fix_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the pattern: <div className="flex-1 w-full text-left">\n *<h3 ...>...</h3>\n *<h2 ...>...</h2>
    # And move to BEFORE the <div className="flex flex-col lg:flex-row ...">
    
    # We will use regex substitution
    
    pattern = r'(<div className="flex flex-col lg:flex-row[^>]*>)\s*\{/\* Left Text \*/\}\s*<div className="flex-1 w-full text-left">\s*<h3 className="([^"]*)">(.*?)</h3>\s*<h2 className="([^"]*)">([\s\S]*?)</h2>'
    
    def replacer(match):
        flex_row_div = match.group(1)
        h3_classes = match.group(2)
        h3_content = match.group(3)
        h2_classes = match.group(4)
        h2_content = match.group(5)
        
        # Add text-center to h3 and h2 classes
        if 'text-center' not in h3_classes:
            h3_classes += ' text-center'
        if 'text-center' not in h2_classes:
            h2_classes += ' text-center'
            
        # Also change mb-8 to mb-16 for h2 to give spacing since it's above the columns now
        h2_classes = h2_classes.replace('mb-8', 'mb-16')
        
        new_header = f'        <h3 className="{h3_classes}">\n          {h3_content.strip()}\n        </h3>\n        <h2 className="{h2_classes}">\n          {h2_content.strip()}\n        </h2>\n        '
        new_left_col = f'{flex_row_div}\n          {{/* Left Text */}}\n          <div className="flex-1 w-full text-left">'
        
        return new_header + new_left_col
        
    new_content = re.sub(pattern, replacer, content)
    
    # Also add word-break-keep: 'break-keep' to standard text blocks
    new_content = new_content.replace('text-xl text-muted-foreground leading-[1.8]', 'text-xl text-muted-foreground leading-[1.8] break-keep')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)

for fname in ['slides-data-part1.tsx', 'slides-data-part2.tsx', 'slides-data-part3.tsx']:
    fix_file(f'/Users/bagjun-won/kkeutgong-aice/frontend/src/pages/proposal/{fname}')

print("Done fixing titles!")
