from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.urls import reverse
from . import util

import markdown2

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def show_entries(request,entry_name):
    # print("entry_name is:", entry_name)
    entry_info = util.get_entry(entry_name)
    # print(entry_info)
    if entry_info:
        return render(request, "encyclopedia/entrypage.html",{
            "name": entry_name,
            "content": markdown2.markdown(entry_info)
        })
    else:
        return HttpResponse(f"Hello, the page \"{entry_name}\" is not available!")
    
def search(request):
    if request.method == "POST":
        entry_list = list(map(lambda x: x.upper(),util.list_entries()))
        print(entry_list)
        form = request.POST['q'].upper()
        print("form is:",type(form))
        if form != "" and form in entry_list:
            return HttpResponseRedirect(f"/{form}")
        elif form == "":
            return HttpResponseRedirect(reverse("index"))
        else:
            new_form = []
            for i in entry_list:
                if form in i:
                    new_form.append(i)
            if new_form == []:
                return HttpResponse(f"Hey, cant find it")
            else:
                return HttpResponse(f"{new_form}")

    else:
        return HttpResponse(f"This is the search engine! However you should not type the url manually")
    pass