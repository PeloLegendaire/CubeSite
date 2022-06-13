const app = document.getElementById('root');

const perspective_cube = document.createElement('div');
perspective_cube.setAttribute('id', 'perspective_cube');

const container = document.createElement('div');
container.setAttribute('id', 'container');

const front = document.createElement('div');
front.setAttribute('class', 'face_cube front');
front.style.transform = 'translateZ(14vw)';
build_table(skills[0], front);

const back = document.createElement('div');
back.setAttribute('class', 'face_cube back');
back.style.transform = 'rotateY(180deg) translateZ(14vw)';
build_table(skills[3], back);

const right = document.createElement('div');
right.setAttribute('class', 'face_cube right');
right.style.transform = 'rotateY(90deg) translateZ(14vw)';
build_table(skills[1], right);

const left = document.createElement('div');
left.setAttribute('class', 'face_cube left');
left.style.transform = 'rotateY(-90deg) translateZ(14vw)';
build_table(skills[2], left);

const topface = document.createElement('div');
topface.setAttribute('class', 'face_cube top');
topface.style.transform = 'rotateX(90deg) translateZ(14vw)';
build_table(skills[4], topface);

const bottom = document.createElement('div');
bottom.setAttribute('class', 'face_cube bottom');
bottom.style.transform = 'rotateX(-90deg) translateZ(14vw)';
build_table(skills[5], bottom);

container.appendChild(front);
container.appendChild(back);
container.appendChild(right);
container.appendChild(left);
container.appendChild(topface);
container.appendChild(bottom);

perspective_cube.appendChild(container);

var nb_cube = 0;
//const parties = ['front', 'right', 'left', 'back', 'top', 'bottom'];
const parties = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];
var mots = [];

const perspective_title = document.createElement('div');
perspective_title.setAttribute('id', 'perspective_title');

for (var j = 0; j < parties.length; j++) {
    if (nb_cube < parties[j].length) {
        nb_cube = parties[j].length;
    }
}

var nb_spaces = 0;
var spaces = "";
for (var j = 0; j < parties.length; j++) {
    spaces = "";
    if (nb_cube > parties[j].length) {
        nb_spaces = Math.floor((nb_cube - parties[j].length) / 2);
        for (var k = 0; k < nb_spaces; k++) {
            spaces += " ";
        }
    }
    var mot_maj = spaces + parties[j].toUpperCase();
    document.getElementById('menu').getElementsByTagName('div')[j].textContent = mot_maj;
    var mot = mot_maj.split('');
    mots.push(mot);
    
}

for (var i = 0; i < nb_cube; i++) {
    const cube = document.createElement('div');
    cube.setAttribute('class', 'cube');
    
    const front_cube = document.createElement('div');
    front_cube.setAttribute('class', 'face_title');
    front_cube.style.transform = 'translateZ(2vw)';
    front_cube.textContent = mots[0][i];
    
    const right_cube = document.createElement('div');
    right_cube.setAttribute('class', 'face_title');
    right_cube.style.transform = 'rotateY(90deg) translateZ(2vw)';
    right_cube.textContent = mots[1][i];
    
    const left_cube = document.createElement('div');
    left_cube.setAttribute('class', 'face_title');
    left_cube.style.transform = 'rotateY(-90deg) translateZ(2vw)';
    left_cube.textContent = mots[2][i];

    const back_cube = document.createElement('div');
    back_cube.setAttribute('class', 'face_title');
    back_cube.style.transform = 'rotateY(180deg) translateZ(2vw)';
    back_cube.textContent = mots[3][i];
    
    const topface_cube = document.createElement('div');
    topface_cube.setAttribute('class', 'face_title');
    topface_cube.style.transform = 'rotateX(90deg) translateZ(2vw)';
    topface_cube.textContent = mots[4][i];
    
    const bottom_cube = document.createElement('div');
    bottom_cube.setAttribute('class', 'face_title');
    bottom_cube.style.transform = 'rotateX(-90deg) translateZ(2vw)';
    bottom_cube.textContent = mots[5][i];
    
    cube.appendChild(front_cube);
    cube.appendChild(back_cube);
    cube.appendChild(right_cube);
    cube.appendChild(left_cube);
    cube.appendChild(topface_cube);
    cube.appendChild(bottom_cube);
    
    perspective_title.appendChild(cube);
}

app.appendChild(perspective_cube);

app.appendChild(perspective_title);

function transform(face) {
    const cube = document.getElementById('container');
    var rotation = '';
    var elements = document.getElementsByClassName('face_cube');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.transform = elements[i].style.transform.replace('scale(2)', 'scale(1)');
    }
    switch (face) {
        case 'front':
            rotation = 'rotate3d(1,1,1,0deg)';
            break;
        case 'back':
            rotation = 'rotate3d(0,1,0,180deg)';
            break;
        case 'right':
            rotation = 'rotate3d(0,1,0,-90deg)';
            break;
        case 'left':
            rotation = 'rotate3d(0,1,0,90deg)';
            break;
        case 'top':
            rotation = 'rotate3d(1,0,0,-90deg)';
            break;    
        case 'bottom':
            rotation = 'rotate3d(1,0,0,90deg)';
            break;
    }
    change_title(rotation);
    cube.style.transform = rotation;
}

function zoom(face) {
    const element = document.getElementsByClassName(face)[0];
    var transform = element.style.transform;
    const regex1 = transform.match(/scale\(2\)/);
    const regex2 = transform.match(/scale\(1\)/);
    if (regex1 && !regex2) {
        transform = transform.replace('scale(2)', 'scale(1)');
    } else if (!regex1 && regex2) {
        transform = transform.replace('scale(1)', 'scale(2)');
    } else {
        transform = `${transform} scale(2)`;
    }
    element.style.transform = transform;
}

function change_title(rotation) {
    var i = 0;
    var timer = setInterval(() => {
        if (i >= nb_cube-1) {
            clearInterval(timer);
        }
        var cube = document.getElementsByClassName('cube')[i];
        cube.style.transform = rotation;
        i++;
    }, 200);
}

function build_table(content, face) {
    var container = document.createElement('div');
    var title = document.createElement('p');
    title.textContent = content.skill;
    container.appendChild(title);
    var length = content.content.length;
    var nb_table = Math.ceil(length / 3);
    var boucle = 0;
    var reste = length % 3;
    for (var i = 1; i <= nb_table; i++) {
        var table = document.createElement('table');
        var tline = document.createElement('tr');
        table.appendChild(tline);
        if (i < nb_table) {
            length = i * 3;
        } else {
            if (reste > 0) {
                table.style.width = "70%";
                table.style.marginLeft = "15%";
            }
            length = content.content.length;
        }
        var index = 0;
        for (var k = boucle; k < length; k++) {
            var thead = document.createElement('th');
            thead.textContent = content.content[k].title;
            tline.appendChild(thead);
            if (content.content[k].proofs.length > index) {
                index = content.content[k].proofs.length;
            }
        }
        for (var j = 0; j < index; j++) {
            var line = document.createElement('tr');
            for (var k = boucle; k < length; k++) {
                var column = document.createElement('td');
                var link = document.createElement('a');
                link.setAttribute('target', '_blank');
                link.setAttribute('href', content.content[k].proofs[j]);
                link.textContent = content.content[k].names[j];
                column.appendChild(link);
                line.appendChild(column);
            }
            table.appendChild(line);
        }
        container.appendChild(table);
        boucle = i * 3;
    }
    face.appendChild(container);
}


function chg_color() {
    if (document.documentElement.style.getPropertyValue('--background-color') != '#112378') {
        document.documentElement.style.setProperty('--background-color', '#112378');
        document.documentElement.style.setProperty('--cube-color', '#FBECCF');
    } else {
        document.documentElement.style.setProperty('--background-color', '#371722');
        document.documentElement.style.setProperty('--cube-color', '#BBAB9B');
    }
}
