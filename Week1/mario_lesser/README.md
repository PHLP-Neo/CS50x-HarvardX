# Mario (lesser)

This is a program that creates a pyramid using (#) for bricks.

```
    #
   ##
  ###
 ####
#####
```

The program prompts the user for an `int` to determine the height of the pyramid. For example, if the `int` number 
received from the user is `3`, the pyramid would look like this:

```
  #
 ##
###
```

This program will reprompt the user as many times as necessary until the user inputs a valid number for this program.
A valid number is an `int` that is greater than 0.

The program received the `int` from the user with `get_int`, which is declared in `cs50.h`.
