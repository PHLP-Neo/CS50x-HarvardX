from django.urls import path

from . import views

app_name = "encyclopedia"

urlpatterns = [
    path("", views.index, name="index"),
    path("search", views.search, name="search"),
    path("new",views.new, name="new"),
    path("<str:entry_name>", views.show_entries, name="show_entries"),
]