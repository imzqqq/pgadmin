"""Utilities for HTML"""

from html import escape as html_escape


def safe_str(x):
    try:
        # For Python3, it can be int, float
        if isinstance(x, (int, float)):
            x = str(x)

        x = x.encode(
            'ascii', 'xmlcharrefreplace'
        ) if hasattr(x, 'encode') else x

        x = x.decode('utf-8')
    except Exception:
        pass
    return html_escape(x, False)
