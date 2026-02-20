from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Auction_Listing(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    listing_image_link = models.URLField(blank=True, null=True)
    category_image_link = models.URLField(blank=True, null=True)
    bid_price= models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.title} is bidding at the price of {self.bid_price}!"

class Bids(models.Model):
    pass

class Comments(models.Model):
    pass