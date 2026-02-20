from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User, Auction_Listing


def index(request):
    return render(request, "auctions/index.html",{
        "listings":Auction_Listing.objects.all()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        message = ""
        try:
            code = request.GET.get('s', '')
            if code == "t":
                message = "This feature is for logged-in users only."
        except:
            pass
        finally:
            return render(request, "auctions/login.html",{
                "message":message
            })


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

@login_required(login_url="/login?s=t")
def new_listing(request):
    if request.method == "POST":
        name = request.POST["Name"]
        desc = request.POST["Desc"]
        cat_imt = request.POST["Cat_Image"]
        list_img = request.POST["Lis_Image"]
        Starting_bid = request.POST["Starting_Bid"]
        user = request.user
        new_listing = Auction_Listing(title=name, description = desc, listing_image_link = list_img, category_image_link = cat_imt, bid_price = Starting_bid, owner = user)
        new_listing.save()
        return HttpResponseRedirect(reverse("index"))

    else:
        return render(request, "auctions/new_listing.html")

def show_listing(request, listing_id):
    try:
        listing = Auction_Listing.objects.get(id=listing_id)
    except:
        return HttpResponse(f"I dont know how you get here, but this entry ({listing_id}) does not exist")
    return render(request, "auctions/ind_listing.html", {
        "listing":listing
    })
    return HttpResponse(f"This is an under construction page for '{listing}'")