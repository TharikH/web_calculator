var a = "";
var arr = new Array(), temp_arr = new Array();
function val_but(x) {
    if (document.getElementById("input").value != "0") {
        document.getElementById("input").value = (document.getElementById("input").value) + x;
    }
    else {
        document.getElementById("input").value = x;
    }
}
function val_symb(x) {
    var temp = document.getElementById("input").value, len = temp.length;
    if ((temp != null) && (temp.charAt(len - 1) >= '0' && temp.charAt(len - 1) <= '9')) {
        document.getElementById("input").value = (document.getElementById("input").value) + x;
    }
}
function clearVal(x) {
    document.getElementById("input").value = x;
}
function submit_val() {
    var temp = document.getElementById("input").value;
    var len = temp.length;
    if (!(temp.charAt(len - 1) >= '0' && temp.charAt(len - 1) <= '9')) {
        temp = temp.slice(0, len - 1);
        len--;
    }
    postfix(temp);
    // document.write(arr);
    var result = evaluate();
    document.getElementById("input").value = result;
    arr = []; a = "";
}
function priority(p) {
    switch (p) {
        case '/':
            return 5;
        case '*':
            return 4;
        case '+':
            return 3;
        case '-':
            return 2;
    }
}
function postfix(str) {
    var i, len = str.length;
    temp_arr=[];
    var top = -1;
    for (i = 0; i < len; i++) {
        switch (str.charAt(i)) {
            case '/':
            case 'x':
            case '+':
            case '-':
                arr.push(Number(a));
                a = "";
                if (top != -1) {
                    while (priority(temp_arr[top] >= str.charAt(i))) {
                        var t = temp_arr.pop(); top--;
                        arr.push(t);
                    }
                    temp_arr.push(str.charAt(i)); top++;
                }
                else {
                    temp_arr.push(str.charAt(i)); top++;
                }
                break;
            default:
                a = a + str.charAt(i);
        }
    }
    arr.push(a);
    while (top != -1)
        arr.push(temp_arr[top--]);
}
function evaluate() {
    var i, val1, val2;
    for (i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case '+':
                val2 = Number(temp_arr.pop());
                val1 = Number(temp_arr.pop());
                arr.push(val1 + val2);
                break;
            case 'x':
                val2 = temp_arr.pop();
                val1 = temp_arr.pop();
                temp_arr.push(val1 * val2);
                break;
            case '/':
                val2 = temp_arr.pop();
                val1 = temp_arr.pop();
                temp_arr.push(val1 / val2);
                break;
            case '-':
                val2 = temp_arr.pop();
                val1 = temp_arr.pop();
                temp_arr.push(val1 - val2);
                break;
            default:
                temp_arr.push(arr[i]);
        }
    }
    return (temp_arr.pop());
}