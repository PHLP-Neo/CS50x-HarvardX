#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int layer, current_line, whitespace, block;
    do
    {
        layer = get_int("Height: ");
    }
    while (layer <= 0);
    // printf("%i\n",layer);
    current_line = 1;
    while (current_line <= layer)
    {
        whitespace = layer - current_line;
        block = current_line;
        while (whitespace > 0)
        {
            printf(" ");
            whitespace = whitespace - 1;
        }
        while (block > 0)
        {
            printf("#");
            block = block - 1;
        }
        printf("\n");
        current_line = current_line + 1;
    }
    return 0;
}