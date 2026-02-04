from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("search", views.search, name="search"),
    path("<str:entry_name>", views.show_entries, name="show_entries"),
]

