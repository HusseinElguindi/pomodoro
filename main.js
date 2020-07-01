const program_states = {
    not_started: 0,
    paused: 1,
    in_progress: 2,
};

const pomodoro_states = {
    pomodoro: 0, // study time
    break: 1,    // break time
};

var program_state = program_states.not_started;

var pomodoro_state = pomodoro_states.pomodoro;
var pomodoro_count = 0;
var pomodoro_start = new Date();

var now;
var now_ms;
var new_time; // 25 mins from now

var btn;// = new Button("Pause", width/2, (height/2)+100, 60, 50, "#ffffff");

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    textFont("Segoe UI"); // font used in Windows 10

    now = new Date();
    now_ms = now.getTime();
    new_time = now_ms + (25 * 60000); // 25 mins from now

    btn = new Button("Pause", width/2, (height/2)+100, 60, 50);
}

var starting_time;
var ending_time;
var remaining_time;
var timer_string;

function draw() {
    // #BF2A2A
    // #D95578
    // #24A6A6
    // #F25781
    // #1C1E26 or 28, 30, 38

    background("#1C1E26");

    draw_header();

    if (program_state == program_states.not_started)
    {
        fill(255);
        textSize(60);
        textAlign(CENTER);
        text("25:00", width/2, height/2);

        btn.btn_text = "Start Studying";
        btn.w = 110;
    }
    else if (program_state == program_states.in_progress)
    {
        let now = new Date();
        remaining_time = ending_time - now.getTime();

        fill(255);
        textSize(60);
        textAlign(CENTER);
        text(format_millis_timestring(remaining_time), width/2, height/2);
    }
    else if (program_state == program_states.paused)
    {
        fill(255);
        textSize(60);
        textAlign(CENTER);
        text(timer_string, width/2, height/2);
    }



    if (btn.is_mouse_over())
    {
        fill(btn.hover_color);
        btn.text_color = "#ffffff";
    }
    else
    {
        fill(btn.bg);
        btn.text_color = btn.default_text_color;
    }
    btn.draw();

    draw_FPS();
}

function draw_header() {
    noStroke();
    fill(242, 87, 129);
    rectMode(CORNER);
    rect(0, 0, width, 40);

    var now = new Date();
    draw_timestamp(now);

    textAlign(LEFT, CENTER);
    text("Pomodoro", 15, 40 / 2);
}

function format_millis_timestring(ms)
{
    timer_string = new String();
    let minutes = Math.trunc(ms / 60000);
    let seconds = Math.trunc((ms - (minutes * 60000)) / 1000);

    timer_string += (minutes < 0) ? "0" : minutes;
    timer_string += ":";
    timer_string += (seconds < 0) ? "00" : (seconds < 10) ? "0" + seconds : seconds;

    return timer_string;
}

function touchStarted()
{
    if (btn.is_mouse_over())
    {
        if (program_state == program_states.not_started)
        {
            let now = new Date();
            // TODO: NO NEED FOR STARTING TIME VARIABLE
            starting_time = now.getTime();
            ending_time = starting_time += 25 * 60000;

            program_state = program_states.in_progress;

            btn.btn_text = "Pause";
            btn.w = 60;
        }
        else if (program_state == program_states.in_progress)
        {
            program_state = program_states.paused;

            btn.btn_text = "Resume";
            btn.w = 60;
        }
        else if (program_state == program_states.paused)
        {
            let now = new Date();
            ending_time += remaining_time - (ending_time - now.getTime());

            program_state = program_states.in_progress;

            btn.btn_text = "Pause";
            btn.w = 60;
        }
    }
}

/* #region  Time */
// draw timestamp on canvas
function draw_timestamp(date) {
    fill(255);
    textSize(20);
    textAlign(RIGHT, CENTER);

    text(time_string(date, false, true), width - 15, 40 / 2);
}

// format time string with this format "H:MM" or "H:MM:SS"
function time_string(date, include_seconds, include_am_pm) {
    let time_string = new String();

    // 12 hour time format
    if (date.getHours() > 12) {
        time_string += date.getHours() - 12;
    }
    else if (date.getHours() == 0) {
        time_string += 12;
    }
    else {
        time_string += date.getHours();
    }

    time_string += ":";

    // make sure minutes var is two digits
    if (date.getMinutes() < 10) {
        time_string += "0";
    }
    time_string += date.getMinutes();

    // add seconds if requested
    if (include_seconds) {
        time_string += ":";

        // make sure minutes var is two digits
        if (date.getSeconds() < 10) {
            time_string += "0";
        }
        time_string += date.getSeconds();
    }

    // add AM or PM if requested
    if (include_am_pm) {
        time_string += " ";

        if (date.getHours() >= 12) {
            time_string += "PM";
        }
        else {
            time_string += "AM";
        }
    }

    return time_string;
}
/* #endregion */

/* #region  Window Tools and Debug */
var FPS;
function draw_FPS() {
    if (frameCount % 10 == 0) {
        FPS = frameRate().toFixed(2);
    }

    noStroke();
    fill(255);
    textSize(15);
    textAlign(RIGHT, BOTTOM);
    text(FPS + " FPS", width - 10, height - 10);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    btn.x = width/2;
    btn.y = (height/2)+100;
}
/* #endregion */
