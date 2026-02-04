from django.shortcuts import render

from . import util

import markdown2

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def show_entries(request,entry_name):
    print("entry_name is:", entry_name)
    entry_info = util.get_entry(entry_name)
    print(entry_info)
    if entry_info:
        return render(request, "encyclopedia/entrypage.html",{
            "name": entry_name,
            "content": markdown2.markdown(entry_info)
        })