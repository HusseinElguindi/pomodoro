class Button
{
    constructor(text, x, y, w, h)
    {
        this.btn_text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.bg = "#ffffff";
        this.hover_color = "#F25781";

        this.default_text_color = "#1C1E26";
        this.text_color = this.default_text_color;
        this.text_size = 20;
    }

    draw()
    {
        noStroke();

        ellipseMode(CENTER);
        ellipse(this.x-(this.w/2), this.y, this.h);
        ellipse(this.x+(this.w/2), this.y, this.h);

        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);

        fill(this.text_color);
        textSize(this.text_size);
        textAlign(CENTER);
        text(this.btn_text, this.x, this.y);
    }

    is_mouse_over()
    {
        if (dist(this.x-(this.w/2), this.y, mouseX, mouseY) <= this.h/2 || dist(this.x+(this.w/2), this.y, mouseX, mouseY) <= this.h/2 || (mouseX >= this.x-(this.w/2) && mouseX <= this.x+(this.w/2) && mouseY >= this.y-(this.h/2) && mouseY <= this.y+(this.h/2)))
        {
            return true;
        }
        return false;
    }
}