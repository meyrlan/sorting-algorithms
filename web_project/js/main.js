var ids = [];
var heights = [];
var n;
var generate_pressed = 0, insertion_pressed = 0, bubble_pressed = 0, quick_pressed = 0;
var stop_animation = 0;
var pivotIndex;

function getRand(max){
    return Math.floor(Math.random() * max) + 1;
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

async function insertion_sort(){
    generate_pressed = 0;
    insertion_pressed = 1;
    bubble_pressed = 0;
    quick_pressed = 0;
    let i, key, j;
    setTimeout(async function(){
        for(i = 2; i <= n; i++){
            if(generate_pressed){
                return;
            }
            if(bubble_pressed){
                return;
            }
            if(quick_pressed){
                return;
            }
            key = heights[i];
            document.getElementById(ids[i]).style.background = "#004469";
            j = i - 1;
            while(j >= 1 && heights[j] > key){
                if(generate_pressed){
                    return;
                }
                document.getElementById(ids[j + 1]).style.background = "#004469";
                document.getElementById(ids[j]).style.background = "#004469";
                let delayres = await delay(document.getElementById('controller').value);
                heights[j + 1] = heights[j];
                document.getElementById(ids[j + 1]).style.height = heights[j] + "vh";
                document.getElementById(ids[j + 1]).style.background = "#0077b6";
                document.getElementById(ids[j]).style.background = "#0077b6";
                j--;
            }
            heights[j + 1] = key;
            document.getElementById(ids[j + 1]).style.height = key + "vh";
            document.getElementById(ids[i]).style.background = "#0077b6";
        }
    }, 500);
}

async function bubble_sort(){
    generate_pressed = 0;
    insertion_pressed = 0;
    bubble_pressed = 1;
    quick_pressed = 0;
    setTimeout(async function(){
        for(let i = 1; i <= n; i++){
        let ok = 0;
        for(let j = 1; j <= n - i; j++){
            if(generate_pressed){
                return;
            }
            if(insertion_pressed){
                return;
            }
            if(quick_pressed){
                return;
            }
            document.getElementById(ids[j]).style.background = "#004469";
            document.getElementById(ids[j + 1]).style.background = "#004469";
            let delayres = await delay(document.getElementById('controller').value);
            if(heights[j] > heights[j + 1]){
                ok = 1;
                document.getElementById(ids[j]).style.height = heights[j + 1] + "vh";
                document.getElementById(ids[j + 1]).style.height = heights[j] + "vh";
                [heights[j], heights[j + 1]] = [heights[j + 1], heights[j]];
            }
            document.getElementById(ids[j]).style.background = "#0077b6";
            document.getElementById(ids[j + 1]).style.background = "#0077b6";
        }
        if(!ok){
            return;
        }
    }}, 500);
}

async function partition(arr, start, end){
    const pivotValue = arr[end];
    pivotIndex = start;
    for (let i = start; i <= end; i++) {
        if(generate_pressed){
            return;
        }
        if(bubble_pressed){
            return;
        }
        if(insertion_pressed){
            return;
        }
        if (arr[i] < pivotValue) {
            //console.log(i + " " + pivotIndex);
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            document.getElementById(ids[i]).style.height = arr[i] + "vh";
            document.getElementById(ids[pivotIndex]).style.height = arr[pivotIndex] + "vh";
            pivotIndex++;
        }
    }
    //console.log(pivotIndex + " " + end);
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    document.getElementById(ids[end]).style.height = arr[end] + "vh";
    document.getElementById(ids[pivotIndex]).style.height = arr[pivotIndex] + "vh";
}

async function quickSortIterative(arr) {
    stack = [];
    stack.push(0);
    stack.push(arr.length - 1);
    while(stack[stack.length - 1] > 0){

        if(generate_pressed){
            return;
        }
        if(bubble_pressed){
            return;
        }
        if(insertion_pressed){
            return;
        }
        end = stack.pop();
        start = stack.pop();

        console.log(start + " " + end);

        for(let i = start; i <= end; i++){
            document.getElementById(ids[i]).style.background = "#004469";
        }

        let delayres = await delay(document.getElementById('controller').value);

        for(let i = start; i <= end; i++){
            document.getElementById(ids[i]).style.background = "#0077b6";
        }
        partition(arr, start, end);
        if (pivotIndex - 1 > start){
            stack.push(start);
            stack.push(pivotIndex - 1);
        }
        if (pivotIndex + 1 < end){
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
    console.log(arr);
}

function quick_sort(){
    generate_pressed = 0;
    insertion_pressed = 0;
    bubble_pressed = 0;
    quick_pressed = 1;
    heights[0] = 0;
    let arr = heights;
    console.log(arr);
    quickSortIterative(arr);
}

function display(id){
    console.log(id);
}

function generate(){
    document.body.style.cursor = "wait";
    document.getElementById('generate_button').style.cursor = "wait";
    document.getElementById('bubble_sort_button').style.cursor = "wait";
    document.getElementById('insertion_sort_button').style.cursor = "wait";
    document.getElementById('quick_sort_button').style.cursor = "wait";
    document.getElementById('controller').style.cursor = "wait";
    console.log("A");
    console.log(document.getElementById('controller').value);
    generate_pressed = 1;
    heights = [0];
    setTimeout(function(){
        n = document.getElementById('number').value;
        for(let i = 0; i <= n + 1; i++){
            ids[i] = "element" + i;
        }
        var cur_div = document.getElementById('showplace');
        while(cur_div.firstChild){
            cur_div.removeChild(cur_div.firstChild);
        }

        document.getElementById('showplace').style.width = "min(80vw, max(60vw, calc(" + n + "*" + (screen.width / 20.5714285714) + "px))";

        for(let i = 0; i <= n; i++){
            var new_div = document.createElement("div");
            new_div.style.background = "#0077b6";
            if(screen.width < 430){
                new_div.style.width = "33px";
            }
            if(n <= 20){
                new_div.style.width = (screen.width / 36) + "px";
                if(screen.width < 430){
                    new_div.style.width = "25px";
                }
            }
            else{
                new_div.style.width = (screen.width - (screen.width / 10)) / n + "px";
                document.getElementById('showplace').style.width = "80vw";
                if(screen.width < 430){
                    new_div.style.width = "20px";
                }
            }
            console.log(screen.width / 36);
            var height = getRand(55);
            heights[i] = height;
            new_div.style.height = height + "vh";
            let cur_margin, screen_width = screen.width / 1440;
            cur_margin = 4 * screen_width;
            new_div.style.margin = cur_margin + "px";
            if(screen.width < 430){
                new_div.style.margin = "4px";
            }
            if(n > 45){
                cur_margin = 3.5 * screen_width;
                new_div.style.margin = cur_margin + "px";
                if(screen.width < 430){
                    new_div.style.margin = "2px";
                }
            }
            if(n > 70){
                cur_margin = 2 * screen_width;
                new_div.style.margin = cur_margin + "px";
                if(screen.width < 430){
                    new_div.style.margin = "1px";
                }
            }
            new_div.style.bottom = "0"
            new_div.style.boxShadow = (3 * screen_width) + "px " + (2 * screen_width) + "px " + (5 * screen_width) + "px " + "#" + "032d63";
            new_div.setAttribute('id', ids[i]);
            if(i === 0){
                heights[i] = 0;
                new_div.style.height = "0vh";
                new_div.style.display = "none";
                new_div.style.position = "absolute";
            }
            document.getElementById('showplace').appendChild(new_div);
        }

        console.log(heights);
        document.body.style.cursor = "default";
        document.getElementById('generate_button').style.cursor = "pointer";
        document.getElementById('bubble_sort_button').style.cursor = "pointer";
        document.getElementById('insertion_sort_button').style.cursor = "pointer";
        document.getElementById('quick_sort_button').style.cursor = "pointer";
        document.getElementById('controller').style.cursor = "pointer";
    }, 500);
}

function getResolution() {
    alert("Your screen resolution is: " + screen.width + "x" + screen.height);
}

function enter_pressed(ele) {
    if(event.key === 'Enter') {
        generate();
    }
}

function test_function(){
    console.log("Meiirlan Suiirkhanov's project");
}